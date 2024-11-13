import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
const Orders = () => {

  const {token, currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = useCallback(async () =>{
    try {
      if(!token){
        return null
      }else{
        const response = await fetch('https://apex.oracle.com/pls/apex/ahladghor/order/placeOrder', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });
      const data = await response.json();
      setOrderData(data.data);
      }
    } catch (error) {
      
    }
  },[token]);

  useEffect(()=>{
    loadOrderData()
  },[loadOrderData]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <div>
          {
            orderData.map((item, index)=>(
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.IMAGE} alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{item.NAME}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                      <p className='text-lg'>{currency} {item.UNIT_PRICE}</p>
                      <p>Quantity: {item.QUANTITY}</p>
                      <p>Size: {item.ITEM_SIZE}</p>
                    </div>
                    <p className='mt-2'>Date: <span className='text-gray-400'>{item.SALES_DATE}</span></p>
                  </div>
                </div>
                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{item.STATUS}</p>
                    </div>
                    <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                  </div>
              </div>
            ))
          }

        </div>

      </div>
      
    </div>
  )
}

export default Orders
