import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSaller = () => {
    const {products} = useContext(ShopContext);
    const [bestSaller, setBestSaller] = useState([]);
    // console.log(products)

    useEffect(()=>{
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSaller(bestProduct.slice(0,5))
    },[products])
    console.log(bestSaller)
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, illo ex. Culpa omnis tempore architecto itaque excepturi ad accusantium, rem tempora voluptates enim aut corrupti inventore! Voluptates quo velit porro?
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSaller.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }
        </div>
      
    </div>
  )
}

export default BestSaller
