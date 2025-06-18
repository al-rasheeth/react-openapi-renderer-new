import { Box, Tooltip, IconButton } from "@mui/material";
import { SchemaProperty } from "./SchemaProperty";
import { SchemaMetadata } from "./SchemaMetadata";
import { SchemaExample } from "./SchemaExample";
import { schemaStyles } from "./SchemaStyles";
import CodeIcon from '@mui/icons-material/Code';
import React from "react";
import type { OpenAPIV3 } from "openapi-types";

interface SchemaPrimitiveRendererProps {
    schema: OpenAPIV3.NonArraySchemaObject;
    name?: string;
    required?: boolean;
    type: string;
    onToggle: () => void;
    level: number;
}

export const SchemaPrimitiveRenderer: React.FC<SchemaPrimitiveRendererProps> = ({
    schema,
    name,
    required,
    type,
    onToggle,
    level
}) => (
    <Box sx={{ pl: level * 2 }}>
        {name && (
            <Box component="pre" sx={{ ...schemaStyles.container, mb: 1 }}>
                <Box component="span" sx={schemaStyles.name}>{name}</Box>
                {required && <Box component="span" sx={schemaStyles.required}>required</Box>}
            </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Tooltip title="Switch to raw view">
                <IconButton onClick={onToggle} size="small" sx={{ ml: 1 }}>
                    <CodeIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
        {schema.description && (
            <Box component="pre" sx={{ ...schemaStyles.container, mb: 1 }}>
                <SchemaProperty 
                    name="description" 
                    description={schema.description} 
                />
            </Box>
        )}
        <SchemaMetadata schema={schema} type={type} />
        {schema.example && (
            <SchemaExample example={schema.example} />
        )}
    </Box>
); 