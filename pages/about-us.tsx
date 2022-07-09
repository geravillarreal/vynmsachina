import Image from 'next/image'
import React from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'

import styles from '../styles/AboutUs.module.scss'

const AboutUs = () => {

  const grid1 = [
    {
      icon: '/about-us/icon1.1.png',
      title: '目标',
      text: '我们始终视服务至上和超出客户预期为目标，您的项目将始终按预算、时间、按要求交付给您'
    },
    {
      icon: '/about-us/icon1.2.png',
      title: '愿景',
      text: '成为国内外企业在墨西哥投资经商时物色工业园区的第一选择'
    },
  ]

  const grid2 = [
    {
      icon: '/about-us/icon2.1.png',
      title: '诚实',
      text: '对客户、供应商、员工始终保持诚实'
    },
    {
      icon: '/about-us/icon2.2.png',
      title: '尊重',
      text: '绝不因他人的社会地位、经济条件或职务而对其歧视或区别对待'
    },
    {
      icon: '/about-us/icon2.3.png',
      title: '正直',
      text: '尊重事实，坚守正确的价值观'
    },
    {
      icon: '/about-us/icon2.4.png',
      title: '勤勉',
      text: '全心全意奋力达成为客户提出的承诺'
    },
    {
      icon: '/about-us/icon2.5.png',
      title: '环保',
      text: '鼓励员工和客户为保护环境出一份力，共同为我们的家园负责，留下绿色环保的印记'
    },
    {
      icon: '/about-us/icon2.6.png',
      title: '道德',
      text: '公司编有员工道德准则指南，要求所有员工将商业道德视为工作基准'
    },
  ]

  return (
    <Layout title='About us'>
      <Header
        webImage='/about-us/header-web.jpeg'
        mobileImage='/about-us/header-mobile.png'
      />
      <div className={styles.intro}>

        <div className={styles.content}>
          <div className="underlined">
            <h2>历史</h2>
          </div>
          <span>集团成立于1994年, 作为顶尖工业地产开发集团之一, 秉厦23个工业园区分布于墨西哥东北部和中部最具优势的5个州, 为制造、出口、物流、本地贸易企业和希望在墨境内寻找厂房或仓储空间的境外投资者提供最佳位置。</span>

        </div>
        <div className={styles.slider}>

          <div className={styles.slide}>
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/about-us/intro/slide-1.jpeg' />
          </div>

        </div>
      </div>

      <div className={styles.values}>
        <Image
          layout='fill'
          objectFit='cover'
          src='/about-us/bg-green.png'
          alt=''
        />
        <div className={styles.grid1}>
          {
            grid1.map(item => (
              <div className={styles.item} key={item.title}>
                <Image
                  width={40}
                  height={40}
                  alt=''
                  src={item.icon}
                />
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </div>
            ))
          }
        </div>
        <div className={styles.grid2}>
          {
            grid2.map(item => (
              <div className={styles.item} key={item.title}>
                <Image
                  width={40}
                  height={40}
                  alt=''
                  src={item.icon}
                />
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.content}>
          <div className="underlined">
            <h2>我们的客户</h2>
          </div>
          <span>VYNMSA（秉厦）始终致力于满足客户的需求，已经成功为来自全球25个国家（中国、日本、 韩国、墨西哥、美国、加拿大、阿根廷、 德国、西班牙、意大利、法国、奥地利、英国、丹麦等）的企业成功交付了400多个项目、 建筑总面积达250万平方米。

            在过去的六年中，我们与中国、韩国和日本的公司 建立了良好的合作关系，在墨西哥同行业中拥有最多的亚洲客户，共同开展了40个项目。</span>
        </div>

        <div className={styles.image}>
          <div className="green-border-top-left">
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/about-us/section.jpeg' />
          </div>
        </div>
      </div>

      <div className={styles.outro}>
        <div className={styles.content}>
          <div className="underlined">
            <h2>我们的客户</h2>
          </div>
          <span>
            从2017年开始，VYNMSA(秉厦)已多次造访北京、上海、广州、深圳、珠海、武汉、重庆等地，并与中国产业海外发展协会、广东对外经济合作企业协会、中国贸促会广州市委员会、中国贸促会珠海市委员会暨珠海国际商会、湖北省发改委外经处、重庆对外投资和经济合作企业协会、重庆市商务委员会外经处、墨西哥总商会亚太商会等建立了良好的合作关系，为提升秉厦在中国市场影响力奠定基础。
            其中，VYNMSA(秉厦)集团CEO Alejandro Gonzalez Quezada还曾受邀参加2017国际产能合作论坛暨第九届中国对外投资合作洽谈会，以及由江泰国际合作联盟、江泰全球救援联盟主办的 “2018中国企业走出去风险发布会”。
            除此以外，VYNMSA(秉厦)长期与墨西哥驻华使馆、驻穗领馆、驻沪领馆在各地共同举办形式多样的经贸投资宣讲会，向国内企业介绍真实的墨西哥市场环境和外来投资商机，希望帮助中国企业未来在墨西哥顺利实现投资，为其提供工业地产的专业服务，使“中国离墨西哥更进一步”。
          </span>
        </div>

        <div className={styles.image}>
          <div className="green-border-top-right">
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/about-us/section.jpeg' />
          </div>
        </div>
      </div>

      <div className={styles.background}>

        <Image
          alt=''
          objectFit='cover'
          layout='fill'
          src='/about-us/bg6.jpeg' />

        <div className={styles.content}>
          <span>联系VYNMSA，我们将超出您的期望！
          </span>
          <button className='btn btn-green'>联系我们</button>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs