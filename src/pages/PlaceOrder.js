import React, { useContext, useEffect, useState, useCallback  } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {nevigate,token,cartItem,setCartItem,getCartAmount,delivery_fee,products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    state: '',
    street: '',
    zipCode: ''
  })

  const onPageLoad = useCallback(async () => {
    try {
      const response = await fetch("https://apex.oracle.com/pls/apex/ahladghor/auth/addUser", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const userInfo = data.data[0];
      if (userInfo) {
        setFormData({
          firstName: userInfo.FIRSTNAME.trim() || '',
          lastName: userInfo.LASTNAME.trim() || '',
          email: userInfo.EMAIL.trim() || '',
          street: userInfo.STREET.trim() || '',
          city: userInfo.CITY.trim() || '',
          state: userInfo.STATE.trim() || '',
          zipCode: userInfo.ZIPCODE.trim() || '',
          country: userInfo.COUNTRY.trim() || '',
          phone: userInfo.PHONE.trim() || ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }, [token]);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({...data,[name]:value}));
  }

  const onSumbitHandler = async(event) =>{
    event.preventDefault();

    try {

      let orderItems = [];

      for(const items in cartItem){
        for(const item in cartItem[items] ){
          if(cartItem[items][item] > 0){
            const itemDetail = structuredClone(products.find(product => product._id === Number(items)))
            const itemInfo = {};
            if(items){
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              itemInfo.id=items;
              itemInfo.price = itemDetail.price;
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // console.log(orderItems);

      try {
        const response = await fetch('https://apex.oracle.com/pls/apex/ahladghor/auth/addUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            toast.error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if(data.message === 'Success'){
          const grossAmount = getCartAmount();
          const netPayable = getCartAmount() + delivery_fee;
          const masterData = {
            delivery_fee:delivery_fee,
            grossAmount:grossAmount,
            netPayable:netPayable,
            paymentMode:method,
            orderDetails: JSON.stringify(orderItems)
          }
          // console.log(orderItems);
          // console.log('orderItems ', masterData);

          const response = await fetch('https://apex.oracle.com/pls/apex/ahladghor/order/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(masterData)
        });

        const data = await response.json();
        if(data.message === 'Success'){
          nevigate('/orders')
          setCartItem({});
          localStorage.removeItem('cartItem');
          toast.success("Your order placed successfully")
        }
        }
    } catch (error) {
        toast.error('Error adding user:', error);
    }
      
    } catch (error) {
    }
  }

  useEffect(()=>{
    onPageLoad();
  },[onPageLoad])

  return (
    <form onSubmit={onSumbitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
    {/**left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />          
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zipcode' />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/**left side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/*------------------- Payment Method Section -------------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder
