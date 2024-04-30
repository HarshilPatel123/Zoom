import { cn } from '@/lib/utils'
import { Call } from '@stream-io/node-sdk'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import { useRouter } from 'next/navigation'


type CallLayoutType = 'grid | "speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const search =  useSearchParams();


  const isPersonal = !!search.get('personal')
  const router = useRouter()


  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [show, setShow] = useState(false)

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return

  const CallLayout = () => {
    switch(layout) {
      case 'grid':
        return <PaginatedGridLayout/>
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left"/>
      case 'speaker-left':
          return <SpeakerLayout participantsBarPosition="right"/>
  }
}

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div>
        <CallLayout/>
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': show})}>
          <CallParticipantsList onClose={()=> setShow(false)}/>
        </div>
      </div>

        <div className='fixed flex-wrap bottom-0 flex w-full items-center justify-center gap-5 '>
          <CallControls onLeave={()=> router.push('/')}/>

          <DropdownMenu>

            <div className='flex items-center'>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                <LayoutList size={20} className='text-white'/>
              </DropdownMenuTrigger>

            </div>
            <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white0'>
              {['Grid', 'Speaker-Left', "Speaker-Right"].map((item,index)=> (
                <div key={index}>
                   <DropdownMenuItem className='cursor-pointer' onClick={()=> setLayout(item.toLowerCase() as CallLayoutType)}>
                    {item}
                   </DropdownMenuItem>
                </div>
              ))}
              <DropdownMenuSeparator className='border-dark-1' />
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton/>
          <button onClick={() => setShow((prev)=> !prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <Users size={20} className="text-white"/>
            </div>
          </button>

          {!isPersonal && <EndCallButton/>}

        </div>
    </section>
  )
}

export default MeetingRoom
function serachParams() {
  throw new Error('Function not implemented.')
}

