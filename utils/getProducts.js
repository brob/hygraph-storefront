import products from '../tmp_data/products.js'
import hygraphClient, { gql } from './hygraph-client.js'

// TODO: get this from hygraph instead
// Average review.rating for a product
function averageRating(reviews) {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.floor(total / reviews.length)
}

export async function allProducts() {
    const query = gql`query GetAllBikes {
      bikes
      {
        bikeName
        id
        slug
        bcBikeData{
          data{
            name
            price
            availability
            images {
              url_zoom
            }
          }
        }
      }
    }
      `

        try {
            const {bikes} = await hygraphClient.request(query)

            return bikes
        } catch (error) {
            console.log(error)
        }


}

export async function getProductBySlug(slug) {
    const query = gql`query GetSingleBike($slug: String!) {
      bike(where: {slug: $slug}) {
        bikeName
        categories
        faunaReviews {
          content
          name
          productId
          rating
          _ts
          _id
        }
        bcBikeData{
          data{
            name
            description
            price
            availability
            
            # this has all of the component data for the bikes
            # For EMTBs only you get two additional fields - Motor and Battery
            custom_fields {
              name
              value
            }
            images{
              url_zoom
              url_tiny
              url_standard
              url_thumbnail
            }
            variants{
              inventory_level
              option_values{
                label
              }
            }
          }
        }
      }
    }
      `
        try {
            let {bike} = await hygraphClient.request(query, {slug})
            bike.averageRating = averageRating(bike.faunaReviews)
            bike = {...bike, ...bike.bcBikeData.data}
            return bike
        } catch (error) {
            console.log(error)
        }
}
  