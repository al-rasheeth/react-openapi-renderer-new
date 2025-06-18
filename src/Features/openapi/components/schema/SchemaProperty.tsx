import { Box, Chip, Typography } from "@mui/material";
import { schemaStyles } from "./SchemaStyles";

interface SchemaPropertyProps {
    name: string;
    type?: string;
    required?: boolean;
    description?: string;
    format?: string;
    example?: any;
    enum?: string[];
    indent?: number;
    children?: React.ReactNode;
}

export const SchemaProperty: React.FC<SchemaPropertyProps> = ({
    name,
    type,
    required,
    description,
    format,
    example,
    enum: enumValues,
    indent = 0,
    children
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', pl: indent * 2, borderLeft: indent ? '2px solid #e0e0e0' : 'none', mb: 1 }}>
            <Box sx={{ minWidth: 180 }}>
                <Typography component="span" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '1rem', color: '#222' }}>
                    {name}
                </Typography>
                {required && (
                    <Chip label="required" size="small" color="error" sx={{ ml: 1, height: 20, fontSize: '0.75rem' }} />
                )}
            </Box>
            {type && (
                <Typography component="span" sx={{ color: 'primary.main', fontFamily: 'monospace', fontSize: '0.95rem', ml: 2 }}>
                    {type}{format ? ` (${format})` : ''}
                </Typography>
            )}
            {enumValues && enumValues.length > 0 && (
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography component="span" sx={{ color: 'secondary.main', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                        [
                        {enumValues.map((v, i) => (
                            <span key={v}>
                                <Chip label={v} size="small" sx={{ mx: 0.25, fontSize: '0.8em', bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                                {i < enumValues.length - 1 && ','}
                            </span>
                        ))}
                        ]
                    </Typography>
                </Box>
            )}
            {description && (
                <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.95rem', ml: 2 }}>
                    {description}
                </Typography>
            )}
            {example !== undefined && (
                <Box sx={{ ml: 2, bgcolor: '#f5f5f5', px: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem', color: '#333' }}>
                    example: {typeof example === 'object' ? JSON.stringify(example) : String(example)}
                </Box>
            )}
            {children}
        </Box>
    );
}; 