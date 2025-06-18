import { Box } from "@mui/material";
import { SchemaProperty } from "./SchemaProperty";
import { schemaStyles } from "./SchemaStyles";

interface SchemaExampleProps {
    example: any;
}

export const SchemaExample: React.FC<SchemaExampleProps> = ({ example }) => {
    if (!example) return null;

    return (
        <Box component="pre" sx={{ ...schemaStyles.container, mt: 1 }}>
            <SchemaProperty name="example" example={example} />
        </Box>
    );
}; 