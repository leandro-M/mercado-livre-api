/**
 * @typedef {('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH')} HTTPMethod
 */

/**
 * @typedef {Object} Route
 * @property {HTTPMethod} method
 * @property {string} path
 * @property {string} [description]
 * @property {Object.<string, { description: string, content: any }>} [responses]
 * @property {import('express').Handler[]} [middlewares]
 * @property {Object.<string, import('joi').Schema>} [schema]
 * @property {import('express').Handler} handler
 */
