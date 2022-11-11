import React, { useState } from 'react'
import { CursorArrowRippleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';


function SignUpEmailPass() {

  const navigate = useNavigate();

  const [user, setuser] = useState({
    fname: "",
    lname: "",
    email: "",
    profession: "",
    country:"",
    phone: "",
    password: "",
    cpassword: ""
  });

  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, profession, country, phone, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, lname, email, profession,country, phone, password, cpassword
      })
    });

    const data = res.status;

    console.log(data);
    if (data === 421 || !data) {
      window.alert("Please fill all the field");
    } else if (data === 422 || !data) {
      window.alert("Email is already taken");
    } else if (data === 401 || !data) {
      window.alert("Password and confirm Password will be same");
    } else if (data === 200 || !data) {
      window.alert("Registration Successful");
      navigate("/signin");
    } else {
      window.alert("Something went wrong");
    }
  }

  const [password, setpassword] = useState(0)
  const [passwordIcon, setpasswordIcon] = useState(0)

  return (
    <>
      <div className='w-full h-full py-10 flex flex-col justify-between items-center overflow-y-scroll'>
        <div className='text-2xl'>
          Sign Up
        </div>
        <div className='w-full'>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >First Name : </div>
              <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' value={user.fname} onChange={handleInput} name="fname" />
            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >Last Name : </div>
              <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' value={user.lname} onChange={handleInput} name="lname" />
            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >Email : </div>
              <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' value={user.email} onChange={handleInput} name="email" />
            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >Profession : </div>
              <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' value={user.profession} onChange={handleInput} name="profession" />
            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >Country : </div>
              <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' value={user.country} onChange={handleInput} name="country" />
            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm' >Phone : </div>
              <input type="text" className='mt-3 w-full h-10 p-4 outline-none border border-slate-300' value={user.phone} onChange={handleInput} name="phone" />
            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm z-30' >Password : </div>
              <div className='w-full relative flex items-center'>
                <input type={password == 1 ? "text" : "password"} className='mt-3 w-full h-10 p-4 outline-none border border-slate-300 pr-10' name="password" value={user.password} onChange={handleInput} />
                {
                  passwordIcon == 0 ?
                    <EyeIcon className='h-5 absolute top-6 right-2 cursor-pointer' onClick={() => { setpasswordIcon(!passwordIcon); setpassword(!password) }} /> :
                    <EyeSlashIcon className='h-5 absolute top-6 right-2 cursor-pointer' onClick={() => { setpasswordIcon(!passwordIcon); setpassword(!password) }} />
                }
              </div>

            </div>
          </div>
          <div className='mb-10 flex flex-col items-center'>
            <div className='w-2/5 relative'>
              <div className='text-left absolute left-2 top-0 bg-white px-2 text-slate-500 text-sm z-30' >Confirm Password : </div>
              <div className='w-full relative flex items-center'>
                <input type={password == 1 ? "text" : "password"} className='mt-3 w-full h-10 p-4 outline-none border border-slate-300 pr-10' name='cpassword' value={user.cpassword} onChange={handleInput} />
                {
                  passwordIcon == 0 ?
                    <EyeIcon className='h-5 absolute top-6 right-2 cursor-pointer' onClick={() => { setpasswordIcon(!passwordIcon); setpassword(!password) }} /> :
                    <EyeSlashIcon className='h-5 absolute top-6 right-2 cursor-pointer' onClick={() => { setpasswordIcon(!passwordIcon); setpassword(!password) }} />
                }
              </div>

            </div>
          </div>
        </div>
        <div>
          <button className='bg-cyan-500 text-lg p-2 px-9 text-white' onClick={PostData}>Sign Up</button>
        </div>
      </div>
    </>
  )
}

export default SignUpEmailPass
