import NavBar from '@/components/NavBar'
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default layout