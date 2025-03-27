import React from 'react'
import { useParams } from 'react-router-dom'
const ProductDetail = () => {
  const params = useParams()
  console.log(params)
  return (
    <main>
      <div className='component'>Product Detail Component</div>
    </main>
  )
}

export default ProductDetail
