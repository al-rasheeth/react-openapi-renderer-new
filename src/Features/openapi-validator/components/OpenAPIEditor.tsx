import React, { useCallback, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Paper, Typography } from '@mui/material';
import type { EditorProps, ValidationResult } from '../types';
import { validateOpenAPISpec, formatOpenAPISpec } from '../utils/validator';

export const OpenAPIEditor: React.FC<EditorProps> = ({
    value,
    onChange,
    onValidationChange,
    readOnly = false
}) => {
    const [validationResult, setValidationResult] = useState<ValidationResult>({
        isValid: true,
        errors: []
    });

    const handleEditorChange = useCallback(async (newValue: string | undefined) => {
        if (!newValue) return;

        // Format the spec
        const formattedValue = formatOpenAPISpec(newValue);
        onChange(formattedValue);

        // Validate the spec
        const result = await validateOpenAPISpec(formattedValue);
        setValidationResult(result);
        onValidationChange?.(result);
    }, [onChange, onValidationChange]);

    // Initial validation
    useEffect(() => {
        if (value) {
            validateOpenAPISpec(value).then(result => {
                setValidationResult(result);
                onValidationChange?.(result);
            });
        }
    }, [value, onValidationChange]);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    OpenAPI Specification Editor
                </Typography>
                {!validationResult.isValid && (
                    <Typography color="error" variant="body2">
                        {validationResult.errors.map(error => error.message).join('\n')}
                    </Typography>
                )}
            </Paper>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={value}
                    onChange={handleEditorChange}
                    options={{
                        readOnly,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        formatOnPaste: true,
                        formatOnType: true,
                        tabSize: 2
                    }}
                    theme="vs-dark"
                />
            </Box>
        </Box>
    );
}; 