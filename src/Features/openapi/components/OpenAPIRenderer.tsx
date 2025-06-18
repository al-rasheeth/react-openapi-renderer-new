import { Box } from "@mui/material";
import type { OpenAPIDocument } from "../types";
import { ApiDocumentation } from "./layout/ApiDocumentation";

interface OpenAPIRendererProps {
    spec: OpenAPIDocument;
}

export const OpenAPIRenderer: React.FC<OpenAPIRendererProps> = ({ spec }) => {
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ApiDocumentation document={spec} />
        </Box>
    );
};