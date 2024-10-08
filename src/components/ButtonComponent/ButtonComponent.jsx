import React from 'react'

const ButtonComponent = ({title, type, action}) => {

  return (
    <button className='w-full p-[8px] text-[#fff] rounded-[13px] text-x-small-size text-x-small-weight bg-[var(--red-text-color)]' onClick={()=>{action()}}>{title}</button>
  )
}

export default ButtonComponent