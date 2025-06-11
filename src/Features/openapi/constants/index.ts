import type { OpenAPIDocument } from "../types";

export const sampleSpec: OpenAPIDocument = {
    openapi: "3.0.0",
    info: {
        title: "Sample API",
        version: "1.0.0",
        description: "A sample API to demonstrate the OpenAPI renderer"
    },
    servers: [
        {
            url: "https://api.example.com/v1",
            description: "Production server"
        }
    ],
    tags: [
        {
            name: "Users",
            description: "User management endpoints"
        },
        {
            name: "Products",
            description: "Product management endpoints"
        }
    ],
    paths: {
        "/users": {
            get: {
                operationId: "getUsers",
                summary: "Get all users",
                description: "Retrieve a list of all users in the system",
                tags: ["Users"],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        description: "Page number for pagination",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "Number of items per page",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
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
                            }
                        }
                    }
                }
            }
        }
    }
};