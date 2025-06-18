import { Box, TextField, InputAdornment, Stack, Chip, Typography, IconButton, Tooltip, Collapse } from "@mui/material";
import { Search as SearchIcon, FilterList as FilterListIcon } from "@mui/icons-material";

interface SearchAndFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    showFilters: boolean;
    onToggleFilters: () => void;
    allTags: string[];
    selectedTags: string[];
    onTagClick: (tag: string) => void;
    allMethods: string[];
    selectedMethods: string[];
    onMethodClick: (method: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
    searchQuery,
    onSearchChange,
    showFilters,
    onToggleFilters,
    allTags,
    selectedTags,
    onTagClick,
    allMethods,
    selectedMethods,
    onMethodClick
}) => {
    return (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <TextField
                fullWidth
                size="small"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Toggle filters">
                                <IconButton
                                    size="small"
                                    onClick={onToggleFilters}
                                    color={showFilters ? "primary" : "default"}
                                >
                                    <FilterListIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    )
                }}
            />
            <Collapse in={showFilters}>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Filter by Method
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                        {allMethods.map(method => (
                            <Chip
                                key={method}
                                label={method}
                                size="small"
                                color={selectedMethods.includes(method) ? "primary" : "default"}
                                variant={selectedMethods.includes(method) ? "filled" : "outlined"}
                                onClick={() => onMethodClick(method)}
                            />
                        ))}
                    </Stack>
                    <Typography variant="subtitle2" gutterBottom>
                        Filter by Tag
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {allTags.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                color={selectedTags.includes(tag) ? "primary" : "default"}
                                variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                                onClick={() => onTagClick(tag)}
                            />
                        ))}
                    </Stack>
                </Box>
            </Collapse>
        </Box>
    );
}; 