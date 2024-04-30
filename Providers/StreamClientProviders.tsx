"use client"

import { ReactNode, useEffect, useState } from 'react';
import { tokenProvider } from '@/Actions/stream.actions';
import { useUser } from '@clerk/nextjs';
import {
 
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader';

const apiKey = process.env.
NEXT_PUBLIC_STREAM_API_KEY;

 const StreamProvider = ({ children }: { children: ReactNode }) => {

    const [videoClient, setvideoClient] = useState<StreamVideoClient>()
    const {user, isLoaded} = useUser()


   useEffect(()=> {
   if(!isLoaded || !user) return;
   if(!apiKey) throw new Error('Stream Api Key Missing!!!')

    const client = new StreamVideoClient({
        apiKey,
        user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl
        },
        tokenProvider,
    })

    setvideoClient(client)


    }, [user, isLoaded])

    if(!videoClient) {

        return <Loader/>

    }

    return (

    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};


export default StreamProvider
