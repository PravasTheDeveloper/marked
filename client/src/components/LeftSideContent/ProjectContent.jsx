import { FolderIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import ProjectPerson from './ProjectPerson'
import ShowMembers from './ShowMembers';

function ProjectContent({ ProjectName, num, data }) {
    const navigate = useNavigate();
    const [userData, setuserData] = useState([{}]);
    const [userProjectData, setuserProjectData] = useState([{}]);

    const callAboutPage = async () => {
        try {
            const res = await fetch("/searchMembers", {
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

    const PostData = async (e) => {
        e.preventDefault();

        const res = await fetch("/addProjectMembers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectMembersName, projectMembersUname, projectName
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
    const callProjectMemPage = async () => {
        try {
            const res = await fetch("/seeProjectMembers", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data)
            setuserProjectData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {

        callAboutPage();
        // callProjectMemPage();

    }, []);
    // const [toogletab, settoogletab] = useState(1);

    const [ShowPeople, setShowPeople] = useState(false)
    const [addmemPenel, setaddmemPenel] = useState(0)
    const [projectMembersUname, setprojectMembersUname] = useState()
    const [projectMembersName, setprojectMembersName] = useState()
    const [projectName, setprojectName] = useState()

    return (
        <>
            <div className='w-full h-full relative'>
                <div className='flex items-center  mb-4' onClick={() => { setShowPeople(!ShowPeople) }}>
                        <FolderIcon className='h-5 mr-3' />{ProjectName}
                </div>
                {ShowPeople === true ? <div className='mt-4 ml-3'>

                    <ProjectPerson personName="" />

                    <div className='h-5 flex items-center text-slate-400 cursor-pointer mt-4' onClick={() => { setaddmemPenel(1) }} >
                        <PlusCircleIcon className='h-full mr-2 ' /> Add People
                    </div>

                </div> : null}



            </div>
            {addmemPenel === 1 ?
                <div className='w-screen h-screen absolute top-0 left-0 z-50 Task__Add__Bar flex justify-center items-center '>
                    <div className='w-1/2 h-1/2 bg-white rounded-md p-20 relative'>
                        <div className=' w-full h-full flex flex-col justify-around'>
                            <div className='w-full h-14'>
                                <p>Project Name</p>
                                <div className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none'>
                                    {
                                        userData.map((data, inx) => {
                                            return (
                                                <>
                                                    <div onClick={() => { setprojectMembersUname(data.userName); setprojectMembersName(`${data.fname} ${data.lname}`) }}>{data.fname} {data.lname}</div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className='w-full h-14'>
                                <p>Project Name</p>
                                <input type="text" placeholder='Marked' className='h-full w-full border-2 border-slate-200 px-5 rounded outline-none' name='projectName' onChange={(e) => { setprojectName(e.target.value) }} />
                            </div>

                            <div className='w-full h-14 bg-cyan-500 rounded hover:bg-cyan-600'>
                                <button className='w-full h-full text-lg text-white' onClick={PostData}>SUBMIT</button>
                            </div>
                        </div>
                        <div className='h-8 w-8 rounded-full text-white bg-red-500 absolute task__Bar__X__ICON cursor-pointer' onClick={() => { setaddmemPenel(0) }}>
                            <XMarkIcon />
                        </div>

                    </div>
                </div>
                : null}
        </>
    )

}

export default ProjectContent