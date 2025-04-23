import React from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
const ProductList = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams)
  console.log(searchParams.get('instock'))  
  console.log(searchParams.get('rating'))
  const location = useLocation();
  console.log(location)

  return (
    <main>
      <div className="component">Product List</div>
    </main>
  )
}

export default ProductList
