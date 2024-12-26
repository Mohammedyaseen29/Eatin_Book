import React from 'react'

const Form = () => {
    return (
        <>
                <input type="text" placeholder="First Name" className="border p-2 text-gray-500 placeholder:text-sm focus:outline-none focus:outline-ring ring-1 ring-gray-500 rounded-full " />
                <input type="text" placeholder="Last Name" className="border p-2 text-gray-500 placeholder:text-sm focus:outline-none focus:outline-ring ring-1 ring-gray-500 rounded-full " />
                <input type="number" placeholder="Phone Number" className="border p-2 text-gray-500 placeholder:text-sm focus:outline-none focus:outline-ring ring-1 ring-gray-500 rounded-full " />
                <input type="email" placeholder="Email" className="border p-2 text-gray-500 placeholder:text-sm focus:outline-none focus:outline-ring ring-1 ring-gray-500 rounded-full " />
                <input type="text" placeholder="Occastion(Optional)" className="border p-2 text-gray-500 placeholder:text-sm focus:outline-none focus:outline-ring ring-1 ring-gray-500 rounded-full " />
                <input type="text" placeholder="Request (Optional)" className="border p-2 text-gray-500 placeholder:text-sm focus:outline-none focus:outline-ring ring-1 ring-gray-500 rounded-full " />
                
        </>
    )
}

export default Form