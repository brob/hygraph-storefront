import Hero from "../components/Hero"
import ProductGrid from "../components/ProductGrid"
import {allProducts} from '../utils/getProducts'

export const getStaticProps = async () => {
  const products = await allProducts()
  return {
    props: {
      'products': products.slice(0, 4)
    },
    revalidate: 60,
  }
}
export default function Page(props) {
    const {products} = props
    const heroButton = {
        text: 'Shop Now',
        link: '/shop'
    }

    return (
        <>
        <Hero 
          title="Fall Colors Sale" 
          description='Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.'
          button={heroButton}
        />

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
        <ProductGrid products={products} />
        </>
    )
}