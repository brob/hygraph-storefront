import products from '../tmp_data/products.js'
import hygraphClient, { gql } from './hygraph-client.js'

// TODO: get this from hygraph instead
// Average review.rating for a product
function averageRating(reviews) {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.floor(total / reviews.length)
}

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
          faunaReviews {
            _ts
            _id
            name
            content
            rating
          }
          images(first: 4) {
            url
          }
        }
      }
      `
        try {
            let {product} = await hygraphClient.request(query, {slug})
            product.averageRating = averageRating(product.faunaReviews)
            return product
        } catch (error) {
            console.log(error)
        }
}
  