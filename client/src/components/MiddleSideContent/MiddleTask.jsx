import React, { useState } from 'react'
import { ArrowDownIcon, CheckIcon, ChevronDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { BookmarkIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

function MiddleTask({ id, title, subtitle, content, cDate, done, lastDate, taskChatagory }) {

    const [showContent, setshowContent] = useState(0)

    const callAboutPage = async (id) => {
        try {
            const res = await fetch("/dailytaskdone", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            });

            const newdata = await res.json();

        } catch (err) {
            console.log(err);

        }
    }

    const callAboutDelete = async (id) => {
        try {
            const res = await fetch("/dailytaskdelete", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            });

            const newdata = await res.json();

        } catch (err) {
            console.log(err);

        }
    }



    return (
        <>
            <div className={showContent == 1 ? 'bg-white w-full shadow-xl rounded-lg mb-10' : 'bg-white w-full h-20 shadow-xl rounded-lg mb-10'}>


                <div className='h-20 flex items-center px-10 border-b-2 cursor-pointer transition-all duration-1000' >
                    <div className='w-full h-full flex items-center' onClick={() => { setshowContent(!showContent) }}>
                        <div className='h-6 ' >

                            {done == false ?
                                <PencilSquareIcon className='h-full' /> :
                                <PencilSquareIcon className='h-full text-green-500' />
                            }
                        </div>
                        <div className='flex-1 flex justify-around'>
                            <h1>{taskChatagory}</h1>
                            {done == false ?
                                <p>Last Date : {lastDate}</p> :
                                <p className='font-bold text-green-500'>DONE</p>
                            }
                        </div>
                        <div className='h-8 flex items-center'>
                            <ChevronDownIcon className='h-full' />
                        </div>
                    </div>
                    <div className='h-8 ml-5 bg-rose-500 p-2 rounded-md cursor-pointer mr-5' onClick={() => { callAboutDelete(id);}}>
                        <TrashIcon className='h-full' />
                    </div>
                    {done == false ? <div className='h-8 w-8 top-2 right-20 bg-teal-500 p-1 rounded-md cursor-pointer flex justify-center' onClick={() => { callAboutPage(id) }}>
                        <CheckIcon className='h-full' />
                    </div> : null}
                </div>
                <div className={showContent == 1 ? `w-full  bg-white shadow-lg rounded-b-lg p-10 relative` : `hidden`}>
                    <div className='flex items-center'>
                        <div className='h-6 mr-6'>
                            {done == true ? <BookmarkIcon className='h-full text-green-500' /> : <BookmarkIcon className='h-full text-cyan-500' />}
                        </div>
                        <h1 className='text-xl'>
                            {title}
                        </h1>
                    </div>
                    <div className='ml-10'>
                        <div className='flex items-center mt-6'>
                            <div className='h-6 mr-3 flex items-center'>
                                <div className='bg-slate-500 w-2 h-2 rounded-full'></div>
                            </div>
                            <h1 className='text-md text-slate-500'>
                                {subtitle}
                            </h1>
                        </div>
                        <div className='mt-6 text-slate-700'>
                            <p>{content}</p>
                        </div>
                    </div>
                    

                </div>


            </div>

        </>
    )
}

export default MiddleTask
