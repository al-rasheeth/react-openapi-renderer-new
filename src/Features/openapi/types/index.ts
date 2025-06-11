import type { OpenAPIV3 } from 'openapi-types';

// Re-export types from openapi-types
export type OpenAPIDocument = OpenAPIV3.Document;
export type Paths = OpenAPIV3.PathsObject;
export type PathItem = OpenAPIV3.PathItemObject;
export type Operation = OpenAPIV3.OperationObject;
export type Parameter = OpenAPIV3.ParameterObject;
export type RequestBody = OpenAPIV3.RequestBodyObject;
export type Response = OpenAPIV3.ResponseObject;
export type Schema = OpenAPIV3.SchemaObject;

// Helper types
export interface ParsedEndpoint {
    path: string;
    method: string;
    operation: Operation;
    tag: string;
}

export interface GroupedEndpoints {
    [tag: string]: ParsedEndpoint[];
}
