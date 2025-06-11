import Editor from '@monaco-editor/react';
import {
    ViewModule as BothIcon,
    Code as CodeIcon,
    Description as DescriptionIcon,
    FileDownload as DownloadIcon,
    Error as ErrorIcon,
    FormatPaint as FormatIcon,
    Refresh as ResetIcon,
    CheckCircle as SuccessIcon,
    FileUpload as UploadIcon
} from '@mui/icons-material';
import {
    Alert,
    AlertTitle,
    Box,
    Chip,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
    alpha,
    useTheme
} from '@mui/material';
import OpenAPISchemaValidator from 'openapi-schema-validator';
import type { OpenAPIV3 } from 'openapi-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type ViewMode = 'editor' | 'preview' | 'both';

interface OpenAPIEditorProps {
    initialSpec?: string;
    height?: string | number;
    width?: string | number;
    showHeader?: boolean;
    showActions?: boolean;
    onSpecChange?: (spec: string, isValid: boolean) => void;
    className?: string;
}

const VALID_TYPES = ['string', 'number', 'integer', 'boolean', 'array', 'object'] as const;
const VALID_FORMATS = [
    'int32', 'int64', 'float', 'double', 'byte', 'binary', 'date', 'date-time',
    'password', 'email', 'uuid', 'uri', 'hostname', 'ipv4', 'ipv6'
] as const;

interface ValidationError {
    message: string;
    path: string;
    severity: 'error' | 'warning';
}

const defaultSpec = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Edit your OpenAPI specification here'
    },
    paths: {}
};

const styles = `
    .resize-handle:hover {
        background-color: var(--mui-palette-primary-main) !important;
    }
`;

export const OpenAPIEditor: React.FC<OpenAPIEditorProps> = ({
    initialSpec = JSON.stringify(defaultSpec, null, 2),
    height = '100vh',
    width = '100%',
    showHeader = true,
    showActions = true,
    onSpecChange,
    className
}) => {
    const theme = useTheme();
    const [spec, setSpec] = useState(initialSpec);
    const [parsedSpec, setParsedSpec] = useState<OpenAPIV3.Document | null>(null);
    const [isValid, setIsValid] = useState(true);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [showErrors, setShowErrors] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('both');

    const handleViewModeChange = useCallback((mode: ViewMode) => {
        setViewMode(mode);
    }, []);

    const validateSpec = useCallback(async (specString: string) => {
        try {
            const schema = JSON.parse(specString);
            const validator = new OpenAPISchemaValidator({ version: 3 });
            const result = validator.validate(schema);

            const errors: ValidationError[] = [];

            // Add schema validation errors
            if (result.errors.length > 0) {
                errors.push(...result.errors.map(error => ({
                    message: error.message || 'Validation error',
                    path: error.schemaPath || error.instancePath || '',
                    severity: 'error' as const
                })));
            }

            // Validate types in schemas
            const validateSchemaTypes = (schema: any, path: string = '') => {
                if (!schema || typeof schema !== 'object') return;

                // Check for invalid type
                if (schema.type && !VALID_TYPES.includes(schema.type)) {
                    errors.push({
                        message: `Invalid type "${schema.type}". Must be one of: ${VALID_TYPES.join(', ')}`,
                        path: path ? `${path}.type` : 'type',
                        severity: 'error'
                    });
                }

                // Check for invalid format
                if (schema.format && !VALID_FORMATS.includes(schema.format)) {
                    errors.push({
                        message: `Invalid format "${schema.format}". Must be one of: ${VALID_FORMATS.join(', ')}`,
                        path: path ? `${path}.format` : 'format',
                        severity: 'error'
                    });
                }

                // Check for invalid type-format combinations
                if (schema.type && schema.format) {
                    const validFormatForType: Record<string, string[]> = {
                        'string': ['byte', 'binary', 'date', 'date-time', 'password', 'email', 'uuid', 'uri', 'hostname', 'ipv4', 'ipv6'],
                        'number': ['float', 'double'],
                        'integer': ['int32', 'int64']
                    };

                    if (validFormatForType[schema.type] && !validFormatForType[schema.type].includes(schema.format)) {
                        errors.push({
                            message: `Format "${schema.format}" is not valid for type "${schema.type}"`,
                            path: path ? `${path}.format` : 'format',
                            severity: 'error'
                        });
                    }
                }

                // Recursively check properties and items
                if (schema.properties) {
                    Object.entries(schema.properties).forEach(([key, value]) => {
                        validateSchemaTypes(value, path ? `${path}.properties.${key}` : `properties.${key}`);
                    });
                }

                if (schema.items) {
                    validateSchemaTypes(schema.items, path ? `${path}.items` : 'items');
                }

                if (schema.allOf) {
                    schema.allOf.forEach((item: any, index: number) => {
                        validateSchemaTypes(item, path ? `${path}.allOf[${index}]` : `allOf[${index}]`);
                    });
                }

                if (schema.anyOf) {
                    schema.anyOf.forEach((item: any, index: number) => {
                        validateSchemaTypes(item, path ? `${path}.anyOf[${index}]` : `anyOf[${index}]`);
                    });
                }

                if (schema.oneOf) {
                    schema.oneOf.forEach((item: any, index: number) => {
                        validateSchemaTypes(item, path ? `${path}.oneOf[${index}]` : `oneOf[${index}]`);
                    });
                }
            };

            // Validate all schemas in the document
            if (schema.components?.schemas) {
                Object.entries(schema.components.schemas).forEach(([key, value]) => {
                    validateSchemaTypes(value, `components.schemas.${key}`);
                });
            }

            // Validate request/response schemas in paths
            if (schema.paths) {
                Object.entries(schema.paths).forEach(([path, pathItem]: [string, any]) => {
                    Object.entries(pathItem).forEach(([method, operation]: [string, any]) => {
                        if (method === 'parameters') {
                            operation.forEach((param: any, index: number) => {
                                if (param.schema) {
                                    validateSchemaTypes(param.schema, `paths.${path}.parameters[${index}].schema`);
                                }
                            });
                        } else if (typeof operation === 'object') {
                            // Check request body
                            if (operation.requestBody?.content) {
                                Object.entries(operation.requestBody.content).forEach(([contentType, content]: [string, any]) => {
                                    if (content.schema) {
                                        validateSchemaTypes(content.schema, `paths.${path}.${method}.requestBody.content.${contentType}.schema`);
                                    }
                                });
                            }

                            // Check responses
                            if (operation.responses) {
                                Object.entries(operation.responses).forEach(([status, response]: [string, any]) => {
                                    if (response.content) {
                                        Object.entries(response.content).forEach(([contentType, content]: [string, any]) => {
                                            if (content.schema) {
                                                validateSchemaTypes(content.schema, `paths.${path}.${method}.responses.${status}.content.${contentType}.schema`);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                });
            }

            if (errors.length === 0) {
                setValidationErrors([]);
                setIsValid(true);
                onSpecChange?.(specString, true);
                return true;
            }

            setValidationErrors(errors);
            setIsValid(false);
            onSpecChange?.(specString, false);
            return false;
        } catch (error) {
            setValidationErrors([{
                message: error instanceof Error ? error.message : 'Invalid JSON',
                path: '',
                severity: 'error'
            }]);
            setIsValid(false);
            onSpecChange?.(specString, false);
            return false;
        }
    }, [onSpecChange]);

    const handleEditorChange = useCallback(async (value: string | undefined) => {
        if (!value) return;
        setSpec(value);
        try {
            const parsed = JSON.parse(value);
            setParsedSpec(parsed);
            await validateSpec(value);
        } catch (error) {
            setParsedSpec(null);
            setIsValid(false);
            setValidationErrors([{
                message: error instanceof Error ? error.message : 'Invalid JSON',
                path: '',
                severity: 'error'
            }]);
            onSpecChange?.(value, false);
        }
    }, [validateSpec, onSpecChange]);

    useEffect(() => {
        validateSpec(spec);
    }, [spec, validateSpec]);

    const handleFormat = useCallback(() => {
        try {
            const formatted = JSON.stringify(JSON.parse(spec), null, 2);
            setSpec(formatted);
        } catch (error) {
            // Invalid JSON, can't format
        }
    }, [spec]);

    const handleReset = useCallback(() => {
        setSpec(JSON.stringify(defaultSpec, null, 2));
        setParsedSpec(defaultSpec);
        setIsValid(true);
        setValidationErrors([]);
        onSpecChange?.(JSON.stringify(defaultSpec, null, 2), true);
    }, [onSpecChange]);

    const handleDownload = useCallback(() => {
        const blob = new Blob([spec], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'openapi-spec.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [spec]);

    const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setSpec(content);
                validateSpec(content);
            };
            reader.readAsText(file);
        }
    }, [validateSpec]);

    const getValidationStatus = () => {
        if (!isValid) {
            return {
                icon: <ErrorIcon color="error" />,
                label: `${validationErrors.length} Error${validationErrors.length !== 1 ? 's' : ''}`,
                color: 'error' as const
            };
        }
        return {
            icon: <SuccessIcon color="success" />,
            label: 'Valid',
            color: 'success' as const
        };
    };

    const validationStatus = getValidationStatus();

    const renderEditor = () => (
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRight: viewMode === 'both' ? 1 : 0,
                borderColor: 'divider',
                borderRadius: 0
            }}
        >
            <Box sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: theme.palette.background.paper
            }}>
                <Typography variant="h6">
                    Specification Editor
                </Typography>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={spec}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        formatOnPaste: true,
                        formatOnType: true,
                        tabSize: 2,
                        fontSize: 14,
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        folding: true,
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 3,
                        renderValidationDecorations: 'on',
                        renderWhitespace: 'selection',
                        scrollbar: {
                            vertical: 'visible',
                            horizontal: 'visible'
                        }
                    }}
                    theme="vs-dark"
                />
            </Box>
        </Paper>
    );

    const renderPreview = () => (
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0
            }}
        >
            <Box sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: theme.palette.background.paper
            }}>
                <Typography variant="h6">
                    API Documentation Preview
                </Typography>
            </Box>
            <Box sx={{
                flex: 1,
                overflow: 'auto',
                bgcolor: theme.palette.background.paper
            }}>
                {parsedSpec ? (
                    <SwaggerUI
                        spec={parsedSpec}
                        docExpansion="list"
                        defaultModelsExpandDepth={1}
                        defaultModelExpandDepth={1}
                        supportedSubmitMethods={[]}
                        showExtensions={true}
                        showCommonExtensions={true}
                        displayOperationId={true}
                        displayRequestDuration={true}
                        filter={true}
                    />
                ) : (
                    <Box sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                    }}>
                        <Typography color="error">
                            Invalid OpenAPI specification
                        </Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );

    return (
        <Box
            sx={{
                height,
                width,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.background.default,
                borderRadius: 1,
                overflow: 'hidden'
            }}
            className={className}
        >
            <style>{styles}</style>
            {showHeader && (
                <>
                    {/* Header */}
                    <Box sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h5" component="h1">
                                OpenAPI Editor
                            </Typography>
                            <Chip
                                icon={validationStatus.icon}
                                label={validationStatus.label}
                                color={validationStatus.color}
                                size="small"
                                onClick={() => setShowErrors(!showErrors)}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box>
                        {showActions && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <input
                                    type="file"
                                    accept=".json"
                                    style={{ display: 'none' }}
                                    id="upload-spec"
                                    onChange={handleUpload}
                                />
                                <Tooltip title="Upload Specification">
                                    <label htmlFor="upload-spec">
                                        <IconButton component="span" color="primary">
                                            <UploadIcon />
                                        </IconButton>
                                    </label>
                                </Tooltip>
                                <Tooltip title="Download Specification">
                                    <IconButton onClick={handleDownload} color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Format JSON">
                                    <IconButton onClick={handleFormat} color="primary">
                                        <FormatIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Reset to Default">
                                    <IconButton onClick={handleReset} color="primary">
                                        <ResetIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>

                    {/* Validation Errors */}
                    <Collapse in={showErrors && validationErrors.length > 0}>
                        <Box sx={{ px: 2, py: 1 }}>
                            <Alert
                                severity="error"
                                variant="outlined"
                                sx={{
                                    maxHeight: '200px',
                                    overflow: 'auto',
                                    '& .MuiAlert-message': {
                                        width: '100%'
                                    }
                                }}
                            >
                                <AlertTitle>Validation Errors</AlertTitle>
                                {validationErrors.map((error, index) => (
                                    <Box key={index} sx={{ mb: 1 }}>
                                        <Typography variant="body2" component="div">
                                            <strong>{error.path || 'Root'}:</strong> {error.message}
                                        </Typography>
                                    </Box>
                                ))}
                            </Alert>
                        </Box>
                    </Collapse>

                    {/* Tabs */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            px: 2,
                            py: 1,
                            borderBottom: 1,
                            borderColor: 'divider',
                            bgcolor: theme.palette.background.paper
                        }}
                    >
                        <Chip
                            icon={<CodeIcon />}
                            label="Editor"
                            onClick={() => handleViewModeChange('editor')}
                            color={viewMode === 'editor' ? 'primary' : 'default'}
                            variant={viewMode === 'editor' ? 'filled' : 'outlined'}
                            sx={{ cursor: 'pointer' }}
                        />
                        <Chip
                            icon={<DescriptionIcon />}
                            label="Preview"
                            onClick={() => handleViewModeChange('preview')}
                            color={viewMode === 'preview' ? 'primary' : 'default'}
                            variant={viewMode === 'preview' ? 'filled' : 'outlined'}
                            sx={{ cursor: 'pointer' }}
                        />
                        <Chip
                            icon={<BothIcon />}
                            label="Both"
                            onClick={() => handleViewModeChange('both')}
                            color={viewMode === 'both' ? 'primary' : 'default'}
                            variant={viewMode === 'both' ? 'filled' : 'outlined'}
                            sx={{ cursor: 'pointer' }}
                        />
                    </Stack>
                </>
            )}

            {/* Main Content */}
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                {viewMode === 'both' ? (
                    <PanelGroup direction="horizontal">
                        <Panel defaultSize={50} minSize={30}>
                            {renderEditor()}
                        </Panel>
                        <PanelResizeHandle
                            className="resize-handle"
                            style={{
                                width: '4px',
                                background: theme.palette.divider,
                                cursor: 'col-resize',
                                transition: 'background-color 0.2s ease'
                            }}
                        />
                        <Panel defaultSize={50} minSize={30}>
                            {renderPreview()}
                        </Panel>
                    </PanelGroup>
                ) : viewMode === 'editor' ? (
                    renderEditor()
                ) : (
                    renderPreview()
                )}
            </Box>
        </Box>
    );
}; 