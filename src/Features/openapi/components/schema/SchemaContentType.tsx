import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { schemaStyles } from "./SchemaStyles";

export type ContentType = 'application/json' | 'application/xml' | 'application/x-www-form-urlencoded' | 'multipart/form-data';

interface SchemaContentTypeProps {
    contentTypes: ContentType[];
    selectedType: ContentType;
    onTypeChange: (type: ContentType) => void;
}

export const SchemaContentType: React.FC<SchemaContentTypeProps> = ({
    contentTypes,
    selectedType,
    onTypeChange
}) => {
    if (contentTypes.length <= 1) {
        return null;
    }

    return (
        <Box component="pre" sx={{ ...schemaStyles.container, mb: 1 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Content Type</InputLabel>
                <Select
                    value={selectedType}
                    label="Content Type"
                    onChange={(e) => onTypeChange(e.target.value as ContentType)}
                    sx={{
                        '& .MuiSelect-select': {
                            py: 0.5,
                            fontSize: '0.875rem',
                            fontFamily: 'monospace'
                        }
                    }}
                >
                    {contentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}; 