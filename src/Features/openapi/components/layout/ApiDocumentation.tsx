import { useState } from 'react';
import type { OpenAPIV3 } from 'openapi-types';
import { useApiInfo } from '../../hooks/useApiInfo';
import { SplitPaneLayout } from './SplitPaneLayout';
import { ApiInfoDisplay } from './ApiInfoDisplay';
import { EndpointListLayout } from './EndpointListLayout';
import { EndpointDetailsLayout } from './EndpointDetailsLayout';
import type { ParsedEndpoint } from '../../types';

interface ApiDocumentationProps {
    document: OpenAPIV3.Document;
}

export const ApiDocumentation: React.FC<ApiDocumentationProps> = ({ document }) => {
    const [selectedEndpoint, setSelectedEndpoint] = useState<ParsedEndpoint | null>(null);
    const apiInfo = useApiInfo(document);

    const handleSelectEndpoint = (endpoint: ParsedEndpoint) => {
        setSelectedEndpoint(endpoint);
    };

    return (
        <SplitPaneLayout
            leftPanel={
                <EndpointListLayout
                    spec={document}
                    selectedEndpoint={selectedEndpoint}
                    onSelectEndpoint={handleSelectEndpoint}
                />
            }
            rightPanel={
                selectedEndpoint ? (
                    <EndpointDetailsLayout endpoint={selectedEndpoint} />
                ) : (
                    <ApiInfoDisplay apiInfo={apiInfo} />
                )
            }
        />
    );
}; 