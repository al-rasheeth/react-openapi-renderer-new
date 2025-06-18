import CodeIcon from '@mui/icons-material/Code';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { RawSchemaView } from "./RawSchemaView";
import type { ContentType } from "./SchemaContentType";
import { SchemaExample } from "./SchemaExample";
import { SchemaProperty } from "./SchemaProperty";
import { SchemaRenderer } from "./SchemaRenderer";
import { schemaStyles } from "./SchemaStyles";

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
                    <Box component="pre" sx={{ ...schemaStyles.container, mb: 1 }}>
                        <Box component="span" sx={schemaStyles.name}>{name}</Box>
                        {required && <Box component="span" sx={schemaStyles.required}>required</Box>}
                    </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title={isRawView ? "Switch to styled view" : "Switch to raw view"}>
                        <IconButton onClick={onToggleView} size="small" sx={{ ml: 1 }}>
                            <ViewModuleIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <RawSchemaView
                    schema={schema}
                    selectedContentType={selectedContentType}
                />
            </Box>
        );
    }

    return (
        <Box sx={{ pl: level * 2 }}>
            {name && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography component="span" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '1rem', color: '#222' }}>{name}</Typography>
                    {required && <Box component="span" sx={schemaStyles.required}>required</Box>}
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
                    const propType = (propSchema as OpenAPIV3.SchemaObject).type;
                    const propFormat = (propSchema as OpenAPIV3.SchemaObject).format;
                    const propDescription = (propSchema as OpenAPIV3.SchemaObject).description;
                    const propExample = (propSchema as OpenAPIV3.SchemaObject).example;
                    const propEnum = (propSchema as OpenAPIV3.SchemaObject).enum;
                    const isRequired = requiredProps.includes(propName);
                    return (
                        <SchemaProperty
                            key={propName}
                            name={propName}
                            type={propType}
                            required={isRequired}
                            description={propDescription}
                            format={propFormat}
                            example={propExample}
                            enum={propEnum}
                            indent={0}
                        >
                            {typeof propSchema === 'object' && (propType === 'object' || propType === 'array') && (
                                <SchemaRenderer
                                    schema={propSchema}
                                    name={undefined}
                                    required={undefined}
                                    level={level + 2}
                                    selectedContentType={selectedContentType}
                                />
                            )}
                        </SchemaProperty>
                    );
                })}
            </Box>
            {/* Closing curly brace */}
            <Typography component="span" sx={{ fontFamily: 'monospace', color: '#888', fontSize: '1.1rem', ml: 0 }}>{'}'}</Typography>
            {schema.example && (
                <SchemaExample example={schema.example} />
            )}
        </Box>
    );
}; 