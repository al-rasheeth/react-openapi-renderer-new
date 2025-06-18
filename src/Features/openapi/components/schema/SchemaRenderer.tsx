import { Box } from "@mui/material";
import { useState } from "react";
import type { OpenAPIV3 } from "openapi-types";
import { useSchemaRenderer } from "../../hooks/useSchemaRenderer";
import { ObjectSchemaRenderer } from "./ObjectSchemaRenderer";
import { ArraySchemaRenderer } from "./ArraySchemaRenderer";
import { RawSchemaView } from "./RawSchemaView";
import type { ContentType } from "./SchemaContentType";
import { ComposedSchemaRenderer } from "./ComposedSchemaRenderer";
import { mergeAllOfSchemas } from "./mergeAllOfSchemas";
import { SchemaRawToggle } from "./SchemaRawToggle";
import { SchemaRefRenderer } from "./SchemaRefRenderer";
import { SchemaPrimitiveRenderer } from "./SchemaPrimitiveRenderer";

interface SchemaRendererProps {
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
    name?: string;
    required?: boolean;
    level?: number;
    selectedContentType?: ContentType;
}

export const SchemaRenderer: React.FC<SchemaRendererProps> = ({
    schema,
    name,
    required,
    level = 0,
    selectedContentType
}) => {
    const [isRawView, setIsRawView] = useState(false);
    const {
        isReferenceObject,
        isArraySchemaObject,
        isObjectSchemaObject,
        isPrimitiveSchemaObject,
        getPropertyType
    } = useSchemaRenderer();

    // Handle anyOf, oneOf, allOf at the root level
    if (!isReferenceObject(schema) && 'anyOf' in schema && Array.isArray(schema.anyOf)) {
        return <ComposedSchemaRenderer keyword="anyOf" schemas={schema.anyOf as OpenAPIV3.SchemaObject[]} level={level} selectedContentType={selectedContentType} />;
    }
    if (!isReferenceObject(schema) && 'oneOf' in schema && Array.isArray(schema.oneOf)) {
        return <ComposedSchemaRenderer keyword="oneOf" schemas={schema.oneOf as OpenAPIV3.SchemaObject[]} level={level} selectedContentType={selectedContentType} />;
    }
    if (!isReferenceObject(schema) && 'allOf' in schema && Array.isArray(schema.allOf)) {
        // Merge allOf schemas and render as a single object
        const merged = mergeAllOfSchemas(schema.allOf as OpenAPIV3.SchemaObject[]);
        return <SchemaRenderer schema={merged} name={name} required={required} level={level} selectedContentType={selectedContentType} />;
    }

    if (isRawView) {
        return (
            <Box sx={{ pl: level * 2 }}>
                {name && (
                    <Box sx={{ mb: 1, fontWeight: 600 }}>{name}</Box>
                )}
                <SchemaRawToggle isRawView={isRawView} onToggle={() => setIsRawView((v) => !v)} />
                <RawSchemaView
                    schema={schema as OpenAPIV3.SchemaObject}
                    selectedContentType={selectedContentType!}
                />
            </Box>
        );
    }

    if (isReferenceObject(schema)) {
        return (
            <SchemaRefRenderer
                refValue={schema.$ref}
                isRawView={isRawView}
                onToggle={() => setIsRawView((v) => !v)}
                level={level}
            />
        );
    }

    if (isArraySchemaObject(schema)) {
        return (
            <ArraySchemaRenderer
                schema={schema}
                name={name}
                required={required}
                level={level}
                selectedContentType={selectedContentType!}
                onToggleView={() => setIsRawView((v) => !v)}
                isRawView={isRawView}
            />
        );
    }

    if (isObjectSchemaObject(schema)) {
        return (
            <ObjectSchemaRenderer
                schema={schema}
                name={name}
                required={required}
                level={level}
                selectedContentType={selectedContentType!}
                onToggleView={() => setIsRawView((v) => !v)}
                isRawView={isRawView}
            />
        );
    }

    if (isPrimitiveSchemaObject(schema)) {
        const type = getPropertyType(schema);
        return (
            <SchemaPrimitiveRenderer
                schema={schema as OpenAPIV3.NonArraySchemaObject}
                name={name}
                required={required}
                type={type}
                onToggle={() => setIsRawView((v) => !v)}
                level={level}
            />
        );
    }

    return null;
}; 