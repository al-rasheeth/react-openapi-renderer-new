import type { OpenAPIV3 } from "openapi-types";

export const useSchemaRenderer = () => {
    const isReferenceObject = (schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): schema is OpenAPIV3.ReferenceObject => {
        return '$ref' in schema;
    };

    const isSchemaObject = (schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): schema is OpenAPIV3.SchemaObject => {
        return !('$ref' in schema);
    };

    const isArraySchemaObject = (schema: OpenAPIV3.SchemaObject): schema is OpenAPIV3.ArraySchemaObject => {
        return schema.type === 'array';
    };

    const isObjectSchemaObject = (schema: OpenAPIV3.SchemaObject): schema is OpenAPIV3.NonArraySchemaObject => {
        return schema.type === 'object';
    };

    const isPrimitiveSchemaObject = (schema: OpenAPIV3.SchemaObject): schema is OpenAPIV3.NonArraySchemaObject & { type?: string; description?: string; example?: unknown } => {
        return !isArraySchemaObject(schema) && !isObjectSchemaObject(schema);
    };

    const getTypeLabel = (schema: OpenAPIV3.SchemaObject): string => {
        if (isArraySchemaObject(schema)) {
            const items = schema.items;
            if (isReferenceObject(items)) {
                return 'array of reference';
            }
            return `array of ${items.type || 'any'}`;
        }
        return schema.type || 'any';
    };

    const getPropertyType = (schema: OpenAPIV3.SchemaObject): string => {
        if (schema.enum) {
            return `enum (${schema.enum.join(', ')})`;
        }
        if (schema.format) {
            return `${schema.type} (${schema.format})`;
        }
        return getTypeLabel(schema);
    };

    return {
        isReferenceObject,
        isSchemaObject,
        isArraySchemaObject,
        isObjectSchemaObject,
        isPrimitiveSchemaObject,
        getTypeLabel,
        getPropertyType
    };
}; 