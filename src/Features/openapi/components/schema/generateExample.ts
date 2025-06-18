import type { OpenAPIV3 } from "openapi-types";

function getExampleValue(schema: OpenAPIV3.SchemaObject): any {
    if (schema.example !== undefined) return schema.example;
    if (schema.default !== undefined) return schema.default;
    if (schema.enum && schema.enum.length > 0) return schema.enum[0];
    switch (schema.type) {
        case 'string':
            if (schema.format === 'date-time') return '2023-01-01T00:00:00Z';
            if (schema.format === 'date') return '2023-01-01';
            if (schema.format === 'email') return 'user@example.com';
            if (schema.format === 'binary') return '<BINARY_DATA>';
            return 'string';
        case 'integer':
        case 'number':
            return 0;
        case 'boolean':
            return true;
        case 'array':
            if (schema.items && typeof schema.items === 'object') {
                return [getExampleValue(schema.items as OpenAPIV3.SchemaObject)];
            }
            return [];
        case 'object':
            const obj: Record<string, any> = {};
            if (schema.properties) {
                for (const [key, propSchema] of Object.entries(schema.properties)) {
                    obj[key] = getExampleValue(propSchema as OpenAPIV3.SchemaObject);
                }
            }
            return obj;
        default:
            return null;
    }
}

function prettyPrintXml(xml: string): string {
    // Simple pretty print for XML
    const PADDING = '  ';
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    xml = xml.replace(reg, '$1\r\n$2$3');
    xml.split('\r\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/.+>$/)) {
            indent = 0;
        } else if (node.match(/^<\//)) {
            if (pad !== 0) pad -= 1;
        } else if (node.match(/^<[^!?]+[^\/]>/)) {
            indent = 1;
        } else {
            indent = 0;
        }
        formatted += PADDING.repeat(pad) + node + '\n';
        pad += indent;
    });
    return formatted.trim();
}

export function generateExample(schema: OpenAPIV3.SchemaObject, contentType: string): string {
    if (contentType === 'application/xml') {
        // Simple XML generator for demonstration
        const toXml = (obj: any, tag = 'root'): string => {
            if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
                return `<${tag}>${Object.entries(obj).map(([k, v]) => toXml(v, k)).join('')}</${tag}>`;
            } else if (Array.isArray(obj)) {
                return obj.map((v) => toXml(v, tag)).join('');
            } else {
                return `<${tag}>${String(obj)}</${tag}>`;
            }
        };
        const exampleObj = getExampleValue(schema);
        return prettyPrintXml(toXml(exampleObj, 'root'));
    }
    if (contentType === 'application/x-www-form-urlencoded') {
        // Generate a URL-encoded string
        const obj = getExampleValue(schema);
        if (typeof obj === 'object' && obj !== null) {
            return Object.entries(obj)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
                .join('&');
        }
        return '';
    }
    if (contentType === 'multipart/form-data') {
        // Generate a multipart example
        const obj = getExampleValue(schema);
        const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
        let parts = '';
        if (typeof obj === 'object' && obj !== null) {
            for (const [k, v] of Object.entries(obj)) {
                parts += `--${boundary}\nContent-Disposition: form-data; name="${k}"\n\n${v}\n`;
            }
        }
        parts += `--${boundary}--`;
        return parts;
    }
    // Default: JSON
    return JSON.stringify(getExampleValue(schema), null, 2);
} 