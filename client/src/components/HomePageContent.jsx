import React from 'react'


import LeftSideContent from './LeftSideContent/LeftSideContent'
import MiddleSideContent from './MiddleSideContent/MiddleSideContent'
import RightSideContent from './RightSideContent/RightSideContent'


function HomePageContent({title}) {
    return (
        <>
            <div>
                <div className='flex h-screen'>

                    {/* Left Side Div */}

                    <LeftSideContent />

                    {/* Mid Side Div */}

                    <div className='flex-1 h-full'>
                        <MiddleSideContent title={title} />
                    </div>

                    {/* Right Side Div */}

                    <div className='w-1/6 h-full px-10 py-16 2xl:px-16 '>
                        <RightSideContent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePageContent
