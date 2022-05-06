import React from 'react'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from "react-redux";
import { setOrderMethod } from "redux/actions/queueAction";


const demo2 = () => {
  const dispatch = useDispatch();
  dispatch(setOrderMethod({ order_method: "dine-in" }));
  // if (typeof window !== 'undefined') {
  //   localStorage.setItem('test',JSON.stringify({test:"hi"}))
  // }
  const router = useRouter()
  return (
    <div>
      <div onClick={()=>router.push('/demo')}>Click</div>
    </div>
  )
}

export default demo2
