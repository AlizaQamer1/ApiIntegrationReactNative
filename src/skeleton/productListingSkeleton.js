import React from 'react'
import ContentLoader, {Rect} from 'react-content-loader/native'

const ProductListingSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
 
    >
      <Rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
      
    </ContentLoader>
  )
}


export default ProductListingSkeleton