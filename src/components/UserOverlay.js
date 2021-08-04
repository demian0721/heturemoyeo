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
          <div className={`${props?.userRating ? 'fixed' : 'block'} rounded-full container mx-auto w-20 h-20`} style={{
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
        { props?.nickname && <div className='font-bold text-lg lg:text-2xl'>{props.nickname}</div> }
        {/* { props?.isMe && props?.name && <div className='font-semibold text-sm lg:text-base'>{props?.name}</div> } */}
        { props?.userStatusMessage &&<div className='font-medium text-sm lg:text-base'>{props.userStatusMessage }</div> }
        { props?.userLikeItem && <div className='font-normal text-xs py-1 lg:text-sm'>{props.userLikeItem.join(' ')}</div> }
        { props?.userSchedule && <div className='font-semibold text-sm lg:text-base'>{props.userSchedule}</div> }
      </div>
    </div>
  </>
}

export default UserOverlay