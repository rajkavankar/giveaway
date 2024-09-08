import UpdateGiveawayForm from "@/components/UpdateGiveawayForm"
import React from "react"

type Params = {
  params: {
    id: string
  }
}

const UpdateGiveaway = ({ params }: Params) => {
  return (
    <div>
      <UpdateGiveawayForm id={params.id} />
    </div>
  )
}

export default UpdateGiveaway
