declare module 'swagger-ui-react' {
    import { ComponentType } from 'react';
    import type { OpenAPIV3 } from 'openapi-types';

    interface SwaggerUIProps {
        spec: OpenAPIV3.Document;
        url?: string;
        docExpansion?: 'list' | 'full' | 'none';
        defaultModelsExpandDepth?: number;
        defaultModelExpandDepth?: number;
        defaultModelRendering?: 'example' | 'model';
        displayOperationId?: boolean;
        displayRequestDuration?: boolean;
        filter?: boolean | string;
        layout?: 'BaseLayout' | 'StandaloneLayout';
        onComplete?: (system: any) => void;
        plugins?: any[];
        presets?: any[];
        showExtensions?: boolean;
        showCommonExtensions?: boolean;
        supportedSubmitMethods?: string[];
        validatorUrl?: string | null;
        withCredentials?: boolean;
        tryItOutEnabled?: boolean;
        requestInterceptor?: (req: any) => any;
        responseInterceptor?: (res: any) => any;
    }

    const SwaggerUI: ComponentType<SwaggerUIProps>;
    export default SwaggerUI;
} 