import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Typography,
    Box,
    Chip,
    Stack,
    Tooltip
} from "@mui/material";
import React from "react";
import type { ParsedEndpoint } from "../../types";
import { SchemaRenderer } from "../schema/SchemaRenderer";

interface ParametersTableProps {
    parameters: ParsedEndpoint['parameters'];
}

const ConstraintChip: React.FC<{ 
    label: string; 
    value: string | number;
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}> = ({ label, value, color = 'default' }) => (
    <Tooltip title={label}>
        <Chip 
            label={`${label}: ${value}`}
            size="small"
            color={color}
            variant="outlined"
            sx={{ mr: 0.5, mb: 0.5 }}
        />
    </Tooltip>
);

const ValueDisplay: React.FC<{ 
    value: any;
    type?: string;
}> = ({ value, type }) => {
    if (value === undefined || value === null) return null;

    const formatValue = (val: any) => {
        if (typeof val === 'object') {
            return JSON.stringify(val);
        }
        return String(val);
    };

    return (
        <Box sx={{ 
            backgroundColor: 'action.hover',
            borderRadius: 1,
            px: 1,
            py: 0.5,
            display: 'inline-block'
        }}>
            <Typography variant="caption" component="code">
                {formatValue(value)}
            </Typography>
        </Box>
    );
};

const ParameterTable: React.FC<{ 
    parameters: ParsedEndpoint['parameters'], 
    location: string,
    title: string 
}> = ({ parameters, location, title }) => {
    const filteredParams = parameters.filter(param => param.in === location);

    if (!filteredParams.length) {
        return null;
    }

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
                {title}
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Required</TableCell>
                            <TableCell>Constraints</TableCell>
                            <TableCell>Default</TableCell>
                            <TableCell>Example</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredParams.map((param, index) => {
                            const schema = param.schema;
                            const constraints = [];
                            
                            if (schema && 'type' in schema) {
                                if (schema.minimum !== undefined) constraints.push({ type: 'min', value: schema.minimum });
                                if (schema.maximum !== undefined) constraints.push({ type: 'max', value: schema.maximum });
                                if (schema.minLength !== undefined) constraints.push({ type: 'minLength', value: schema.minLength });
                                if (schema.maxLength !== undefined) constraints.push({ type: 'maxLength', value: schema.maxLength });
                                if (schema.pattern) constraints.push({ type: 'pattern', value: schema.pattern });
                                if (schema.enum) constraints.push({ type: 'enum', value: schema.enum.join(', ') });
                            }

                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">{param.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {schema && 'type' in schema && schema.type && (
                                            <Chip 
                                                label={schema.type}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {param.required ? (
                                            <Chip 
                                                label="Required" 
                                                size="small"
                                                color="error"
                                            />
                                        ) : (
                                            <Chip 
                                                label="Optional" 
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" flexWrap="wrap" spacing={0.5}>
                                            {constraints.map((constraint, idx) => (
                                                <ConstraintChip 
                                                    key={idx}
                                                    label={constraint.type}
                                                    value={constraint.value}
                                                />
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <ValueDisplay 
                                            value={schema && 'default' in schema ? schema.default : undefined}
                                            type={schema && 'type' in schema ? schema.type : undefined}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ValueDisplay 
                                            value={schema && 'example' in schema ? schema.example : undefined}
                                            type={schema && 'type' in schema ? schema.type : undefined}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {param.description || 'No description'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export const ParametersTable: React.FC<ParametersTableProps> = ({ parameters }) => {
    if (!parameters.length) {
        return null;
    }

    return (
        <Stack spacing={2}>
            <ParameterTable 
                parameters={parameters} 
                location="path" 
                title="Path Parameters" 
            />
            <ParameterTable 
                parameters={parameters} 
                location="query" 
                title="Query Parameters" 
            />
            <ParameterTable 
                parameters={parameters} 
                location="header" 
                title="Header Parameters" 
            />
        </Stack>
    );
}; 