import Head from "next/head"
import Hero from "../../components/Hero"

import ProductGrid from "../../components/ProductGrid"
import { allCampaigns, getCampaignBySlug } from "../../utils/getCampaigns"


const CallToAction = ({cta}) => {
  const { body, heading, button, image } = cta
  return ( 
      <Hero description={body.text} title={heading} button={button} image={image.url} />
  )
}
const SimpleGrid = ({stripe}) => {
  return (
    <>
      <h1>This is a simple grid</h1>
    </>
  )
}



export const getStaticProps = async ({params}) => {

  const campaign = await getCampaignBySlug(params.slug)
  return {
    props: {
      'page': campaign
    }
  }
}

export const getStaticPaths = async () => {
  const campaigns = await allCampaigns()
  return {
    paths: campaigns.map(campaign => ({
      params: {
        slug: campaign.slug
      }
    })),
    fallback: false

  }}

  export default function Page({ page }) {

    return (
      <>
        <Head>
          <title>{page.title}</title>
        </Head>
        <Hero
          title={page.title}
          description={page.description.text}
          button={{text: 'Shop Now', url: '/category/hoodies'}}
        />



        {page.stripes.map(stripe => {
          if (stripe.__typename === 'CallToAction') {
            return <CallToAction cta={stripe} />
          }
          if (stripe.__typename === 'ProductGrid') {
            return <ProductGrid title={stripe.headline} products={stripe.products} />
          }
        })}

      </>
    )
  }