import { useState, useMemo } from 'react';
import type { OpenAPIDocument, ParsedEndpoint } from '../types';

export const useEndpointFilters = (spec: OpenAPIDocument) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        Object.values(spec.paths).forEach(pathItem => {
            if (!pathItem) return;
            Object.values(pathItem).forEach(operation => {
                if (operation && typeof operation === 'object' && 'tags' in operation && Array.isArray(operation.tags)) {
                    operation.tags.forEach(tag => tags.add(tag));
                }
            });
        });
        return Array.from(tags).sort();
    }, [spec]);

    const allMethods = useMemo(() => {
        const methods = new Set<string>();
        Object.values(spec.paths).forEach(pathItem => {
            if (!pathItem) return;
            Object.keys(pathItem).forEach(method => {
                if (method !== 'parameters') {
                    methods.add(method.toUpperCase());
                }
            });
        });
        return Array.from(methods).sort();
    }, [spec]);

    const filteredEndpoints = useMemo(() => {
        return Object.entries(spec.paths).flatMap(([path, pathItem]) => {
            if (!pathItem) return [];
            return Object.entries(pathItem)
                .filter(([method]) => method !== 'parameters')
                .map(([method, operation]) => {
                    if (!operation || typeof operation !== 'object' || !('tags' in operation)) return null;
                    const operationObj = operation;
                    const pathParameters = pathItem.parameters || [];
                    const operationParameters = operationObj.parameters || [];
                    const allParameters = [...pathParameters, ...operationParameters];
                    const endpoint: ParsedEndpoint = {
                        path,
                        method: method.toUpperCase(),
                        operation: operationObj,
                        parameters: allParameters
                    };
                    return endpoint;
                })
                .filter((endpoint): endpoint is ParsedEndpoint => {
                    if (!endpoint) return false;
                    const matchesSearch = searchQuery === "" || 
                        endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        endpoint.operation.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        endpoint.operation.description?.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesTags = selectedTags.length === 0 || 
                        endpoint.operation.tags?.some(tag => selectedTags.includes(tag));
                    const matchesMethods = selectedMethods.length === 0 || 
                        selectedMethods.includes(endpoint.method);
                    return matchesSearch && matchesTags && matchesMethods;
                });
        });
    }, [spec, searchQuery, selectedTags, selectedMethods]);

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleMethodClick = (method: string) => {
        setSelectedMethods(prev =>
            prev.includes(method)
                ? prev.filter(m => m !== method)
                : [...prev, method]
        );
    };

    const toggleFilters = () => {
        setShowFilters(prev => !prev);
    };

    return {
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
    };
}; 