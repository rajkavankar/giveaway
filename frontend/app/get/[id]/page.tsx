import Countdown from "@/components/Countdown"
import ParticipantForm from "@/components/ParticipantForm"
import { axiosInstance } from "@/utils/axios"
import React from "react"

type Params = {
  params: {
    id: string
  }
}

const SingleGiveaway = async ({ params }: Params) => {
  const giveaway = await axiosInstance.get(`/giveaways/${params.id}`)

  console.log(giveaway.data)

  return (
    <div className='bg-primary min-h-screen text-center py-8 text-primary-foreground'>
      <h1 className='text-3xl'>{giveaway.data.title}</h1>

      <Countdown expiry={giveaway.data.expiry} />
      <ParticipantForm id={giveaway.data.id} />
    </div>
  )
}

export default SingleGiveaway
