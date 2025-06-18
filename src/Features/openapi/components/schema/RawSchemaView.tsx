import { Box, Paper, Typography } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { schemaStyles } from "./SchemaStyles";
import { generateExample } from "./generateExample";

interface RawSchemaViewProps {
    schema: OpenAPIV3.SchemaObject;
    selectedContentType: string;
}

export const RawSchemaView: React.FC<RawSchemaViewProps> = ({
    schema,
    selectedContentType
}) => {
    const example = generateExample(schema, selectedContentType);
    const isXml = selectedContentType === 'application/xml';

    return (
        <Box sx={{ pl: 2 }}>
            <Box component="pre" sx={{ ...schemaStyles.container, mb: 1 }}>
                <Box component="span" sx={schemaStyles.key}>contentType</Box>:
                <Box component="span" sx={{ ml: 1, color: 'primary.main' }}>{selectedContentType}</Box>
            </Box>
            <Typography variant="caption" sx={{ mb: 1, color: 'text.secondary', display: 'block' }}>
                Example Payload
            </Typography>
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    backgroundColor: 'grey.50',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    whiteSpace: 'pre',
                    wordBreak: 'break-word',
                    overflowX: 'auto',
                }}
            >
                <code style={{ color: isXml ? '#7c4dff' : '#1976d2' }}>{example}</code>
            </Paper>
        </Box>
    );
}; 