import { Box } from "@mui/material";
import type { OpenAPIV3 } from "openapi-types";
import { SchemaProperty } from "./SchemaProperty";
import { schemaStyles } from "./SchemaStyles";

interface SchemaMetadataProps {
    schema: OpenAPIV3.SchemaObject;
    type: string;
}

export const SchemaMetadata: React.FC<SchemaMetadataProps> = ({ schema, type }) => {
    const constraints = [];

    if (schema.minimum !== undefined) constraints.push({ label: 'minimum', value: schema.minimum });
    if (schema.maximum !== undefined) constraints.push({ label: 'maximum', value: schema.maximum });
    if (schema.minLength !== undefined) constraints.push({ label: 'minLength', value: schema.minLength });
    if (schema.maxLength !== undefined) constraints.push({ label: 'maxLength', value: schema.maxLength });
    if (schema.pattern) constraints.push({ label: 'pattern', value: schema.pattern });
    if (schema.enum) constraints.push({ label: 'enum', value: schema.enum.join(', ') });
    if (schema.format) constraints.push({ label: 'format', value: schema.format });
    if (schema.nullable) constraints.push({ label: 'nullable', value: 'true' });

    return (
        <Box component="pre" sx={schemaStyles.container}>
            <SchemaProperty name="type" type={type} />
            {constraints.map((constraint, idx) => (
                <SchemaProperty
                    key={idx}
                    name={constraint.label}
                    description={constraint.value.toString()}
                    indent={0}
                />
            ))}
        </Box>
    );
}; 