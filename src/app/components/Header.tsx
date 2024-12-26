
import React from 'react'
import Searchcmp from './Searchcmp';
const Header = () => {
    return (
        <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-5">
        <div className="text-center mt-10">
        <h1 className="text-white font-bold text-2xl md:text-4xl">Find Your Table For Any Occasion</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start mt-10">
            <Searchcmp />
        </div>
    </div>
    )
}

export default Header