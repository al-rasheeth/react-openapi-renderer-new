import { Box, IconButton, Tooltip } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import React from "react";

interface SchemaRawToggleProps {
    isRawView: boolean;
    onToggle: () => void;
}

export const SchemaRawToggle: React.FC<SchemaRawToggleProps> = ({ isRawView, onToggle }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Tooltip title={isRawView ? "Switch to styled view" : "Switch to raw view"}>
            <IconButton onClick={onToggle} size="small" sx={{ ml: 1 }}>
                {isRawView ? <ViewModuleIcon fontSize="small" /> : <CodeIcon fontSize="small" />}
            </IconButton>
        </Tooltip>
    </Box>
); 