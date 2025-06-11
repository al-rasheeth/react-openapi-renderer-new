import { TableRow, TableCell, Typography, Box, Card, CardContent, Stack, Chip, Alert, Divider, TableContainer, Paper, Table, TableHead, TableBody } from "@mui/material";
import type { OpenAPIDocument, Parameter, ParsedEndpoint, Schema } from "../types";
import { getMethodColor } from "../utils";

interface EndpointDetailProps {
    endpoint: ParsedEndpoint;
    spec: OpenAPIDocument;
}

export const EndpointDetail: React.FC<EndpointDetailProps> = ({ endpoint, spec }) => {
    const { path, method, operation } = endpoint;

    const renderParameter = (param: Parameter) => (
        <TableRow key={param.name}>
            <TableCell>
                <Typography variant="body2" fontFamily="monospace">
                    {param.name}
                    {param.required && <Typography component="span" color="error">*</Typography>}
                </Typography>
            </TableCell>
            <TableCell>{param.in}</TableCell>
            <TableCell>{param.schema?.type || 'string'}</TableCell>
            <TableCell>{param.description || '-'}</TableCell>
        </TableRow>
    );

    const renderSchema = (schema: Schema, level: number = 0): React.ReactNode => {
        if (!schema) return null;

        if (schema.$ref) {
            const refName = schema.$ref.split('/').pop();
            return <Typography variant="body2" fontFamily="monospace">{refName}</Typography>;
        }

        if (schema.type === 'object' && schema.properties) {
            return (
                <Box sx={{ ml: level * 2 }}>
                    {Object.entries(schema.properties).map(([propName, propSchema]) => (
                        <Box key={propName} sx={{ mb: 1 }}>
                            <Typography variant="body2">
                                <strong>{propName}</strong>
                                {schema.required?.includes(propName) && <span style={{ color: 'red' }}>*</span>}
                                : {propSchema.type || 'any'}
                                {propSchema.format && ` (${propSchema.format})`}
                            </Typography>
                            {propSchema.description && (
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                    {propSchema.description}
                                </Typography>
                            )}
                            {propSchema.type === 'object' && renderSchema(propSchema, level + 1)}
                        </Box>
                    ))}
                </Box>
            );
        }

        if (schema.type === 'array' && schema.items) {
            return (
                <Box sx={{ ml: level * 2 }}>
                    <Typography variant="body2">Array of:</Typography>
                    {renderSchema(schema.items, level + 1)}
                </Box>
            );
        }

        return null;
    };

    return (
        <Card sx={{ height: '100%', overflow: 'auto' }}>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Chip
                                label={method}
                                color={getMethodColor(method)}
                                size="medium"
                                sx={{ fontWeight: 'bold' }}
                            />
                            <Typography variant="h6" fontFamily="monospace">
                                {path}
                            </Typography>
                        </Box>
                        {operation.summary && (
                            <Typography variant="h6" color="text.secondary">
                                {operation.summary}
                            </Typography>
                        )}
                        {operation.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {operation.description}
                            </Typography>
                        )}
                        {operation.deprecated && (
                            <Alert severity="warning" sx={{ mt: 1 }}>
                                This endpoint is deprecated
                            </Alert>
                        )}
                    </Box>

                    <Divider />

                    {/* Parameters */}
                    {operation.parameters && operation.parameters.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>Parameters</Typography>
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>In</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {operation.parameters.map(renderParameter)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* Request Body */}
                    {operation.requestBody && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Request Body
                                {operation.requestBody.required && <Typography component="span" color="error">*</Typography>}
                            </Typography>
                            {operation.requestBody.description && (
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {operation.requestBody.description}
                                </Typography>
                            )}
                            {Object.entries(operation.requestBody.content).map(([mediaType, content]) => (
                                <Box key={mediaType} sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" fontFamily="monospace" gutterBottom>
                                        {mediaType}
                                    </Typography>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        {content.schema && renderSchema(content.schema)}
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Responses */}
                    <Box>
                        <Typography variant="h6" gutterBottom>Responses</Typography>
                        <Stack spacing={2}>
                            {Object.entries(operation.responses).map(([statusCode, response]) => (
                                <Box key={statusCode}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Chip
                                            label={statusCode}
                                            size="small"
                                            color={statusCode.startsWith('2') ? 'success' : statusCode.startsWith('4') ? 'warning' : 'error'}
                                        />
                                        <Typography variant="body2">{response.description}</Typography>
                                    </Box>
                                    {response.content && Object.entries(response.content).map(([mediaType, content]) => (
                                        <Box key={mediaType} sx={{ ml: 2 }}>
                                            <Typography variant="caption" fontFamily="monospace">
                                                {mediaType}
                                            </Typography>
                                            {content.schema && (
                                                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                                                    {renderSchema(content.schema)}
                                                </Paper>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};