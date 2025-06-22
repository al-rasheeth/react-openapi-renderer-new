import { Box, Typography, Chip } from "@mui/material";

interface SchemaRefRendererProps {
    refValue: string;
    isRawView: boolean;
    onToggle: () => void;
    level?: number;
}

export const SchemaRefRenderer: React.FC<SchemaRefRendererProps> = ({
    refValue,
    isRawView,
    onToggle,
    level = 0
}) => {
    const refName = refValue.split('/').pop() || 'Unknown';

    return (
        <Box sx={{ pl: level * 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                    Reference:
                </Typography>
                <Chip 
                    label={refName} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ fontFamily: 'monospace' }}
                />
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                {refValue}
            </Typography>
        </Box>
    );
}; 