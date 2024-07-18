import React from 'react'


interface IAuthLayout{
    children: React.ReactNode
}
const AuthLayout:React.FC<IAuthLayout> = ({children}) => {
  return (
    <section className='flex h-full w-full'>
        <div className='bg-blue-950 w-1/2 h-full'></div>
        {children}
    </section>
  )
}

export default AuthLayout