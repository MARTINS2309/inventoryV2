import axios from "axios"

export const fetchProducts = async ({setFectechedProducts}) => {
  const productsRes =  await axios({
    method: 'GET',
    url: 'http://localhost:1337/api/products'
  })
  setFectechedProducts(productsRes.data.data)
}

export const fetchStockEvents = async ({setFetchedStockEvents}) => {
  const stockEventsRes = await axios({
    method: 'GET',
    url: 'http://localhost:1337/api/stockevents',
    params: {
      populate: '*'
    },
  })
  setFetchedStockEvents(stockEventsRes.data.data)
}