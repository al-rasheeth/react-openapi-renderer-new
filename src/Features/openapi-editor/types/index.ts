import type { OpenAPIV3 } from 'openapi-types';
import type { ValidationResult } from '../../openapi-validator/types';

export type OpenAPIDocument = OpenAPIV3.Document;

export interface OpenAPIEditorProps {
    initialSpec?: string;
    onValidationChange?: (result: ValidationResult) => void;
}

export interface EditorState {
    spec: string;
    validationResult: ValidationResult;
    parsedSpec: OpenAPIDocument | null;
} 