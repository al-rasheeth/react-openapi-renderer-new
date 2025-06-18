import type { OpenAPIV3 } from "openapi-types";

export function mergeAllOfSchemas(schemas: OpenAPIV3.SchemaObject[]): OpenAPIV3.SchemaObject {
    const merged: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: {},
        required: [],
    };
    for (const schema of schemas) {
        if (schema.properties) {
            merged.properties = {
                ...merged.properties,
                ...schema.properties,
            };
        }
        if (Array.isArray(schema.required)) {
            merged.required = Array.from(new Set([...(merged.required as string[]), ...schema.required]));
        }
        // Merge other top-level fields as needed (e.g., description, example, etc.)
        if (schema.description && !merged.description) {
            merged.description = schema.description;
        }
        if (schema.example && !merged.example) {
            merged.example = schema.example;
        }
        // Merge enum, format, etc. as needed
    }
    return merged;
} 