import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const NoDataFound = () => {
  return (
    <div className='items-center'>
      <img className='w-[500px]' src={assets.noDataFound} alt="" />
    </div>
  )
}

export default NoDataFound
