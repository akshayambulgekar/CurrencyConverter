import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { HiArrowsRightLeft } from "react-icons/hi2";
const CurrencyConverter = () => {


    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setfromCurrency] = useState('USD')
    const [toCurrency, settoCurrency] = useState('INR')
    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting,setConverting] = useState(false) 
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || ["INR","EUR"] );
    //currencies=> 'https://api.frankfurter.app/currencies'
    //currencies=> 'https://api.frankfurter.app/latest?amount=10&from=usd&to=inr'


    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies");
            const data = await res.json();

            setCurrencies(Object.keys(data));


        } catch (error) {

            console.log("Failed to fetch currencies", error)
        }
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const convertCurrency = async () => { 
        if(!amount) return

        setConverting(true);

        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json();

            setConvertedAmount(data.rates[toCurrency]+ " " + toCurrency);


        } catch (error) {

            console.log("Failed to fetch currencies", error)
        }
        finally{
            (setConverting(false))
        }

    }

    const handlefavorite = (currency) => { 
        let updateFavorites = [...favorites];

        if (favorites.includes(currency)){
            updateFavorites = updateFavorites.filter(f => f!== currency);
        }else {
            updateFavorites.push(currency);
        }
        setFavorites(updateFavorites);
        localStorage.setItem('favorites', JSON.stringify(updateFavorites)); // save to local storage
        // add to favorite list
    }

    const swapCurrencies = () => {
        setfromCurrency(toCurrency);
        settoCurrency(fromCurrency);
    }

    console.log(currencies)
    return (
        <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
            <h2 className='mb-5 text-2xl font-semibold text-gray-700'>CurrencyConverter</h2>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
                <Dropdown currencies={currencies} title={'From:'} handlefavorite={handlefavorite} currency={fromCurrency} setCurrency={setfromCurrency} favorites={favorites}/>
                <div className='flex justify-center -mb-5 sm:mb-2'>
                    <button onClick={swapCurrencies}className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                        <HiArrowsRightLeft className='text-xl text-gray-700'/>

                    </button>
                </div>
                <Dropdown currencies={currencies} title={'To:'} handlefavorite={handlefavorite} currency={toCurrency} setCurrency={settoCurrency} favorites={favorites}/>
            </div>

            <div className='mt-4'>

                <label htmlFor="amount" className='block text-sm text-gray-700'>
                    Amount:
                </label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)}
                    type="number" className='w-full p-2 border text-gray-300 rounded-b-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1' />
            </div>
            <div className='flex justify-end mt-6'>
                <button onClick={convertCurrency} className={`px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-pulse": ''}`}>Convert</button>
            </div>
{convertedAmount && ( 
            <div className='mt-4 p-2 text-lg font-medium text-right text-green-400'>
                Converted Amount : {convertedAmount}
            </div>

)}
        </div>

    )
}

export default CurrencyConverter