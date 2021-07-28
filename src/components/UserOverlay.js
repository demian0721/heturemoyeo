const UserOverlay = ({ children, ...props }) => {
  return <>
    <div className='font-bold text-lg'>{props?.username}</div>
    <div className='font-medium text-sm'>{props?.userStatus}</div>
    <div className='font-normal text-xs py-1'>{props?.userHashTag}</div>
    <div className='font-semibold text-sm'>{props?.userSchedule}</div>
  </>
}

export default UserOverlay