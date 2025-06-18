import { Box, Typography, Divider } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { SchemaRenderer } from "./SchemaRenderer";
import type { ContentType } from "./SchemaContentType";

interface ComposedSchemaRendererProps {
    keyword: 'anyOf' | 'oneOf';
    schemas: OpenAPIV3.SchemaObject[];
    level: number;
    selectedContentType?: ContentType;
}

export const ComposedSchemaRenderer: React.FC<ComposedSchemaRendererProps> = ({
    keyword,
    schemas,
    level,
    selectedContentType
}) => (
    <Box sx={{ ml: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1 }}>{keyword}</Typography>
        {schemas.map((subSchema, idx) => (
            <Box key={idx} sx={{ mb: 2, pl: 2, borderLeft: '2px dashed #bdbdbd' }}>
                <SchemaRenderer
                    schema={subSchema}
                    level={level + 1}
                    selectedContentType={selectedContentType}
                />
                {idx < schemas.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
        ))}
    </Box>
); 