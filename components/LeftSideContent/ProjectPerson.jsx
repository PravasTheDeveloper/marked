import React from 'react'

import { UserIcon } from '@heroicons/react/24/outline'


function ProjectPerson({personName}) {
    return (
        <>
            <div className='h-5 flex items-center mb-6 cursor-pointer' >
                <UserIcon className='h-full mr-2 text-pink-600' /> {personName}
            </div>
        </>
    )
}

export default ProjectPerson
