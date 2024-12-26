import React from 'react'
import { RestaurantType } from '../page'

interface headerProps{
    HeaderName:RestaurantType,
}

const Header = ({HeaderName}:headerProps) => {
    function renderHeader(){
    const nameArray = HeaderName.slug.split("-")
    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`
    return nameArray.join(" ")
}
    return (
        <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-5">
            <div className="flex justify-center mt-10">
            <h1 className="text-white font-bold text-2xl md:text-4xl capitalize">{renderHeader()}</h1>
            </div>
        </div>
    )
}

export default Header