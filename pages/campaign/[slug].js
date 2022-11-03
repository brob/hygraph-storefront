import Head from "next/head"
import Hero, { FullHero } from "../../components/Hero"

import ProductGrid from "../../components/ProductGrid"
import { allCampaigns, getCampaignBySlug } from "../../utils/getCampaigns"


const CallToAction = ({cta}) => {
  const { body, heading, button, image } = cta
  return ( 
      <Hero description={body.text} title={heading} button={button} image={image?.url} />
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
    },
    revalidate: 60,
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
        <FullHero
          title={page.title}
          description={page.description?.text}
          //button={{text: 'Shop Now', url: '/category/hoodies'}}
          image={page.heroImage ? page.heroImage.secure_url : null}
        />



        {page.stripes.map(stripe => {
          if (stripe.__typename === 'CallToAction') {
            return <CallToAction key={stripe.id} cta={stripe} />
          }
          if (stripe.__typename === 'ProductGrid' && stripe.products.length > 0) {
            return <ProductGrid key={stripe.id} title={stripe.headline} products={stripe.products} />
          }
        })}

      </>
    )
  }