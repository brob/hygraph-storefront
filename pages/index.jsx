import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import Main from '../components/Main'
import ProductGrid from '../components/ProductGrid'
import {allProducts} from '../utils/getProducts'

export const getStaticProps = async () => {
  const products = await allProducts()
  return {
    props: {
      'products': products.slice(0, 4)
    },

  }
}

const Home = function(props) {
  return (
    <>
      <Head>
        <title>Welcome to the Hygraph Shop</title>
      </Head>
      <Hero 
        title="The best bikes in multiple styles" 
        description='Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.'
        button={{text: 'Shop Now', link: '/shop'}}
        />
      <section className='mt-20'>

      <ProductGrid title="Featured Products" products={props.products} />
      </section>
    </>
  )
}

export default Home
