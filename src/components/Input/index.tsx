import React from 'react'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?:string
errorText?: string
}
const Input:React.FC<InputProps> = ({label,errorText,...rest}) => {
  return (
    <div className='flex flex-col gap-1'>
        <label htmlFor={rest.id} className='text-xs font-medium'>{label}</label>
        <input className='bg-gray-100 rounded-lg outline-none px-3 py-1 text-xs text-gray-950 font-medium' {...rest}/>
        <span className='block h-3 text-[10px] text-red-800 font-semibold'>{errorText}</span>
    </div>
  )
}

export default Input