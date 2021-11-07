import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Myntra Wardrobe Links',
  description: 'Shareable wardrobe links',
  keywords: 'wardrobe, clothing, watches, shoes',
}

export default Meta
