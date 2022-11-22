import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectBar({ data }) {
    var today = new Date()
    const cDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const navigate = useNavigate();

    const [user, setuser] = useState({
        userName: "",
        taskChatagory: "",
        titile: "",
        subtitle: "",
        content: "",
        lastDate: "",
        worklink: "",
        cDate: ""
    });

    user.userName = data.userName;
    user.cDate = cDate;

    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { userName, taskChatagory, titile, subtitle, content, lastDate, worklink, cDate } = user;

        const res = await fetch("/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, taskChatagory, titile, subtitle, content, worklink, lastDate, cDate
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
        } else {
            window.alert("Something went wrong");
        }
    }

    return (
        <>
            <div className=' w-full h-full flex flex-col justify-around'>
                <div>
                    <select name="" id="">
                        <option value="">Project Name</option>
                    </select>
                    <select name="" id="">
                        <option value="">Project User</option>
                    </select>
                </div>
                
                <div className='w-full h-14'>
                    <input type="text" placeholder='Title' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='titile' value={user.titile} onChange={handleInput} />
                </div>
                <div className='w-full h-14'>
                    <input type="text" placeholder='Sub Title' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='taskChatagory' value={user.taskChatagory} onChange={handleInput} />
                </div>
                <div className='w-full h-14'>
                    <input type="text" placeholder='Heading' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='subtitle' value={user.subtitle} onChange={handleInput} />
                </div>
                <div className='w-full h-14'>
                    <input type="text" placeholder='Content' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='content' value={user.content} onChange={handleInput} />
                </div>

                <div className='w-full h-14'>
                    <input type="text" placeholder='Work Link' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='worklink' value={user.worklink} onChange={handleInput} />
                </div>
                <div className='w-full h-14'>
                    <input type="date" placeholder='Last Date' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='lastDate' value={user.lastDate} onChange={handleInput} />
                </div>
                <div className='w-full h-14 bg-cyan-500 rounded hover:bg-cyan-600'>
                    <button className='w-full h-full text-lg text-white' onClick={PostData}>SUBMIT</button>
                </div>
            </div>
        </>
    )
}



export default ProjectBar