import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const rowRatingColor = (rating) => {
  if (rating <= 30) return '#e00000'
  else return '#009de0'
}

const UserOverlay = ({ children, ...props }) => {
  return <>
    <div className='relative inline-flex justify-center'>
      {
        props?.profileImage && <div className='relative justify-center'>
        <div id='userProfile-Image'>
          <div className='fixed rounded-full container mx-auto w-20 h-20' style={{
            zIndex: -1,
            textAlign: 'center',
            backgroundImage: `url('${props.profileImage}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            float: 'center'
          }}>
            <span className='sr-only'>profile image</span>
          </div>
          {
            props?.userRating && <CircularProgressbar
              className='w-20 h-20'
              value={props?.userRating}
              strokeWidth={5}
              styles={
                buildStyles({
                  pathColor: rowRatingColor(props.userRating),
                  trailColor: '#e9e9e9'
                })
              }
            />
          }
        </div>
        {
          props?.userRating && <div className='flex text-xs lg:text-base justify-center pt-1'>
          <div className='inline-flex'>
            <p>Rating:</p>
            <p className='font-semibold ml-1'>{props?.userRating}</p>
          </div>
        </div>
        }
      </div>
      }
      <div className='block pl-4'>
        { props?.username && <div className='font-bold text-lg lg:text-2xl'>{props.username}</div> }
        { props?.userStatus &&<div className='font-medium text-sm lg:text-base'>{props.userStatus}</div> }
        { props?.userHashTag && <div className='font-normal text-xs py-1 lg:text-sm'>{props.userHashTag.join(' ')}</div> }
        { props?.userSchedule && <div className='font-semibold text-sm lg:text-base'>{props.userSchedule}</div> }
      </div>
    </div>
  </>
}

export default UserOverlay