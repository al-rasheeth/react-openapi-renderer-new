import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { OpenAPIEditor } from './OpenAPIEditor';
import type { OpenAPIValidatorProps, ValidationResult } from '../types';
import { sampleSpec } from '../../openapi/constants';

export const OpenAPIValidator: React.FC<OpenAPIValidatorProps> = ({
    initialSpec = JSON.stringify(sampleSpec, null, 2),
    onValidationChange
}) => {
    const [spec, setSpec] = useState(initialSpec);
    const [validationResult, setValidationResult] = useState<ValidationResult>({
        isValid: true,
        errors: []
    });

    const handleValidationChange = (result: ValidationResult) => {
        setValidationResult(result);
        onValidationChange?.(result);
    };

    const handleReset = () => {
        setSpec(JSON.stringify(sampleSpec, null, 2));
    };

    return (
        <Box sx={{ height: '100vh', p: 2 }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ height: '100%', p: 2 }}>
                        <OpenAPIEditor
                            value={spec}
                            onChange={setSpec}
                            onValidationChange={handleValidationChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ height: '100%', p: 2 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Validation Results
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={handleReset}
                                sx={{ mb: 2 }}
                            >
                                Reset to Sample
                            </Button>
                        </Box>
                        {validationResult.isValid ? (
                            <Typography color="success.main">
                                ✓ Specification is valid
                            </Typography>
                        ) : (
                            <Box>
                                <Typography color="error" gutterBottom>
                                    ✗ Specification has errors:
                                </Typography>
                                {validationResult.errors.map((error, index) => (
                                    <Paper
                                        key={index}
                                        variant="outlined"
                                        sx={{ p: 1, mb: 1, bgcolor: 'error.light' }}
                                    >
                                        <Typography variant="body2" color="error.contrastText">
                                            {error.message}
                                        </Typography>
                                        {error.line && error.column && (
                                            <Typography variant="caption" color="error.contrastText">
                                                Line {error.line}, Column {error.column}
                                            </Typography>
                                        )}
                                    </Paper>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}; 