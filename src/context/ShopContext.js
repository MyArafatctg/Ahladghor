import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();
const ShopContextProvider = (props) =>{
    const currency = '৳';
    const delivery_fee = 60;
    const backendUrl = 'https://apex.oracle.com/pls/apex/ahladghor';
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] =  useState([]);
    const [token, setToken] = useState('');
    const [products, setProducts] = useState([]);
    const nevigate = useNavigate();

    const addToCart = async (itemId, size) =>{

        let cartData = structuredClone(cartItem);
        if(!size){
            toast.error('Select product size');
            return;
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        localStorage.setItem('cartItem', JSON.stringify(cartData));
        setCartItem(cartData);
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item] > 0){
                        totalCount += cartItem[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) =>{
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find((product) => product._id === Number(items));
            for( const item in cartItem[Number(items)]){
                try {
                    if(cartItem[Number(items)][item] > 0){
                        totalAmount += itemInfo.price * cartItem[Number(items)][item];
                    }
                }catch (error){
                    console.log('error : ' + error );
                }
            }
        }
        return totalAmount;
    }
    const getProductsData = async () => {
        try {
            const response = await fetch('https://apex.oracle.com/pls/apex/ahladghor/Products/getProducts');
            
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json(); // Parse the JSON data
            let products = data.items[0].products;
            if (typeof products === "string") {
                products = JSON.parse(products);
            }
            // console.log(products); // Log the data to the console
            setProducts(products); // Log the data to the console
        } catch (error) {
            toast.error( error); // Handle any errors
        }
    };

    const getCartItem = async () => {
        try {
            const data = JSON.parse(localStorage.getItem('cartItem'));
            if (data) {
                setCartItem(data);
            }
        } catch (error) {
            console.error("Failed to get cart items from localStorage", error);
        }
    };

    useEffect(()=>{
        getProductsData();
    },[])
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[token])

    useEffect(() => {
        getCartItem();
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }, [cartItem]);
    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItem, addToCart, getCartCount, updateQuantity,
        getCartAmount, nevigate,backendUrl,token, setToken, setCartItem
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;