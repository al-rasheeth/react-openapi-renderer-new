import { Box, Typography, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import type { ParsedEndpoint } from "../../types";
import { ParametersTable } from "./ParameterItem";
import { SchemaRenderer } from "../schema/SchemaRenderer";
import { SchemaContentType, type ContentType } from "../schema/SchemaContentType";

interface RequestTabProps {
    endpoint: ParsedEndpoint;
}

export const RequestTab: React.FC<RequestTabProps> = ({ endpoint }) => {
    const { parameters, operation } = endpoint;
    const requestBody = operation.requestBody;

    const hasParameters = parameters.length > 0;
    const hasRequestBody = requestBody && 'content' in requestBody && Object.keys(requestBody.content).length > 0;

    // For content type switching
    const contentTypes = hasRequestBody ? Object.keys(requestBody.content) as ContentType[] : [];
    const [selectedContentType, setSelectedContentType] = useState<ContentType>(contentTypes[0]);
    const selectedSchema = hasRequestBody && requestBody.content[selectedContentType]?.schema;

    if (!hasParameters && !hasRequestBody) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                    No request configuration available for this endpoint
                </Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={3} sx={{ p: 2 }}>
            {hasParameters && (
                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>Parameters</Typography>
                    <ParametersTable parameters={parameters} />
                </Box>
            )}

            {hasRequestBody && selectedSchema && (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h6" sx={{ mr: 2, flexShrink: 0 }}>Request Body</Typography>
                        <Box sx={{ minWidth: 220, flexShrink: 0 }}>
                            <SchemaContentType
                                contentTypes={contentTypes}
                                selectedType={selectedContentType}
                                onTypeChange={setSelectedContentType}
                            />
                        </Box>
                    </Box>
                    <Paper sx={{ p: 2 }}>
                        <SchemaRenderer
                            schema={selectedSchema}
                            selectedContentType={selectedContentType}
                        />
                    </Paper>
                </Box>
            )}
        </Stack>
    );
}; 