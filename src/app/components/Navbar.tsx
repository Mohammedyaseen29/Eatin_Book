"use client"
import Link from 'next/link'
import React from 'react'
import LoginModal from './LoginModal'
import { useContext } from 'react'
import { AuthenticationContext } from '../../../context/AuthContext';
import useAuth from '../../../hooks/useAuth'


const Navbar = () => {
    const {data,loading} = useContext(AuthenticationContext)
    const {signOut} = useAuth()
    return (
        <nav className="bg-white flex justify-between p-2">
        <Link href="/" className="font-bold text-black text-xl md:text-2xl cursor-pointer">Eatin<span className='font-bold text-red-500 text-xl md:text-2xl'>Book</span></Link>
        {loading ? null : (
            <div className="flex gap-4">
            {data ? <button className='bg-blue-500 text-white rounded px-2 py-1 md:py-2 font-semibold cursor-pointer hover:scale-95' onClick={signOut}>Sign out</button> : (
                <>
                <LoginModal isSignin={true} />
                <LoginModal isSignin={false}/>
                </>
            )}
            </div>
        )}
        </nav>
    )
}

export default Navbar