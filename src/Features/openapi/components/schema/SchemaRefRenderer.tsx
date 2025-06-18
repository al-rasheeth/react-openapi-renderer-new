import { Box, Tooltip, IconButton } from "@mui/material";
import { SchemaProperty } from "./SchemaProperty";
import { schemaStyles } from "./SchemaStyles";
import CodeIcon from '@mui/icons-material/Code';
import React from "react";

interface SchemaRefRendererProps {
    refValue: string;
    isRawView: boolean;
    onToggle: () => void;
    level: number;
}

export const SchemaRefRenderer: React.FC<SchemaRefRendererProps> = ({ refValue, isRawView, onToggle, level }) => (
    <Box component="pre" sx={{ ...schemaStyles.container, pl: level * 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchemaProperty 
                name="$ref" 
                description={refValue}
            />
            <Tooltip title="Switch to raw view">
                <IconButton onClick={onToggle} size="small" sx={{ ml: 1 }}>
                    <CodeIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
); 