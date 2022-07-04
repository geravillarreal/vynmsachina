import Head from 'next/head'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Layout from '../components/Layout'

export default function Index({ allPosts: { edges }, preview }: any) {
  const heroPost = edges[0]?.node
  const morePosts = edges

  console.log(morePosts);

  return (
    <Layout title='Blog' >
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}
