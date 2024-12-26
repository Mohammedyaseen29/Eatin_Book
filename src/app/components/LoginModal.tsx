    "use client"
    import {useState,useEffect,useContext} from 'react';
    import Box from '@mui/material/Box';
    import Button from '@mui/material/Button';
    import Typography from '@mui/material/Typography';
    import restaurantIcon from "../../../public/icons/icons8-restaurant-64.png"
    import Modal from '@mui/material/Modal';
    import useAuth from '../../../hooks/useAuth';
    import { AuthenticationContext } from '../../../context/AuthContext';
    import { Alert } from '@mui/material';
    import Image from 'next/image';
    

    const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    };

    export default function LoginModal({isSignin}:{isSignin:boolean}) {
    const {loading,error,SetAuthState} = useContext(AuthenticationContext)
    const [open, setOpen] = useState(false);
    const [input,setInput] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        city:"",
        password:"",
    })
    const [Disabled,setDisabled] = useState(true);
    useEffect(()=>{
        if(isSignin){
            if(input.email && input.password){
                return setDisabled(false)
            }
            return setDisabled(true)
        }
        else{
            if(input.firstName && input.lastName && input.email && input.password && input.phone && input.city){
                return setDisabled(false)
            }
            return setDisabled(true)
        }
    },[input])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const signinStyle = "bg-blue-500 text-white rounded px-2 py-1 md:py-2 font-semibold"
    const signupStyle = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 md:py-2 border border-blue-500 hover:border-transparent rounded"
    const {signin,signup} = useAuth()
    function handleInput(e:React.ChangeEvent<HTMLInputElement>){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    function handleClick(){
        if(isSignin){
            signin({email:input.email,password:input.password},handleClose)
        }else{
            signup({email:input.email,password:input.password,first_name:input.firstName,last_name:input.lastName,phone:input.phone,city:input.city},handleClose)
        }
    }
    return (
        <div>
        <button className={isSignin ? signinStyle : signupStyle} onClick={handleOpen}>{isSignin ? "SignIn" : "Signup"}</button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            {loading ? (
                    <div className='flex items-center justify-center'>
                        <Image src={restaurantIcon} className='w-10 h-10 animate-bounce' alt="Restaurant Icon"/>
                    </div>
            ) :  (<div>
                    {error ? (<Alert className='mb-5' severity="error">{error}</Alert>) : null}
                    <div className='text-center border-b border-gray-200 pb-2 text-red-500 font-semibold'>{isSignin ? "Sign In" : "Create an Account"}</div>
                    <h2 className='text-center font-bold text-black text-xl mb-2 mt-2'>{isSignin ? "Login Into Your Account" : "Create an Account in EatinBook"}</h2>
                    <div className="mt-5">
                        {isSignin ? null :(
                            <div className="flex mb-4">
                            <input type="text" placeholder='First Name' className='mr-2 w-[49%] p-2 border rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black' value={input.firstName} onChange={handleInput} name='firstName'/>
                            <input type="text" placeholder='Last Name' className='w-[49%] p-2 border rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  text-black' value={input.lastName} onChange={handleInput} name='lastName'/>
                        </div>
                        )}
                        <input type="email" placeholder='Email' className='w-full p-2 mb-4 border rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black' value={input.email} onChange={handleInput} name='email'/>
                        {isSignin ? null : (
                            <div className="flex mb-4">
                            <input type="number" placeholder='Phone' className='mr-2 w-[49%] p-2 border rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black' value={input.phone} onChange={handleInput} name='phone'/>
                            <input type="text" placeholder='City' className='w-[49%] p-2 border rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  text-black' value={input.city} onChange={handleInput} name='city'/>
                        </div>
                        )}
                        <input type="password" placeholder='Password' className='w-full p-2 border rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black' value={input.password} onChange={handleInput} name='password'/>
                    </div>
                    <button className='bg-red-500 text-white font-bold w-full mt-5 p-2 rounded hover:scale-95 disabled:bg-gray-400' disabled={Disabled} onClick={handleClick}>{isSignin?"Sign In":"Sign Up"}</button>
                </div>)}
            </Box>
        </Modal>
        </div>
    );
    }