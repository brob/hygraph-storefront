// Product detail pages generated from utils/getProducts.js
// Path: /pages/products/[slug].js
import Image from 'next/image'
import { allProducts, getProductBySlug } from '../../utils/getProducts'
import { StarIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import Review from '../../components/Review'
import Stars from '../../components/Stars'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export async function getStaticPaths() {
    const products = await allProducts()

    const paths = products.map((product) => ({
        params: { slug: product.slug },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

    const product = await getProductBySlug(params.slug)

    const reviews = { href: '#', average: 4, totalCount: 117 }
    return {
        props: { product, reviews },
    }
}

export default function Page({ product, reviews }) {

    return (<>
        <Head>
            <title>{product.name}</title>
        </Head>
        {(product.images.length > 1) && (<div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                <img
                    src={product.images[0].url_zoom}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                    <img
                        src={product.images[1].url_zoom}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                    <img
                        src={product.images[2].url_zoom}

                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                <img
                    src={product.images[3].url_zoom}
                    className="h-full w-full object-cover object-center"
                />
            </div>
        </div>)}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                {(product.images.length === 1) && (
                    <img
                        style={{ maxHeight: "300px", width: "auto" }}
                        src={product.images[0].url_zoom}
                    />
                )}
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
                {/* Reviews */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Reviews</h3>
                    <div className="flex items-center">
                        <Stars rating={product.averageRating} />
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                        <a href="#reviews" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {product?.faunaReviews?.length} reviews
                        </a>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add to bag
                </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6" dangerouslySetInnerHTML={{__html: product.description}}>

                    </div>
                </div>
            </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product?.faunaReviews?.length > 0 && (<>
                <h3 id="reviews" className="text-2xl font-bold tracking-tight text-gray-900">Reviews</h3>
                <div className='grid grid-cols-1 divide-y'>
                    {product.faunaReviews.map((review) => (
                        <Review key={review._id} review={review} />
                    ))}
                </div>
            </>)}
        </div>
    </>)
}