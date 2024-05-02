"use client"

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from './button'

const MeetingSetup = ({setUpComplete}: any ) => {

    const [isMic, setIsMic] = useState(false)
    const call = useCall(); 

    useEffect(()=> {
        if(isMic){
            call?.camera?.disable();
            call?.microphone?.disable();
        }else{
            call?.camera?.enable();
            call?.microphone?.enable();
        }
    }, [isMic, call?.camera, call?.microphone])


  return (
    <div className='flex h-screen w-full flex-col justify-center text-white items-center gap-3'>
      <h1 className='text-2xl font-bold' >
        Setup
      </h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium' >
         <input type='checkbox' checked={isMic} onChange={(e) => setIsMic(e.target.checked)}/>

         join with mic and camera off
        </label>

        <DeviceSettings/>

      </div>

      <Button className='rounded-md py-2.5 bg-green-500 px-4 '  onClick={()=> {
        call?.join();

        setUpComplete(true)
      } }>  Join Meeting

      </Button>
    </div>
  )
}

export default MeetingSetup
