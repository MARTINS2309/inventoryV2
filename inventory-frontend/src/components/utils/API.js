import axios from "axios"

//fetch function for products takes State setter as a prop and gets data using axios then sets it
export const fetchProducts = async ({setFectechedProducts}) => {
  const productsRes =  await axios({
    method: 'GET',
    url: 'http://localhost:3001/api/products'
  })
  setFectechedProducts(productsRes.data)
}

//fetch function for stock events takes State setter as a prop and gets data using axios then sets it
//must include params populate * to make the response include relational data
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
