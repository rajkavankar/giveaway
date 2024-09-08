"use client"
import React, { useEffect, useState } from "react"

type Props = {
  expiry: Date | string
}

const Countdown = ({ expiry }: Props) => {
  const [countdown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = new Date(expiry).getTime() - new Date().getTime()
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setCountDown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [expiry])

  return (
    <div>
      {countdown.days < 10 ? "0" + countdown.days : countdown.days}:{" "}
      {countdown.hours < 10 ? "0" + countdown.hours : countdown.hours} :{" "}
      {countdown.minutes < 10 ? "0" + countdown.minutes : countdown.minutes}:{" "}
      {countdown.seconds < 10 ? "0" + countdown.seconds : countdown.seconds}
    </div>
  )
}

export default Countdown
