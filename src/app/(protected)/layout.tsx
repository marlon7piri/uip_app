import NavBar from '@/components/NavBar'
import React, { Suspense } from 'react'
import Loading from './loading'
import SkeletonLoading from '@/components/SkeletonLoading'
import FollowSession from '@/components/FollowSession'

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <main className=''>
            {/* <FollowSession /> */}


            <NavBar />


            <Suspense fallback={<Loading />} >

                {children}
            </Suspense>

        </main>


    )
}

export default ProtectedLayout