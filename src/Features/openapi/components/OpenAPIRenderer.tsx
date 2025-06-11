import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useState, useCallback } from "react";
import type { OpenAPIDocument, ParsedEndpoint } from "../types";
import { EndpointDetail } from "./EndpointDetail";
import { EndpointList } from "./EndpointList";

interface OpenAPIRendererProps {
    spec: OpenAPIDocument;
}

export const OpenAPIRenderer: React.FC<OpenAPIRendererProps> = ({ spec }) => {
    const [selectedEndpoint, setSelectedEndpoint] = useState<ParsedEndpoint | null>(null);

    const handleSelectEndpoint = useCallback((endpoint: ParsedEndpoint) => {
        setSelectedEndpoint(endpoint);
    }, []);

    return (
        <Box sx={{ height: '100vh', p: 2 }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid component={Box} size={{ xs: 12, md: 4 }} sx={{ height: '100%' }}>
                    <EndpointList
                        spec={spec}
                        selectedEndpoint={selectedEndpoint}
                        onSelectEndpoint={handleSelectEndpoint}
                    />
                </Grid>
                <Grid component={Box} size={{ xs: 12, md: 8 }} sx={{ height: '100%' }}>
                    {selectedEndpoint ? (
                        <EndpointDetail endpoint={selectedEndpoint} spec={spec} />
                    ) : (
                        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary" align="center">
                                    Select an endpoint from the list to view details
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};