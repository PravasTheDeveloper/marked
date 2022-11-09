import React from 'react'
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, CursorArrowRippleIcon, FolderIcon, PencilSquareIcon, PlusCircleIcon, SwatchIcon, TagIcon } from '@heroicons/react/24/outline'
import ProjectPerson from './ProjectPerson'



function LeftSideContent() {
    return (
        <>
            <div className='w-1/6 h-full p-16 font-bold flex flex-col justify-between'>

                <div className='w-full h-full'>
                    <div className='bg-white w-full h-full'>
                        <div className='h-10 mb-10 flex items-center text-2xl border-b'>
                            <CursorArrowRippleIcon className='h-full mr-5' /> MARKED
                        </div>
                        <div className='h-5 flex font-bold items-center mb-8 cursor-pointer'>
                            <SwatchIcon className='h-full mr-4' /> Today
                        </div>
                        <div className='font-bold mb-8 cursor-pointer'>
                            <div className='h-5 flex font-bold items-center'>
                                <FolderIcon className='h-full mr-4' /> Project
                            </div>
                            <div className='text-black mt-4 ml-8'>
                                <ProjectPerson personName="Pravas" />
                                <ProjectPerson personName="Asiqul" />
                                <ProjectPerson personName="Shah Aman" />
                                <div className='h-5 flex items-center text-slate-400 cursor-pointer' >
                                    <PlusCircleIcon className='h-full mr-2 ' /> Add More
                                </div>
                            </div>
                        </div>
                        <div className='h-5 flex font-bold items-center mb-8 cursor-pointer'>
                            <TagIcon className='h-full mr-4' /> Tags
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='h-5 flex font-bold items-center mb-8 cursor-pointer'>
                            <Cog6ToothIcon className='h-full mr-4' /> Setting
                        </div>
                        <div className='h-5 flex font-bold items-center mb-8  cursor-pointer'>
                            <ArrowRightOnRectangleIcon className='h-full mr-4' /> Log Out
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default LeftSideContent
