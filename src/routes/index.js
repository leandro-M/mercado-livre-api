import express from 'express';
import joiValidate from '../middlewares/joi';

import items from './items';

import './types';

// eslint-disable-next-line new-cap
const router = express.Router();

const defaultMiddleware = (req, res, next) => next();

/**
 * @type {Route[]}
 */
export const routes = [
  ...items,
];

for (const route of routes) {
  const middlewares = route.middlewares || [];

  router[route.method.toLocaleLowerCase()](
    route.path,
    ...middlewares,
    route.schema ? joiValidate(route.schema) : defaultMiddleware,
    route.handler
  );
}

router.get('*', (req, res, next) =>
  next({
    status: 404,
    message: 'RESOURCE_NOT_FOUND',
  })
);

export default router;
