import React from 'react';
import {Circles} from 'react-loader-spinner';

const Spinner = (props) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Circles 
        type='Circles'
        color='#00BFF'
        height={50}
        width={200}
        className='m-5'
      />

        <p className='text-lg text-center px-2'>
            {props.message}
        </p>

    </div>
  )
}

export default Spinner
