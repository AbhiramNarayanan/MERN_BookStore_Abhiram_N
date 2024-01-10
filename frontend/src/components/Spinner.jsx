//to show a spinner during loading state we created this , by making components folder in src inside that this file

import React from 'react'

const Spinner = () => {
  return (
    <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'>Spinner</div> //also given className for spinner
  )
}

export default Spinner