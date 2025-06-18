import { Box, Typography } from "@mui/material";
import React from "react";
import type { ParsedEndpoint } from "../../types";
import { ResponseItem } from "./ResponseItem";

interface ResponsesTabProps {
    responses: ParsedEndpoint['operation']['responses'];
}

export const ResponsesTab: React.FC<ResponsesTabProps> = ({ responses }) => {
    if (!responses) {
        return <Typography color="text.secondary">No responses defined</Typography>;
    }

    return (
        <Box>
            {Object.entries(responses).map(([status, response]) => (
                <ResponseItem key={status} status={status} response={response} />
            ))}
        </Box>
    );
}; 