import { request } from '../../services/request'

import currency from '../../utils/currency'

export const find = async (params) => {
  try {
    const { data } = await request.get(
      `/sites/MLA/search`,
      {
        params
      }
    )

    const items = data?.results?.map(itemDTO)
    
    const [itemRef] = items
    
    const breadcrumbs = await getBreadcrumb(itemRef.category_id)

    const response = {
      list: items,
      breadcrumbs
    }
    
    return response
  } catch (error) {
    console.log("error", error)
    throw {
      message: 'No one post found',
      status: 400
    }
  }
}

export const findById = async (id) => {
  try {
    const { data } = await request.get(`/items/${id}`)
    
    
    const { data: additionalInfo } = await request.get(`/items/${id}/description`)

    const info = itemDTO(data)
    info.description = additionalInfo.plain_text

    const breadcrumbs = await getBreadcrumb(info.category_id)

    const response = {
      info,
      breadcrumbs
    }

    return response
  } catch (error) {
    console.log("error", error)
    throw {
      message: 'No one post found',
      status: 400
    }
  }
}

export const getBreadcrumb = async (id) => {
  const { data } = await request.get(`/categories/${id}`)

  const list = data.path_from_root.map(item => ({
    ...item
  }))

  return list
}

const itemDTO = (item) => ({
  id: item.id,
  title: item.title,
  price: {
    currency: currency[item.currency_id],
    amount: item.price,
    decimals: item.currency_id,
  },
  shipping: item.shipping.free_shipping,
  picture: item?.pictures || item.thumbnail,
  sold_quantity: item.sold_quantity,
  category_id: item.category_id,
  state_name: item?.address?.state_name,
  permalink: item?.permalink
})