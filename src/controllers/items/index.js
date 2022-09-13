import * as Items from '../../models/items'

export async function find(req, res) {
  const { query } = req

  const posts = await Items.find(query)
  return res.json(posts)
}


export async function findById(req, res) {
  const { id } = req.params

  const posts = await Items.findById(id)
  return res.json(posts)
}
