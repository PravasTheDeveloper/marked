import React from 'react'


import LeftSideContent from './LeftSideContent/LeftSideContent'
import MiddleSideContent from './MiddleSideContent/MiddleSideContent'
import RightSideContent from './RightSideContent/RightSideContent'


function HomePageContent() {
    return (
        <>
            <div>
                <div className='flex h-screen'>

                    {/* Left Side Div */}

                    <LeftSideContent />

                    {/* Mid Side Div */}

                    <div className='flex-1 h-full'>
                        <MiddleSideContent />
                    </div>

                    {/* Right Side Div */}

                    <div className='w-1/6 h-full p-16'>
                        <RightSideContent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePageContent
