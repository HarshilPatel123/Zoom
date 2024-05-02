"use client"
import Loader from '@/components/ui/Loader';
import MeetingRoom from '@/components/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { useParams } from 'next/navigation';

const Meeting = () => {

  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  return (
    <main className="h-screen w-full">
      <StreamCall call={call as any}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setUpComplete={setIsSetupComplete} /> // Corrected prop name
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
