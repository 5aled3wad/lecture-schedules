import { format } from "date-fns"
import { useEffect, useState } from "react"



export const useTime = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const sc = +format(time, 's')
    const waiting = (60 - sc) * 1000
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [time])
  return time
}