import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = useCallback(() => {
    let copyProducts = products.slice();

    if (category.length > 0) {
      copyProducts = copyProducts.filter(item => category.includes(item.category));
    }
    if (showSearch && search) {
      copyProducts = copyProducts.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (subCategory.length > 0) {
      copyProducts = copyProducts.filter(item => subCategory.includes(item.subCategory));
    }

    // Only update if the filtered result is different
    setFilterProduct(prev => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(copyProducts);
      return isEqual ? prev : copyProducts;
    });
  }, [products, category, showSearch, search, subCategory]);

  const sortProducts = useCallback(() => {
    let sortedProducts = filterProduct.slice();
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        return; // No need to re-run `applyFilter`, prevents re-triggering
    }

    // Only update if sorted result is different
    setFilterProduct(prev => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(sortedProducts);
      return isEqual ? prev : sortedProducts;
    });
  }, [filterProduct, sortType]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  useEffect(() => {
    sortProducts();
  }, [sortProducts]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Option */}
      <div className='min-w-60'>
        <p 
          onClick={() => setShowFilter(!showFilter)} 
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img 
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} 
            src={assets.dropdown_icon} 
            alt="" 
          />
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input 
                className='w-3' 
                type="checkbox" 
                value='Men' 
                onChange={toggleCategory} 
              /> Men
            </p>
            <p className='flex gap-2'>
              <input 
                className='w-3' 
                type="checkbox" 
                value='Women' 
                onChange={toggleCategory} 
              /> Women
            </p>
            <p className='flex gap-2'>
              <input 
                className='w-3' 
                type="checkbox" 
                value='Kids' 
                onChange={toggleCategory} 
              /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input 
                className='w-3' 
                type="checkbox" 
                value='Topwear' 
                onChange={toggleSubCategory} 
              /> Topwear
            </p>
            <p className='flex gap-2'>
              <input 
                className='w-3' 
                type="checkbox" 
                value='Bottomwear' 
                onChange={toggleSubCategory} 
              /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input 
                className='w-3' 
                type="checkbox" 
                value='Winterwear' 
                onChange={toggleSubCategory} 
              /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='ALL' text2='COLLECTIONS' />
          {/* Product Sort */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Map Product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProduct.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
