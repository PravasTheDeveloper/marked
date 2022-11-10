import React, { useState } from 'react'
import { ArrowDownIcon, CheckIcon, ChevronDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { BookmarkIcon } from '@heroicons/react/24/solid'

function MiddleTask() {

    const [showContent, setshowContent] = useState(0)

    return (
        <>
            <div className={showContent == 1 ? 'bg-white w-full shadow-xl rounded-lg mb-10' : 'bg-white w-full h-20 shadow-xl rounded-lg mb-10'}>

                <div className='h-20 flex items-center px-10 border-b-2 cursor-pointer' onClick={() => { setshowContent(!showContent) }}>
                    <div className='h-6 '>
                        <PencilSquareIcon className='h-full' />
                    </div>
                    <div className='flex-1 px-20'>
                        <h1>Compititive Programming</h1>
                    </div>
                    <div className='h-8 flex items-center'>
                        <div className='h-full flex mr-5 text-black'>
                            <div className='h-full bg-rose-500 p-2 rounded-md cursor-pointer mr-5' onClick={() => setshowContent(1)}>
                                <TrashIcon className='h-full' />
                            </div>

                        </div>
                        <ChevronDownIcon className='h-full' />
                    </div>
                </div>
                <div className={showContent == 1 ? `w-full bg-white shadow-lg rounded-b-lg p-10 relative` : `hidden`}>
                    <div className='flex items-center'>
                        <div className='h-6 mr-6'>
                            <BookmarkIcon className='h-full text-lime-500' />
                        </div>
                        <h1 className='text-xl'>
                            Krushkal's Algorithm
                        </h1>
                    </div>
                    <div className='ml-10'>
                        <div className='flex items-center mt-6'>
                            <div className='h-6 mr-3 flex items-center'>
                                <div className='bg-slate-500 w-2 h-2 rounded-full'></div>
                            </div>
                            <h1 className='text-md text-slate-500'>
                                Algorithm
                            </h1>
                        </div>
                        <div className='mt-6 text-slate-700'>
                            <p>Have to finish Krushkal's Algorithm. Because for improvement the logic building</p>
                        </div>
                    </div>
                    <div className='h-10 w-20 absolute top-2 right-20 bg-teal-500 p-2 rounded-md cursor-pointer flex justify-center'>
                        <CheckIcon className='h-full' />
                    </div>

                </div>


            </div>
        </>
    )
}

export default MiddleTask
