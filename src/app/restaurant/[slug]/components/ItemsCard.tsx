
import React from 'react'
import { menuType } from '../menu/page'


const ItemsCard = ({menu}:menuType) => {
    return (
        <div className="border rounded p-3 w-[49%] mb-3 shadow-md ">
                <h3 className="text-black font-bold text-lg">{menu.name}</h3>
                <p className="font-light mt-1 text-sm text-black">{menu.description} </p>
                <p className="mt-5 text-black">{menu.price}</p>
        </div>
    )
}

export default ItemsCard