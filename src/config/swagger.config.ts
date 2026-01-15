import swaggerJsdoc from 'swagger-jsdoc'
import packageConfig from 'package.json'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: packageConfig.name,
      version: packageConfig.version,
      description: packageConfig.description
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Bearer token for access'
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: [
    './src/**/*.routes.ts'
  ]
}

export const specs = swaggerJsdoc(options)
