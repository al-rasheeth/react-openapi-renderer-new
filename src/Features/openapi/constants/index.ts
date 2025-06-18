import type { OpenAPIDocument } from "../types";

export const sampleSpec: OpenAPIDocument = {
    openapi: "3.0.0",
    info: {
        title: "Sample API",
        version: "1.0.0",
        description: "A sample API to demonstrate the OpenAPI renderer with all edge cases"
    },
    servers: [
        {
            url: "https://api.example.com/v1",
            description: "Production server"
        }
    ],
    tags: [
        { name: "Users", description: "User management endpoints" },
        { name: "Products", description: "Product management endpoints" },
        { name: "EdgeCases", description: "Edge case endpoints" }
    ],
    paths: {
        "/edge/enums": {
            post: {
                operationId: "postEnum",
                summary: "Enum and default value example",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "string",
                                        enum: ["active", "inactive", "pending"],
                                        default: "active",
                                        description: "User status"
                                    },
                                    role: {
                                        type: "string",
                                        enum: ["admin", "user", "guest"],
                                        example: "user"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Enum response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    enum: ["ok", "fail"]
                                }
                            }
                        }
                    }
                }
            }
        },
        "/edge/oneof": {
            post: {
                operationId: "postOneOf",
                summary: "oneOf example",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                oneOf: [
                                    { type: "string", description: "A string value" },
                                    { type: "integer", description: "An integer value" }
                                ],
                                description: "Accepts either a string or an integer"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "oneOf response",
                        content: {
                            "application/json": {
                                schema: {
                                    oneOf: [
                                        { type: "string" },
                                        { type: "integer" }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        "/edge/anyof": {
            post: {
                operationId: "postAnyOf",
                summary: "anyOf example",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                anyOf: [
                                    { type: "string" },
                                    { type: "integer" },
                                    { type: "boolean" }
                                ],
                                description: "Accepts string, integer, or boolean"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "anyOf response",
                        content: {
                            "application/json": {
                                schema: {
                                    anyOf: [
                                        { type: "string" },
                                        { type: "integer" },
                                        { type: "boolean" }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        "/edge/allof": {
            post: {
                operationId: "postAllOf",
                summary: "allOf example",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    {
                                        type: "object",
                                        properties: {
                                            a: { type: "string" }
                                        }
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            b: { type: "integer" }
                                        }
                                    }
                                ],
                                description: "Combines properties from multiple schemas"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "allOf response",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        {
                                            type: "object",
                                            properties: {
                                                a: { type: "string" }
                                            }
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                b: { type: "integer" }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        "/edge/nullable": {
            post: {
                operationId: "postNullable",
                summary: "nullable and pattern example",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    nickname: {
                                        type: "string",
                                        nullable: true,
                                        pattern: "^[a-zA-Z0-9_]{3,16}$",
                                        description: "Optional nickname, 3-16 chars, alphanumeric or underscore"
                                    },
                                    age: {
                                        type: "integer",
                                        minimum: 0,
                                        maximum: 120,
                                        description: "Age must be between 0 and 120"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "nullable response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        result: { type: "string", nullable: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/edge/nested": {
            post: {
                operationId: "postNested",
                summary: "Deeply nested objects and arrays",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            profile: {
                                                type: "object",
                                                properties: {
                                                    addresses: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                street: { type: "string" },
                                                                city: { type: "string" },
                                                                phones: {
                                                                    type: "array",
                                                                    items: { type: "string" }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Nested response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        value: { type: "string" }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/edge/additional": {
            post: {
                operationId: "postAdditional",
                summary: "additionalProperties and mixed types",
                tags: ["EdgeCases"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                additionalProperties: {
                                    oneOf: [
                                        { type: "string" },
                                        { type: "integer" },
                                        { type: "boolean" }
                                    ]
                                },
                                description: "Object with arbitrary string/integer/boolean values"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "additionalProperties response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    additionalProperties: {
                                        oneOf: [
                                            { type: "string" },
                                            { type: "integer" },
                                            { type: "boolean" }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users": {
            get: {
                operationId: "getUsers",
                summary: "Get all users",
                description: "Retrieve a list of all users in the system",
                tags: ["Users"],
                responses: {
                    "200": {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            email: { type: "string", format: "email" }
                                        }
                                    }
                                }
                            },
                            "application/xml": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            email: { type: "string", format: "email" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                operationId: "createUser",
                summary: "Create a new user",
                tags: ["Users"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "email"],
                                properties: {
                                    name: { type: "string", description: "User's full name" },
                                    email: { type: "string", format: "email", description: "User's email address" },
                                    age: { type: "integer", description: "User's age" }
                                }
                            }
                        },
                        "application/xml": {
                            schema: {
                                type: "object",
                                required: ["name", "email"],
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string", format: "email" },
                                    age: { type: "integer" }
                                }
                            }
                        },
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                required: ["name", "profileImage"],
                                properties: {
                                    name: { type: "string" },
                                    profileImage: { type: "string", format: "binary", description: "Profile image file" }
                                }
                            }
                        },
                        "application/x-www-form-urlencoded": {
                            schema: {
                                type: "object",
                                required: ["name", "email"],
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string", format: "email" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "User created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        email: { type: "string" }
                                    }
                                }
                            },
                            "application/xml": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        email: { type: "string" }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Invalid request data"
                    }
                }
            }
        },
        "/users/{userId}": {
            get: {
                operationId: "getUserById",
                summary: "Get user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        description: "ID of the user to retrieve",
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "User found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        email: { type: "string" }
                                    }
                                }
                            },
                            "application/xml": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        email: { type: "string" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        description: "User not found"
                    }
                }
            },
            put: {
                operationId: "updateUser",
                summary: "Update user",
                tags: ["Users"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string" }
                                }
                            }
                        },
                        "application/xml": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "User updated successfully"
                    },
                    "404": {
                        description: "User not found"
                    }
                }
            },
            delete: {
                operationId: "deleteUser",
                summary: "Delete user",
                tags: ["Users"],
                deprecated: true,
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: "User deleted successfully"
                    },
                    "404": {
                        description: "User not found"
                    }
                }
            }
        },
        "/products": {
            get: {
                operationId: "getProducts",
                summary: "List all products",
                tags: ["Products"],
                responses: {
                    "200": {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            price: { type: "number", format: "float" },
                                            category: { type: "string" }
                                        }
                                    }
                                }
                            },
                            "application/xml": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            price: { type: "number", format: "float" },
                                            category: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                operationId: "createProduct",
                summary: "Create a new product",
                tags: ["Products"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "price"],
                                properties: {
                                    name: { type: "string" },
                                    price: { type: "number", format: "float" },
                                    category: { type: "string" }
                                }
                            }
                        },
                        "application/x-www-form-urlencoded": {
                            schema: {
                                type: "object",
                                required: ["name", "price"],
                                properties: {
                                    name: { type: "string" },
                                    price: { type: "number", format: "float" },
                                    category: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Product created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        price: { type: "number", format: "float" },
                                        category: { type: "string" }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Invalid request data"
                    }
                }
            }
        },
        "/files": {
            post: {
                operationId: "uploadFile",
                summary: "Upload a file",
                tags: ["Products"],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                required: ["file"],
                                properties: {
                                    file: { type: "string", format: "binary", description: "The file to upload" },
                                    description: { type: "string", description: "File description" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "File uploaded successfully"
                    }
                }
            }
        }
    }
};