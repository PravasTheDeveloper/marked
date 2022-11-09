import React from 'react'
import MiddleTask from './MiddleTask'

function MiddleSideContent() {
  return (
    <>
        <div className='bg-slate-100 p-16 h-full overflow-scroll overflow-x-hidden'>
            <div>
                <h1 className='text-2xl mb-10 uppercase'>Project</h1>
            </div>
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
           <MiddleTask />
        </div>
    </>
  )
}

export default MiddleSideContent
