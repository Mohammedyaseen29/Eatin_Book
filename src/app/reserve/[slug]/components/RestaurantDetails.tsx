import React from 'react'

const RestaurantDetails = () => {
    return (
                <>
                <div>
                    <img src="https://img.freepik.com/free-photo/side-view-rice-garnish-with-fried-onion-carrot-greens-chili-pepper-table_141793-5069.jpg?size=626&ext=jpg&ga=GA1.2.432512636.1664904528&semt=ais" alt="" className="w-64 rounded" />
                </div>
                <div>
                    <h1 className="text-black font-bold ">Pukka Restaurant</h1>
                    <div className="flex space-x-2 mt-2">
                        <p className="text-gray-700 text-xs font-semibold">Thu,12,2024</p>
                        <p className="text-gray-700 text-xs  font-semibold">8.30 PM</p>
                        <p className="text-gray-700 text-xs  font-semibold">3 people</p>
                    </div>
                </div>
                </>
    )
}

export default RestaurantDetails