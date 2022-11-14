import { CursorArrowRippleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'

function SignIn() {

    const navigate = useNavigate();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin" , {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email ,password
            })

        })

        const data = res.status;

        if(data === 400 || !data)
        {
            window.alert("Login Invalid");
        }else{
            window.alert("Login Successfull");
            navigate("/");
        }
    }


    const [cpassword, setcpassword] = useState(0)
    const [passwordIcon, setpasswordIcon] = useState(0)
    
    return (
        <>
            <div className='flex items-center justify-center h-screen bg-slate-200'>
                <div className='w-1/2 shadow-2xl h-2/3 flex mx-auto'>
                    <div className='w-1/3 h-full bg-cyan-600 text-3xl text-white text-center flex flex-col justify-center items-center'>
                        <CursorArrowRippleIcon className='w-1/2 mr-5 text-white mb-8' /> MARKED
                    </div>
                    <div className='flex-1 h-full w-full bg-white flex items-center'>
                        <div className='w-full h-1/2 flex flex-col justify-between items-center'>
                            <div className='text-2xl'>
                                LOGIN
                            </div>
                            <div className='w-full'>
                                <div className='mb-10 flex flex-col items-center'>
                                    <div className='w-2/5 relative'>
                                        <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >Email : </div>
                                        <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' name="email" value={email} onChange={(e)=>setemail(e.target.value)} />
                                    </div>
                                </div>
                                <div className='mb-10 flex flex-col items-center'>
                                    <div className='w-2/5 relative'>
                                        <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm z-30' >Password : </div>
                                        <div className='w-full relative flex items-center'>
                                            <input type={cpassword == 1?"text":"password"} className='mt-3 w-full h-10 p-4 outline-none border border-slate-300 pr-10' name="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
                                            {
                                                passwordIcon == 0?
                                                <EyeIcon className='h-5 absolute top-6 right-2 cursor-pointer' onClick={() => { setpasswordIcon(!passwordIcon);setcpassword(!cpassword) }} />:
                                                <EyeSlashIcon className='h-5 absolute top-6 right-2 cursor-pointer' onClick={() => { setpasswordIcon(!passwordIcon);setcpassword(!cpassword) }} />
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-cyan-500 text-lg p-2 px-9 text-white' onClick={loginUser}>Log In</button>
                            </div>
                            <div>
                                <div className='bg-slate-100 shadow-xl text-lg p-2 px-9 text-black mt-10 flex cursor-pointer'>
                                    <img src='googlepng.png' className='w-8 mr-8' /> Google
                                </div>
                                <div className='mt-5'>
                                    Don't have accout ? <Link to="/signup" className='text-cyan-600' > Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignIn
