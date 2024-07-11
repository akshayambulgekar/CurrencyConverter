import React from 'react'
import { HiOutlineStar, HiStar } from "react-icons/hi";
const Dropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handlefavorite,
    title = ""
}) => {

    const isFavorite = curr => favorites.includes(curr);
    return (
        <div >
            <label htmlFor='{title}' className='block text-sm text-gray-700'>{title}</label>
            <div className='mt-1 relative'>
                <select name="" id="" value={currency} onChange={(e) => (setCurrency(e.target.value))} className='w-full p-2  border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    {favorites.map((currency) =>{
                         return (
                            <option className='bg-gray-200' key={currency} value={currency}>{currency}</option>
        
                            );
                    })}
                    {currencies.
                    filter(c=> !favorites.includes(c)).map((currency) =>{
                    return (
                    <option key={currency} value={currency}>{currency}</option>

                    );
                })}
                </select>
                <button 
                onClick={() => handlefavorite(currency)}
                className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'>
                    {isFavorite(currency)? <HiStar/>:  <HiOutlineStar />}
                    
                   </button>
            </div>
        </div>
    )
}

export default Dropdown