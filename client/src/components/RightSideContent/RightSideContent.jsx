import { ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'

function RightSideContent({ data }) {

    return (
        <>
            <div className='h-full flex flex-col justify-between'>
                <div>

                    <div className='w-full h-14 mb-14 flex justify-center'>
                        <img src="mainimage.jpg" alt="" className='w-14 h-14 rounded-full' />
                    </div>
                    <div className='text-lg'>
                        {data.fname} {data.lname}
                    </div>

                    <div className='text-sm my-5'>
                        {data.email}
                    </div>
                    <div className='text-sm'>
                        {data.phone}
                    </div>
                    <div className='text-sm my-5'>
                        {data.profession}
                    </div>
                    <div className='text-sm my-5'>
                        {data.userName}
                    </div>
                </div>
                <div>
                    <div className='h-5 flex font-bold items-center mb-8 cursor-pointer'>
                        <Cog6ToothIcon className='h-full mr-4' /> Setting
                    </div>
                    <div className='h-5 flex font-bold items-center mb-8  cursor-pointer'>
                        <ArrowRightOnRectangleIcon className='h-full mr-4' /> Log Out
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightSideContent
