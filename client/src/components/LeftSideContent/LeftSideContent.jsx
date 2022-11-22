import React, { useEffect, useState } from 'react'
import { BriefcaseIcon, CursorArrowRippleIcon, PlusCircleIcon, SwatchIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ProjectPerson from './ProjectPerson'
import { Link, useNavigate } from 'react-router-dom'
import ProjectContent from './ProjectContent'




function LeftSideContent({ data }) {

    const navigate = useNavigate();


    const callAboutPage = async () => {
        try {
            const res = await fetch("/getPorjectAllData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            setuserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            } else if (res.status === 200) {
                navigate("/")
            }
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
    }
    const [project, setproject] = useState({
        projectName: "",
        projectType: ""
    });
    
    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setproject({ ...project, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { projectName,projectType } = project;

        const res = await fetch("/projectcreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectName , projectType  
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
            settoogletab(0)
        } else {
            window.alert("Something went wrong");
        }
    }

    useEffect(() => {

        callAboutPage();

    }, []);

    const [toogletab, settoogletab] = useState(0);
    const [userData, setuserData] = useState([{}]);

    
    return (
        <>
            <div className='w-1/6 h-full px-10 py-16 2xl:px-16 font-bold flex flex-col justify-between'>

                <div className='w-full h-full'>
                    <div className='bg-white w-full h-full'>
                        <div className='h-10 mb-10 flex items-center text-2xl border-b'>
                            <CursorArrowRippleIcon className='h-full mr-5' /> MARKED
                        </div>
                        <div className=' mb-8 cursor-pointer'>
                            <Link to="/" className='h-5 flex font-bold items-center'>
                                <SwatchIcon className='h-full mr-4' /> Today
                            </Link>
                        </div>
                        <div className='font-bold mb-8 cursor-pointer'>
                            <div className='h-5 flex font-bold items-center relative'>
                                <Link to="/project" className='h-5 flex font-bold items-center'>
                                    <BriefcaseIcon className='h-full mr-4' /> Project
                                </Link>
                                <PlusCircleIcon className='h-7 text-slate-500 ml-4' alt="Projcet" onClick={() => { settoogletab(1) }} />

                            </div>
                            {userData.projectName ?<h1 className='text-red-500 ml-10 mt-5'>No Project Present</h1>: 
                            <div className='text-black mt-4 ml-4'>
                                {
                                    userData.map((data, ind) => {
                                        return (
                                            <ProjectContent key={ind} num={ind} ProjectName={data.projectName} data={data} />
                                        )
                                    })
                                }

                            </div> }
                        </div>
                        <div className='h-5 flex font-bold items-center mb-8 cursor-pointer'>
                            <TagIcon className='h-full mr-4' /> Tags
                        </div>
                    </div>
                </div>
                {toogletab === 1 ?
                    <div className='w-screen h-screen absolute top-0 left-0 z-50 Task__Add__Bar flex justify-center items-center '>
                        <div className='w-1/2 h-1/2 bg-white rounded-md p-20 relative'>
                            <div className=' w-full h-full flex flex-col justify-around'>
                                <div className='w-full h-14'>
                                    <p>Project Name</p>
                                    <input type="text" placeholder='Marked' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='projectName' value={project.projectName} onChange={handleInput} />
                                </div>
                                <div className='w-full h-14'>
                                    <p>Project Type</p>
                                    <input type="text" placeholder='Company or Personal' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='projectType' value={project.projectType} onChange={handleInput} />
                                </div>
                                <div className='w-full h-14 bg-cyan-500 rounded hover:bg-cyan-600'>
                                    <button className='w-full h-full text-lg text-white' onClick={PostData}>SUBMIT</button>
                                </div>
                            </div>
                            <div className='h-8 w-8 rounded-full text-white bg-red-500 absolute task__Bar__X__ICON cursor-pointer' onClick={() => { settoogletab(0) }}>
                                <XMarkIcon />
                            </div>

                        </div>
                    </div>
                    : null}
            </div>
        </>
    )
}

export default LeftSideContent
