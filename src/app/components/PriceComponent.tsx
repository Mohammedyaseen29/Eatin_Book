import { Price } from '@prisma/client'
import React from 'react'

const PriceComponent = ({ price }: { price: Price }) => {
    function renderPrice() {
        if (price === Price.CHEAP) {
            return <p className="text-green-500 font-bold text-sm">$$$$$ - Cheap</p>
        } else if (price === Price.REGULAR) {
            return <p className="text-blue-500 font-bold text-sm">$$$$$ - Regular</p>
        } else {
            return <p className="text-amber-500 font-bold text-sm">$$$$$ - Expensive</p>
        }
    }

    return renderPrice();
}

export default PriceComponent;
