import type { OpenAPIV3 } from 'openapi-types';

export interface ValidationError {
    message: string;
    path: string;
    severity: 'error' | 'warning';
    line?: number;
    column?: number;
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    spec?: OpenAPIV3.Document;
}

export interface OpenAPIValidatorProps {
    initialSpec?: string;
    onValidationChange?: (result: ValidationResult) => void;
}

export interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange?: (result: ValidationResult) => void;
    readOnly?: boolean;
} 