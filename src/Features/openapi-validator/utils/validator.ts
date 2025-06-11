import OpenAPISchemaValidator from 'openapi-schema-validator';
import type { ValidationResult } from '../types';

export async function validateOpenAPISpec(spec: string): Promise<ValidationResult> {
    try {
        const schema = JSON.parse(spec);
        const validator = new OpenAPISchemaValidator({ version: 3 });
        const result = validator.validate(schema);

        if (result.errors.length === 0) {
            return {
                errors: [],
                isValid: true
            };
        }

        return {
            errors: result.errors.map(error => ({
                message: error.message || 'Validation error',
                path: error.schemaPath || error.instancePath?.slice(1) || '',
                severity: 'error'
            })),
            isValid: false
        };
    } catch (error: unknown) {
        return {
            errors: [{
                message: error instanceof Error ? error.message : 'Invalid OpenAPI specification',
                path: '',
                severity: 'error'
            }],
            isValid: false
        };
    }
}

export const formatOpenAPISpec = (spec: string): string => {
    try {
        const parsed = JSON.parse(spec);
        return JSON.stringify(parsed, null, 2);
    } catch {
        return spec;
    }
}; 