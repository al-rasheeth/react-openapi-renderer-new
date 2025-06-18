import CodeIcon from '@mui/icons-material/Code';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { RawSchemaView } from "./RawSchemaView";
import type { ContentType } from "./SchemaContentType";
import { SchemaExample } from "./SchemaExample";
import { SchemaRenderer } from "./SchemaRenderer";
import { schemaStyles } from "./SchemaStyles";

interface ArraySchemaRendererProps {
    schema: OpenAPIV3.ArraySchemaObject;
    name?: string;
    required?: boolean;
    level?: number;
    selectedContentType: ContentType;
    onToggleView: () => void;
    isRawView: boolean;
}

export const ArraySchemaRenderer: React.FC<ArraySchemaRendererProps> = ({
    schema,
    name,
    required,
    level = 0,
    selectedContentType,
    onToggleView,
    isRawView
}) => {

    const items = schema.items;

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
            {/* Opening square bracket */}
            <Typography component="span" sx={{ fontFamily: 'monospace', color: '#888', fontSize: '1.1rem', ml: 0 }}>{'['}</Typography>
            <Box sx={{ ml: 3 }}>
                {items && (
                    <SchemaRenderer
                        schema={items}
                        name={undefined}
                        required={undefined}
                        level={level + 2}
                        selectedContentType={selectedContentType}
                    />
                )}
            </Box>
            {/* Closing square bracket */}
            <Typography component="span" sx={{ fontFamily: 'monospace', color: '#888', fontSize: '1.1rem', ml: 0 }}>{']'}</Typography>
            {schema.example && (
                <SchemaExample example={schema.example} />
            )}
        </Box>
    );
}; 