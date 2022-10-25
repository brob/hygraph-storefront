import products from '../tmp_data/products.js'
import hygraphClient, { gql } from './hygraph-client.js'

// TODO: get this from hygraph instead


export async function allProducts() {
    const query = gql`query MyQuery {
        products {
          slug
          name
          price
          images(first: 1) {
            url
            width
            height
          }
        }
      }
      `

        try {
            const {products} = await hygraphClient.request(query)
            console.log({products})
            return products
        } catch (error) {
            console.log(error)
        }


}

export async function getProductBySlug(slug) {
    const query = gql`query MyQuery($slug: String) {
        product(where: {slug: $slug}) {
          name
          price
          slug
          description
          images(first: 4) {
            url
          }
        }
      }
      `
        try {
            const {product} = await hygraphClient.request(query, {slug})
            console.log({product})
            return product
        } catch (error) {
            console.log(error)
        }
}
  