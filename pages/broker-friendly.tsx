import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Companies from '../components/Companies'
import Form from '../components/Form'
import Header from '../components/Header'
import Layout from '../components/Layout'
import styles from '../styles/RecruitingAgents.module.scss'

const RecruitingAgents = () => {

  const icons = [
    {
      text: '佣金结算体系完善',
      image: '/recruiting-agents/1.png',
    },
    {
      text: '返佣及时',
      image: '/recruiting-agents/2.png',
    },
    {
      text: '流程灵活高效，对代理友好',
      image: '/recruiting-agents/3.png',
    },
    {
      text: '遵循“双赢互利”战略，保证项目以最快速度推进',
      image: '/recruiting-agents/4.png',
    },
    {
      text: '中企在墨西哥工业地产市场的最佳合作伙伴',
      image: '/recruiting-agents/5.png',
    },
  ]

  return (
    <Layout title='诚招代理'>
      <Header
        mobileImage='/recruiting-agents/header-mobile.jpeg'
        webImage='/recruiting-agents/header-web.jpeg'
      />

      <div className="broker-friendly">
        <Form />
      </div>

      <div className={styles.sectionWrapper}>
        <div className={styles.section}>
          <span>
            VYNMSA (秉厦) 一路走来，所取得的成功与各招商代理的配合密不可分，多年前就已与全球知名地产服务及代理机构如世邦魏理仕、仲量联行 、萊坊、戴德梁行、高力国际等建立起了良好的合作关系，共同协助客户租用和投资墨西哥房地产。
            凭借其丰富的行业经验和专业知识，秉厦将给予代理商 大力度的扶持，让代理商更好地完成各类高要求、个性化工业地产项目。
          </span>

          <div className={styles.image}>
            <Image
              alt=''
              objectFit='contain'
              layout='fill'
              src='/recruiting-agents/companies.gif'
            />
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.section2}`}>
        <h3>代理VYNMSA(秉厦)有哪些优势？</h3>
        <span>
        作为墨西哥顶尖的工业园区建设开发商，VYNMSA (秉厦)已成功完成500多个项目，在墨西哥北部和中部5个工业大州建有26个工业园区，总面积达400万平米，目前约有20个工业/货仓空间可立即入驻. 
        </span>
        <div className={styles.grid}>
          {
            icons.map(item => (
              <div key={item.image} className={styles.item}>
                <Image
                  alt=''
                  width={80}
                  height={80}
                  src={item.image}
                />
                <span>{item.text}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.images}>
        <h2>租赁·销售·定制</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <div className={styles.image}>
              <Link href='/about-us'>
                <a>
                <Image
                  objectFit='cover'
                  layout='fill'
                  src='/recruiting-agents/img-1.jpeg'
                  alt=''
                />
                </a>
              </Link>
            </div>
            <Link href='/about-us'>
              <a>
                <span>工业园区介绍</span>
              </a>
            </Link>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <Link href='/inventory'>
                <a>
                  <Image
                    objectFit='cover'
                    layout='fill'
                    src='/recruiting-agents/img-2.jpeg'
                    alt=''
                  />
                </a>
              </Link>
            </div>
            <Link href='/inventory'>
              <a>
                <span>可用厂房列表</span>
              </a>
            </Link>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <a target='_blank' href="/pdf/Inventory-Building-VYNMSA-04Abr-24.pdf">
                <Image
                  objectFit='cover'
                  layout='fill'
                  src='/recruiting-agents/img-3.jpeg'
                  alt=''
                />
              </a>
            </div>
            <a target='_blank' href="/pdf/Inventory-Building-VYNMSA-04Abr-24.pdf">
              <span>VYNMSA工业建筑物的租赁和出售手册（下载矩阵）</span>
            </a>
          </div>
        </div>
      </div>

      <Companies />
      {/* <span className={styles.bottomGreen}>VYNMSA (秉厦) 愿携手代理商，共同发展，共同拥抱中墨合作良机！</span> */}
    </Layout>
  )
}

export default RecruitingAgents