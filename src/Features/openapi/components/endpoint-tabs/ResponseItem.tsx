import { Box, Typography } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { SchemaRenderer } from "../schema/SchemaRenderer";
import type { ContentType } from "../schema/SchemaContentType";

interface ResponseItemProps {
    status: string;
    response: OpenAPIV3.ResponseObject;
}

export const ResponseItem: React.FC<ResponseItemProps> = ({ status, response }) => {
    const hasContent = 'content' in response && response.content && Object.keys(response.content).length > 0;
    const contentTypes = hasContent && response.content ? Object.keys(response.content) as ContentType[] : [];

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">
                {status} - {'description' in response ? response.description : 'No description'}
            </Typography>
            {hasContent && response.content && (
                <Box sx={{ mt: 1 }}>
                    {Object.entries(response.content).map(([contentType, content]) => (
                        content.schema && (
                            <SchemaRenderer 
                                key={contentType}
                                schema={content.schema}
                                contentTypes={contentTypes}
                            />
                        )
                    ))}
                </Box>
            )}
        </Box>
    );
}; 