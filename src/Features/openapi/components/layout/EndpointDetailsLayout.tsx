import { Box, Typography, Paper, Stack } from "@mui/material";
import type { ParsedEndpoint } from "../../types";
import { MethodChip } from "../common/MethodChip";
import { EndpointTabs } from "../common/EndpointTabs";

interface EndpointDetailsLayoutProps {
    endpoint: ParsedEndpoint;
}

export const EndpointDetailsLayout: React.FC<EndpointDetailsLayoutProps> = ({ endpoint }) => {
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <MethodChip method={endpoint.method} />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontFamily: 'monospace',
                            wordBreak: 'break-all'
                        }}
                    >
                        {endpoint.path}
                    </Typography>
                </Stack>
                {endpoint.operation.summary && (
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        {endpoint.operation.summary}
                    </Typography>
                )}
                {endpoint.operation.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {endpoint.operation.description}
                    </Typography>
                )}
            </Paper>

            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <EndpointTabs endpoint={endpoint} />
            </Box>
        </Box>
    );
}; 