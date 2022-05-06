import React from 'react'

const CircleButton = ({ optClassName, handleClick, icon }) => {
  return (
    <div
      className={
        "flex items-center justify-center h-14 w-14 rounded-full shadow-xl py-4 text-lg " +
        optClassName
      }
      onClick={handleClick}
    >
      {icon}
    </div>
  )
}

export default CircleButton
