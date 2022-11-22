import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MiddleTask from './MiddleTask'
import ProjectBar from './ProjectBar';
import TaskBar from './TaskBar';

function MiddleSideContent({ title, data }) {
  // const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname)
  const [userData, setuserData] = useState([{}]);

  // const Data="";
  const callAboutPage = async () => {
    try {
      const res = await fetch("/gettaskdata", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      });

      const newdata = await res.json();
      // Data = newdata;
      // console.log(newdata[0].titile)
      setuserData(newdata);

      // if (!res.status === 200) {
      //   const error = new Error(res.error);
      //   throw error;
      // } else if (res.status === 200) {
      //   // navigate("/")
      // }
    } catch (err) {
      console.log(err);
      //navigate("/signin");
    }
  }



  const [toogletab, settoogletab] = useState(1);
  const [showTaskBar, setshowTaskBar] = useState(0)
  const [taskbar, settaskbar] = useState(0)

  useEffect(() => {

    callAboutPage();

  }, [callAboutPage]);
  // console.log(userData[0])
  return (
    <>
      <div className='bg-slate-100 p-16 h-full relative'>
        <div>
          <h1 className='text-2xl mb-10 uppercase'>{title}</h1>
        </div>
        <div className='h-full overflow-scroll overflow-x-hidden'>
          {
            userData.map((dt) => {
              return (
                <MiddleTask
                  id={dt._id}
                  title={dt.titile}
                  subtitle={dt.subtitle}
                  content={dt.content}
                  cDate={dt.cDate}
                  done={dt.done}
                  lastDate={dt.lastDate}
                  taskChatagory={dt.taskChatagory}
                />
              )
            })
          }

        </div>

        <div className='h-10 w-10 bg-cyan-500 absolute top-16 right-16 rounded-full hover:bg-cyan-700 cursor-pointer' onClick={() => { settaskbar(1) }}>
          <PlusIcon className='text-white' />
        </div>

      </div>
      {taskbar == 1 ?
        <>

          <div className='h-screen top-0 left-0 w-screen absolute flex justify-center items-center Task__Add__Ba'>
            <div className='h-screen w-screen absolute top-0 left-0 Task__Add__Bar' onClick={() => { settaskbar(0) }}>

            </div>
            <div className='h-4/5 w-2/3 bg-white rounded relative'>
              <div className='w-full absolute Task__Bar__Uper__Content left-2 flex'>
                <div className={showTaskBar==0?'bg-cyan-300 h-12 w-40 flex justify-center items-center rounded border-b border-slate-300 mr-4 cursor-pointer':'bg-white h-12 w-40 flex justify-center items-center rounded border-b border-slate-300 mr-4 cursor-pointer'} onClick={()=>{setshowTaskBar(0)}}>
                  Daily Task
                </div>
                <div className={showTaskBar==1?'bg-cyan-300 h-12 w-40 flex justify-center items-center rounded border-b border-slate-300 mr-4 cursor-pointer':'bg-white h-12 w-40 flex justify-center items-center rounded border-b border-slate-300 mr-4 cursor-pointer'} onClick={()=>{setshowTaskBar(1)}}>
                  Project
                </div>
              </div>
              <div className='h-8 w-8 rounded-full text-white bg-red-500 absolute task__Bar__X__ICON cursor-pointer' onClick={() => { settaskbar(0) }}>
                <XMarkIcon />
              </div>

              {/* Content Here */}

              <div className='w-full h-full p-20'>
                {showTaskBar == 0 ? <TaskBar data={data} /> : showTaskBar == 1 ? <ProjectBar data={data} /> : null}
              </div>
            </div>
          </div>

        </> : null
      }
    </>
  )
}

export default MiddleSideContent