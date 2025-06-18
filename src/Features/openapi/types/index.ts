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
export type Reference = OpenAPIV3.ReferenceObject;
export type SecurityRequirement = OpenAPIV3.SecurityRequirementObject;
export type Server = OpenAPIV3.ServerObject;
export type Tag = OpenAPIV3.TagObject;
export type Info = OpenAPIV3.InfoObject;
export type Contact = OpenAPIV3.ContactObject;
export type License = OpenAPIV3.LicenseObject;
export type ExternalDocumentation = OpenAPIV3.ExternalDocumentationObject;
export type Components = OpenAPIV3.ComponentsObject;
export type SecurityScheme = OpenAPIV3.SecuritySchemeObject;
export type OAuthFlows = OpenAPIV3.OAuthFlowsObject;
export type OAuthFlow = OpenAPIV3.OAuthFlowObject;
export type Discriminator = OpenAPIV3.DiscriminatorObject;
export type XML = OpenAPIV3.XMLObject;
export type Example = OpenAPIV3.ExampleObject;
export type Encoding = OpenAPIV3.EncodingObject;
export type Header = OpenAPIV3.HeaderObject;
export type Link = OpenAPIV3.LinkObject;
export type Callback = OpenAPIV3.CallbackObject;
export type MediaType = OpenAPIV3.MediaTypeObject;
export type SchemaObject = OpenAPIV3.SchemaObject;
export type ReferenceObject = OpenAPIV3.ReferenceObject;
export type ParameterObject = OpenAPIV3.ParameterObject;
export type ResponseObject = OpenAPIV3.ResponseObject;
export type RequestBodyObject = OpenAPIV3.RequestBodyObject;
export type SecurityRequirementObject = OpenAPIV3.SecurityRequirementObject;
export type ServerObject = OpenAPIV3.ServerObject;
export type TagObject = OpenAPIV3.TagObject;
export type InfoObject = OpenAPIV3.InfoObject;
export type ContactObject = OpenAPIV3.ContactObject;
export type LicenseObject = OpenAPIV3.LicenseObject;
export type ExternalDocumentationObject = OpenAPIV3.ExternalDocumentationObject;
export type ComponentsObject = OpenAPIV3.ComponentsObject;
export type PathsObject = OpenAPIV3.PathsObject;
export type PathItemObject = OpenAPIV3.PathItemObject;
export type SecuritySchemeObject = OpenAPIV3.SecuritySchemeObject;
export type OAuthFlowsObject = OpenAPIV3.OAuthFlowsObject;
export type OAuthFlowObject = OpenAPIV3.OAuthFlowObject;
export type DiscriminatorObject = OpenAPIV3.DiscriminatorObject;
export type XMLObject = OpenAPIV3.XMLObject;
export type ExampleObject = OpenAPIV3.ExampleObject;
export type EncodingObject = OpenAPIV3.EncodingObject;
export type HeaderObject = OpenAPIV3.HeaderObject;
export type LinkObject = OpenAPIV3.LinkObject;
export type CallbackObject = OpenAPIV3.CallbackObject;
export type MediaTypeObject = OpenAPIV3.MediaTypeObject;

// Helper types
export interface ParsedEndpoint {
    path: string;
    method: string;
    operation: Operation;
    parameters: Parameter[];
}

export interface GroupedEndpoints {
    [tag: string]: ParsedEndpoint[];
}
