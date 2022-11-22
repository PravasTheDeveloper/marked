import React from 'react'


import LeftSideContent from './LeftSideContent/LeftSideContent'
import MiddleSideContent from './MiddleSideContent/MiddleSideContent'
import RightSideContent from './RightSideContent/RightSideContent'


function HomePageContent({ title , data}) {
    return (
        <>
            <MiddleSideContent title={title} data={data} />
        </>
    )
}

export default HomePageContent
