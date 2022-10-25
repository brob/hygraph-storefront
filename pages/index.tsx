import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/hero'
import ProductGrid from '../components/product-grid'
const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <ProductGrid />
    </>
  )
}

export default Home
