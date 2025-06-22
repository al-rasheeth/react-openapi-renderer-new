import { Box, Typography, Chip } from "@mui/material";

export type ContentType = 'application/json' | 'application/xml' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

interface SchemaContentTypeProps {
    contentTypes: ContentType[];
    selectedType: ContentType;
    onTypeChange: (type: ContentType) => void;
}

export const SchemaContentType: React.FC<SchemaContentTypeProps> = ({
    contentTypes,
    selectedType,
    onTypeChange
}) => {
    const getContentTypeColor = (contentType: ContentType) => {
        if (contentType.includes('json')) return 'primary';
        if (contentType.includes('xml')) return 'secondary';
        if (contentType.includes('form')) return 'warning';
        if (contentType.includes('text')) return 'info';
        return 'default';
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
                Content Type:
            </Typography>
            {contentTypes.map((contentType) => (
                <Chip
                    key={contentType}
                    label={contentType}
                    size="small"
                    color={getContentTypeColor(contentType)}
                    variant={selectedType === contentType ? "filled" : "outlined"}
                    onClick={() => onTypeChange(contentType)}
                    sx={{ cursor: 'pointer' }}
                />
            ))}
        </Box>
    );
}; 