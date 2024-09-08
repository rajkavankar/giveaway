"use client"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  id: string
}

const GiveAwayBtn = ({ id }: Props) => {
  return (
    <div className='space-x-3'>
      <Button className='bg-blue-700' asChild>
        <Link href={`/update/${id}`}>Update</Link>
      </Button>
      <Button className='bg-red-700'>delete</Button>
      <Button className='bg-teal-700' asChild>
        <Link href={`/get/${id}`}>view</Link>
      </Button>
    </div>
  )
}

export default GiveAwayBtn
