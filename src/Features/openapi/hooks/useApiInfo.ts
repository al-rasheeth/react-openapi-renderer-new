import { useMemo } from 'react';
import type { OpenAPIDocument, Info, Server } from '../types';

export const useApiInfo = (spec: OpenAPIDocument) => {
    const apiInfo = useMemo(() => {
        const info: Info = spec.info;
        const servers: Server[] = spec.servers || [];
        const tags = spec.tags || [];

        return {
            title: info.title,
            version: info.version,
            description: info.description,
            contact: info.contact,
            license: info.license,
            servers,
            tags
        };
    }, [spec]);

    return apiInfo;
}; 