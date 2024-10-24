import React from 'react'
import Header from '../../components/common/Header'
import CategoriesChips from '../../components/common/CategoriesChips'
import ProductsGridWithPagination from '../../components/common/ProductsGridWithPagination'

const Root = () => {
  return (
    <div className='font-vazir'>
    <Header/>
    <CategoriesChips/>
 <ProductsGridWithPagination/>
    </div>
  )
}

export default Root