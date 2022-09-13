import j2s from 'joi-to-swagger';
import { routes } from '../routes';

const API_PORT = process.env.API_PORT

const info = {
  title: 'mercado libre doc api',
  description:
    'Aquí encontrará todos los puntos finales relacionados con el proyecto de mercado libre.',
  contact: {
    email: 'leandrotinfo19@gmail.com',
  },
  version: '1.0.0',
};

/**
 * @param {string} path
 */
function formatPathToSwagger(path) {
  const delimiter = /:\w*/g;
  if (!path.match(delimiter)) return path;
  const params = path.match(delimiter).map(param => param.replace(':', ''));

  const pathWithoutParams = path.split(delimiter);
  for (let i = 1; i < pathWithoutParams.length; i += 2) {
    pathWithoutParams.splice(i, 0, `{${params[0]}}`);
  }

  return pathWithoutParams.join('');
}

function pathToSwaggerParams(path) {
  const delimiter = /:\w*/g;
  if (!path.match(delimiter)) return [];
  return path.match(delimiter).map(param => ({
    name: param.replace(':', ''),
    in: 'path',
    required: true,
  }));
}

export default {
  info,
  openapi: '3.0.1',
  servers: [
    {
      url:
        `http://localhost:${API_PORT}/`,
      description: 'Local api',
    },
  ],
  paths: routes.reduce((prev, route) => {
    const schema = route.schema && j2s(route.schema).swagger;
    const path = formatPathToSwagger(route.path);
    const params = pathToSwaggerParams(route.path);
    const tag = route?.path?.match(/\/\w*/g)[0].replace('', '');
    const middlewares = route.middlewares || [];
    const scopes = route.scopes || [];

    return {
      ...prev,
      [path]: {
        ...prev[path],
        [route.method.toLowerCase()]: {
          summary: route.description || '',
          security: [
            {
              ...(scopes.length && { bearer: [] }),
            },
          ],
          tags: [tag],
          parameters: params,
          ...(schema && {
            requestBody: {
              content: {
                'application/json': {
                  schema,
                },
              },
            },
          }),
          responses: {
            ...route.responses,
            '200': {
              description: 'OK',
            },
            '401': {
              description: 'Autenticação obrigatória',
            },
            '403': {
              description: 'Usuário não tem permissões suficientes',
            },
            '406': {
              description: 'Payload inválida',
            },
            '5XX': {
              description: 'Erro inesperado',
            },
          },
        },
      },
    };
  }, {}),
  components: {
    securitySchemes: {
      basic: {
        type: 'http',
        scheme: 'basic',
      },
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
