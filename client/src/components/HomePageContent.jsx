import React from 'react'


import LeftSideContent from './LeftSideContent/LeftSideContent'
import MiddleSideContent from './MiddleSideContent/MiddleSideContent'
import RightSideContent from './RightSideContent/RightSideContent'


function HomePageContent({ title }) {
    return (
        <>
            <MiddleSideContent title={title} />
        </>
    )
}

export default HomePageContent
