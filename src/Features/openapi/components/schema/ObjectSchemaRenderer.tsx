import CodeIcon from '@mui/icons-material/Code';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { RawViewer } from "./RawViewer";
import type { ContentType } from "./SchemaContentType";
import { SchemaProperty } from "./SchemaProperty";
import { SchemaRenderer } from "./SchemaRenderer";

interface ObjectSchemaRendererProps {
    schema: OpenAPIV3.NonArraySchemaObject;
    name?: string;
    required?: boolean;
    level?: number;
    selectedContentType: ContentType;
    onToggleView: () => void;
    isRawView: boolean;
}

export const ObjectSchemaRenderer: React.FC<ObjectSchemaRendererProps> = ({
    schema,
    name,
    required,
    level = 0,
    selectedContentType,
    onToggleView,
    isRawView
}) => {

    const properties = schema.properties || {};
    const requiredProps = schema.required || [];

    if (isRawView) {
        return (
            <Box sx={{ pl: level * 2 }}>
                {name && (
                    <Box sx={{ mb: 1, fontWeight: 600, fontFamily: 'monospace', fontSize: '1rem', color: '#222' }}>
                        {name}
                        {required && <Box component="span" sx={{ color: 'error.main', ml: 1, fontSize: '0.75rem' }}>required</Box>}
                    </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title={isRawView ? "Switch to styled view" : "Switch to raw view"}>
                        <IconButton onClick={onToggleView} size="small" sx={{ ml: 1 }}>
                            <ViewModuleIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <RawViewer
                    schema={schema}
                    contentType={selectedContentType}
                />
            </Box>
        );
    }

    return (
        <Box sx={{ pl: level * 2 }}>
            {name && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography component="span" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '1rem', color: '#222' }}>{name}</Typography>
                    {required && <Box component="span" sx={{ color: 'error.main', ml: 1, fontSize: '0.75rem' }}>required</Box>}
                </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Tooltip title="Switch to raw view">
                    <IconButton onClick={onToggleView} size="small" sx={{ ml: 1 }}>
                        <CodeIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            {schema.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{schema.description}</Typography>
            )}
            {/* Opening curly brace */}
            <Typography component="span" sx={{ fontFamily: 'monospace', color: '#888', fontSize: '1.1rem', ml: 0 }}>{'{'}</Typography>
            <Box sx={{ ml: 3 }}>
                {Object.entries(properties).map(([propName, propSchema]) => {
                    const isRequired = requiredProps.includes(propName);
                    return (
                        <SchemaProperty
                            key={propName}
                            name={propName}
                            schema={propSchema as any}
                            level={0}
                            isRequired={isRequired}
                        />
                    );
                })}
            </Box>
            {/* Closing curly brace */}
            <Typography component="span" sx={{ fontFamily: 'monospace', color: '#888', fontSize: '1.1rem', ml: 0 }}>{'}'}</Typography>
            {schema.example && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Example:
                    </Typography>
                    <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', margin: 0 }}>
                        {JSON.stringify(schema.example, null, 2)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}; 