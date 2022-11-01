import hygraphClient, { gql } from './hygraph-client.js'

export async function allCampaigns() {
    const query = gql`query MyQuery {
        campaigns {
          slug
        }
      }
      `

        try {
            const {campaigns} = await hygraphClient.request(query)
            return campaigns
        } catch (error) {
            console.log(error)
        }
    }

export async function getCampaignBySlug(slug) {
    const query = gql`query MyQuery($slug: String) {
      campaign(where: {slug: $slug}) {
        title
        slug
        description {
          text
        }
        stripes {
          ... on CallToAction {
            __typename
            id
            body {
              text
            }
            heading
            button {
              text
              url
            }
            image {
              url
            }
          }
          ... on ProductGrid {
            __typename
            id
            description {
              text
            }
            headline
            products {
              bikeName
              slug
              bcBikeData {
                data {
                  images {
                    url_zoom
                  }
                  price
                }
              }
            }
          }
        }
      }
    }
    
      `

        try {
            const {campaign} = await hygraphClient.request(query, {slug})
            return campaign
        } catch (error) {
            console.log(error)
        }
}