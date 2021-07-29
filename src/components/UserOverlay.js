import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const UserOverlay = ({ children, ...props }) => {
  return <>
    <div className='relative inline-flex justify-center'>
      <div className='relative justify-center'>
        <div id='userProfile-Image'>
          <div className='absolute rounded-full w-20 h-20' style={{ zIndex: -1 }}>
            <img
              className='rounded-full'
              src='data:image/jpeg;base64,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'
            />
          </div>
          {
            !!props?.userRating && <CircularProgressbar
              className='w-20 h-20'
              value={props?.userRating}
              strokeWidth={5}
              styles={
                buildStyles({
                  pathColor: '#009de0',
                  trailColor: '#e9e9e9'
                })
              }
            />
          }
        </div>
        <div className='flex text-xs lg:text-base justify-center pt-1'>
          <div className='inline-flex'>
            <p>Rating:</p>
            <p className='font-semibold ml-1'>{props?.userRating}</p>
          </div>
        </div>
      </div>
      <div className='block pl-4'>
        <div className='font-bold text-lg lg:text-2xl'>{props?.username}</div>
        <div className='font-medium text-sm lg:text-base'>{props?.userStatus}</div>
        <div className='font-normal text-xs py-1 lg:text-sm'>{props?.userHashTag}</div>
        <div className='font-semibold text-sm lg:text-base'>{props?.userSchedule}</div>
      </div>
    </div>
  </>
}

export default UserOverlay