import fastifyPlugin from "fastify-plugin";
import swaggerPlugin from "@fastify/swagger";
import swaggerUiPlugin from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
export const swaggerLoadPlugin = fastifyPlugin(async (fastify, opts) => {
  await fastify.register(swaggerPlugin, {
    openapi: {
      info: {
        title: "Fastify API with Bearer Token",
        version: "1.0.0",
        description:
          "API documentation for a Fastify app with Bearer Token authentication",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Optional, specifies the token format
          },
        },
      },
      security: [{ BearerAuth: [] }], // Apply globally by default
    },
    transform: ({ schema, url, route }) => {
      // add swagger tag
      const tag: string = (route as any).prefix;

      let tags;
      if (tag) {
        tags = [tag.substring(1)];
        tags.push(...(schema?.tags ?? []));
      }
      // jsonSchemaTransform will support our schema
      const jsonSchema = jsonSchemaTransform({
        schema: { ...schema, tags: tags },
        url: url,
      });
      //
      normalizeFileFields(jsonSchema.schema);

      return jsonSchema;
    },
  });

  await fastify.register(swaggerUiPlugin, {
    routePrefix: "/docs",
    uiConfig: {
      persistAuthorization: true,
      docExpansion: "list",
      deepLinking: false,
      requestInterceptor: (req) => {
        req.headers["Content-Language"] = "ar";
        return req;
      },
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });
});

//to support upload files in swagger.
function normalizeFileFields(obj: Record<string, any>) {
  let routeContainsFile = false;

  if (
    obj.hasOwnProperty("consumes") &&
    obj.consumes.includes("multipart/form-data")
  ) {
    routeContainsFile = true;
  }

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (key === "body" && routeContainsFile) {
        obj[key] = {
          type: "object",
          required: ["file"],
          properties: {
            file: { type: "file" },
          },
        };
      } else {
        normalizeFileFields(obj[key]);
      }
    }
  }

  return obj;
}
