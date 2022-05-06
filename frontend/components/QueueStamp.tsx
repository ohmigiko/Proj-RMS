import React from 'react'
import { useSelector } from 'react-redux'

const QueueStamp = ({queue_group,queue_num,handleQueueStampClick}) => {
  const {order_method} = useSelector(state => state.current_queue)

  return (
    <div
      className={"grid justify-items-center content-center bg-red-500 w-10 h-10 rounded-full text-white " + (order_method==='dine-in' ? 'z-10' : 'z-[-10]')}
      onClick={handleQueueStampClick}
    >
      <div className="text-sm">
        {queue_group}
        {queue_num}
      </div>
    </div>
  )
}

export default QueueStamp
