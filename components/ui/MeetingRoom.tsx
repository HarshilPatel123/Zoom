import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from 'lucide-react';
import { useRouter } from 'next/router';
import EndCallButton from './EndCallButton';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const router = useRouter();

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [show, setShow] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return null; // Return null or other JSX element

  const CallLayout = () => {
    switch(layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': show})}>
          <CallParticipantsList onClose={() => setShow(false)} />
        </div>
      </div>

      <div className='fixed flex-wrap bottom-0 flex w-full items-center justify-center gap-5 '>
        <CallControls onLeave={() => router.push('/')} />

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer' onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}>
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
            <DropdownMenuSeparator className='border-dark-1' />
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
        <button onClick={() => setShow(prev => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className="text-white" />
          </div>
        </button>

        <EndCallButton /> {/* You need to import EndCallButton */}
      </div>
    </section>
  )
}

export default MeetingRoom;
