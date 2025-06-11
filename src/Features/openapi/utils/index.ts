import type { GroupedEndpoints, OpenAPIDocument, ParsedEndpoint } from "../types";

export const parseOpenAPISpec = (spec: OpenAPIDocument): ParsedEndpoint[] => {
    const endpoints: ParsedEndpoint[] = [];

    Object.entries(spec.paths).forEach(([path, pathItem]) => {
        const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'] as const;

        methods.forEach(method => {
            const operation = pathItem[method];
            if (operation) {
                const tag = operation.tags?.[0] || 'default';
                endpoints.push({
                    path,
                    method: method.toUpperCase(),
                    operation,
                    tag
                });
            }
        });
    });

    return endpoints;
};

export const groupEndpointsByTag = (endpoints: ParsedEndpoint[]): GroupedEndpoints => {
    return endpoints.reduce((acc, endpoint) => {
        if (!acc[endpoint.tag]) {
            acc[endpoint.tag] = [];
        }
        acc[endpoint.tag].push(endpoint);
        return acc;
    }, {} as GroupedEndpoints);
};

export const getMethodColor = (method: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' => {
    const colors: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
        GET: 'primary',
        POST: 'success',
        PUT: 'warning',
        DELETE: 'error',
        PATCH: 'info',
        OPTIONS: 'secondary',
        HEAD: 'secondary',
        TRACE: 'secondary'
    };
    return colors[method] || 'primary';
};
