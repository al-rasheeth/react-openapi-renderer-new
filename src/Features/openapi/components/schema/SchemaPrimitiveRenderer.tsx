import CodeIcon from '@mui/icons-material/Code';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box, IconButton, Tooltip, Typography, Chip } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";

interface SchemaPrimitiveRendererProps {
    schema: OpenAPIV3.NonArraySchemaObject;
    name?: string;
    required?: boolean;
    type: string;
    onToggle: () => void;
    level?: number;
}

export const SchemaPrimitiveRenderer: React.FC<SchemaPrimitiveRendererProps> = ({
    schema,
    name,
    required,
    type,
    onToggle,
    level = 0
}) => {
    return (
        <Box sx={{ pl: level * 2 }}>
            {name && (
                <Box sx={{ mb: 1, fontWeight: 600, fontFamily: 'monospace', fontSize: '1rem', color: '#222' }}>
                    {name}
                    {required && <Box component="span" sx={{ color: 'error.main', ml: 1, fontSize: '0.75rem' }}>required</Box>}
                </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Tooltip title="Switch to raw view">
                    <IconButton onClick={onToggle} size="small" sx={{ ml: 1 }}>
                        <CodeIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip label={type} size="small" variant="outlined" />
                {schema.format && (
                    <Chip label={schema.format} size="small" variant="filled" />
                )}
                {schema.enum && (
                    <Chip label={`enum(${schema.enum.length})`} size="small" color="info" variant="outlined" />
                )}
            </Box>
            {schema.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {schema.description}
                </Typography>
            )}
            {schema.example !== undefined && (
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