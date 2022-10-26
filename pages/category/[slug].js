// Product detail pages generated from utils/getProducts.js
// Path: /pages/products/[slug].js
import Image from 'next/image'
import ProductGrid from '../../components/ProductGrid'
import Hero from '../../components/Hero'

import { allCategories, getCategoryBySlug } from '../../utils/getCategories'

export async function getStaticPaths() {
    const categories = await allCategories()
    const paths = categories.map((category) => ({
        params: { slug: category.slug },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const category = await getCategoryBySlug(params.slug)

    return {
        props: { category },
    }
}

export default function Page({category}) {
    return (<>
    <Hero 
        title={category.name}
        description={category.description}
        />
    <section className='mt-20'>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category.name} Products</h2>

      <ProductGrid products={category.products} />
      </section>
    </>)
}