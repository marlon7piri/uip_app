import NavBar from '@/components/NavBar'
import React, { Suspense } from 'react'
import Loading from './loading'
import SkeletonLoading from '@/components/SkeletonLoading'

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <main>

          
          <NavBar />
          

            <Suspense fallback={<Loading />} >
                {children}
            </Suspense>

        </main>


    )
}

export default ProtectedLayout