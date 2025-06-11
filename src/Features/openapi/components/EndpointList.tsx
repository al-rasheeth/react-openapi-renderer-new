import React, { useMemo, useState } from "react";
import type { GroupedEndpoints, OpenAPIDocument, ParsedEndpoint } from "../types";
import { useTheme } from "@mui/material/styles";
import { getMethodColor, groupEndpointsByTag, parseOpenAPISpec } from "../utils";
import { alpha, Box, Card, CardContent, Chip, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, Search } from "@mui/icons-material";

interface EndpointListProps {
    spec: OpenAPIDocument;
    selectedEndpoint: ParsedEndpoint | null;
    onSelectEndpoint: (endpoint: ParsedEndpoint) => void;
}

export const EndpointList: React.FC<EndpointListProps> = ({ spec, selectedEndpoint, onSelectEndpoint }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
    const theme = useTheme();

    const endpoints = useMemo(() => parseOpenAPISpec(spec), [spec]);
    const groupedEndpoints = useMemo(() => groupEndpointsByTag(endpoints), [endpoints]);

    const filteredGroups = useMemo(() => {
        if (!searchTerm) return groupedEndpoints;

        const filtered: GroupedEndpoints = {};
        Object.entries(groupedEndpoints).forEach(([tag, endpoints]) => {
            const matchingEndpoints = endpoints.filter(endpoint =>
                endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                endpoint.operation.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                endpoint.method.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (matchingEndpoints.length > 0) {
                filtered[tag] = matchingEndpoints;
            }
        });
        return filtered;
    }, [groupedEndpoints, searchTerm]);

    const toggleTag = (tag: string) => {
        const newExpanded = new Set(expandedTags);
        if (newExpanded.has(tag)) {
            newExpanded.delete(tag);
        } else {
            newExpanded.add(tag);
        }
        setExpandedTags(newExpanded);
    };

    // Auto-expand all tags when searching
    React.useEffect(() => {
        if (searchTerm) {
            setExpandedTags(new Set(Object.keys(filteredGroups)));
        }
    }, [searchTerm, filteredGroups]);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ pb: 0 }}>
                <Typography variant="h6" gutterBottom>
                    {spec.info.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                    Version: {spec.info.version}
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search endpoints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mt: 2 }}
                    InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                />
            </CardContent>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List sx={{ py: 0 }}>
                    {Object.entries(filteredGroups).map(([tag, endpoints]) => (
                        <Box key={tag}>
                            <ListItem
                                sx={{
                                    backgroundColor: theme.palette.grey[100],
                                    '&:hover': { backgroundColor: theme.palette.grey[200] }
                                }}
                            >
                                <ListItemButton onClick={() => toggleTag(tag)} sx={{ py: 0.5 }}>
                                    <ListItemText primary={tag} />
                                    <IconButton size="small">
                                        {expandedTags.has(tag) ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={expandedTags.has(tag)} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    {endpoints.map((endpoint, index) => {
                                        const isSelected = selectedEndpoint?.path === endpoint.path &&
                                            selectedEndpoint?.method === endpoint.method;
                                        return (
                                            <ListItem
                                                key={`${endpoint.method}-${endpoint.path}-${index}`}
                                                disablePadding
                                                sx={{
                                                    backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                                    borderLeft: isSelected ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent'
                                                }}
                                            >
                                                <ListItemButton
                                                    onClick={() => onSelectEndpoint(endpoint)}
                                                    sx={{ pl: 4 }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                                                        <Chip
                                                            label={endpoint.method}
                                                            size="small"
                                                            color={getMethodColor(endpoint.method)}
                                                            sx={{ minWidth: 60, fontWeight: 'bold' }}
                                                        />
                                                        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                                            <Typography variant="body2" noWrap>
                                                                {endpoint.path}
                                                            </Typography>
                                                            {endpoint.operation.summary && (
                                                                <Typography variant="caption" color="text.secondary" noWrap>
                                                                    {endpoint.operation.summary}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            </Box>
        </Card>
    );
};