import tmpCategories from '../tmp_data/categories.js'
import hygraphClient, { gql } from './hygraph-client.js'
// TODO: get this from hygraph instead


export async function allCategories() {
    const query = gql`query MyQuery {
      categories {
        id
        slug
        name
      }
    }
    
      `
      try {
        const {categories} = await hygraphClient.request(query)

        return categories
      } catch (error) {
        console.log(error)
      }
   
}

export async function getCategoryBySlug(slug) {

    const query = `query getCategoryBySlug($slug: String) {
      category(where: {slug: $slug}) {
        name
        slug
        description
        products {
          price
          slug
          images(first: 1) {
            height
            width
            url(transformation: {image: {resize: {width: 300}}})
          }
          name
        }
      }
    }
    
      `

      try {
        const {category} = await hygraphClient.request(query, {slug})
        return category
      } catch (error) {
        console.log(error)
      }
}