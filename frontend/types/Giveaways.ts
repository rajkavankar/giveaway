export type GiveawayType = {
  id: string
  title: string
  isActive: boolean
  expiry: string | Date
  createdAt: string | Date
  updatedAt: string | Date
  participants: ParticipantType[]
}

export type ParticipantType = {
  name: string
  email: string
}
