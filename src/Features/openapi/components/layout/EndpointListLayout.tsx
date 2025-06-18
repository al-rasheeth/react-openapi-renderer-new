import { Box, List, Typography } from "@mui/material";
import type { OpenAPIDocument, ParsedEndpoint } from "../../types";
import { useEndpointFilters } from "../../hooks/useEndpointFilters";
import { SearchAndFilters } from "../common/SearchAndFilters";
import { EndpointListItem } from "../common/EndpointListItem";

interface EndpointListLayoutProps {
    spec: OpenAPIDocument;
    selectedEndpoint: ParsedEndpoint | null;
    onSelectEndpoint: (endpoint: ParsedEndpoint) => void;
}

export const EndpointListLayout: React.FC<EndpointListLayoutProps> = ({
    spec,
    selectedEndpoint,
    onSelectEndpoint
}) => {
    const {
        searchQuery,
        setSearchQuery,
        selectedTags,
        selectedMethods,
        showFilters,
        allTags,
        allMethods,
        filteredEndpoints,
        handleTagClick,
        handleMethodClick,
        toggleFilters
    } = useEndpointFilters(spec);

    const isEndpointSelected = (endpoint: ParsedEndpoint): boolean => {
        if (!selectedEndpoint) return false;
        return selectedEndpoint.path === endpoint.path && selectedEndpoint.method === endpoint.method;
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                showFilters={showFilters}
                onToggleFilters={toggleFilters}
                allTags={allTags}
                selectedTags={selectedTags}
                onTagClick={handleTagClick}
                allMethods={allMethods}
                selectedMethods={selectedMethods}
                onMethodClick={handleMethodClick}
            />

            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {filteredEndpoints.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                            No endpoints found
                        </Typography>
                    </Box>
                ) : (
                    <List>
                        {filteredEndpoints.map((endpoint) => (
                            <EndpointListItem
                                key={`${endpoint.method}-${endpoint.path}`}
                                endpoint={endpoint}
                                isSelected={isEndpointSelected(endpoint)}
                                onClick={onSelectEndpoint}
                            />
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    );
}; 