import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/Layout'
import styles from '../styles/Blog.module.scss'
import Image from 'next/image';

export default function Index({ allPosts: { edges } }: any) {
  const morePosts = edges

  console.log(morePosts);

  return (
    <Layout title='Blog' >

      <div className='header'>
        <Image
          layout='fill'
          objectFit='cover'
          src='/blog/blog-header.jpeg'
          alt=''
        />
        <div className="wave1"></div>
      </div>
      <div className={styles.posts}>
        {
          morePosts.map((post: any) => (
            <div key={post.node.title} className={styles.post}>
              <div className={styles.image}>
                <Image
                  layout='fill'
                  src={post.node.featuredImage.node.sourceUrl}
                  alt=''
                />
              </div>
              <div className={styles.info}>
                <h4>{post.node.title}</h4>
                <span
                  className={styles.excerpt}
                  dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                ></span>
                <span>{post.node.date}</span>
              </div>

            </div>
          ))
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {

  let posts: any[] = []

  /* try {
    posts = await getAllPostsForHome(preview)
  } catch (error) {
    console.log(error);
  } */

  return {
    props: { allPosts: posts, preview },
    revalidate: 10,
  }
}
