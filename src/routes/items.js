import * as itemsController from '../controllers/items'

/**
 * @type {Route[]}
 */
const routes = [
  {
    method: 'GET',
    path: '/items',
    description: 'Listar todos os items',
    handler: itemsController.find
  },
  {
    method: 'GET',
    path: '/items/:id',
    description: 'Lista item pelo id',
    handler: itemsController.findById
  }
]

export default routes
