"use client"
import Loader from '@/components/ui/Loader';
import MeetingRoom from '@/components/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const Meeting = ({params}: {params: {id: string}}) => {

  const {user, isLoaded} = useUser();
  const {call, isCallLoading} = useGetCallById(params.id)
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
           {!isSetUpComplete ? (
            <MeetingSetup setUp={setIsSetUpComplete}/>
           ) : (
            <MeetingRoom/>
           )}
        </StreamTheme>
      </StreamCall>

    </main>
  )
}

export default Meeting
