import { useEffect, useState } from "react"
import { isBottomWidgetRemoved } from "../utils/getLocalStorage"
import useSWR from "swr"
import { quotesFetcher } from "../utils/fetcher"

export const Timer = ({
  onRemovedQuoteWidget,
  isQuoteWidgetRemoved,
}: {
  onRemovedQuoteWidget: () => void
  isQuoteWidgetRemoved: boolean
}) => {
  const { data, isLoading, error } = useSWR("/api/quotes", quotesFetcher)
  const [time, setTime] = useState({
    hour: "00",
    minute: "00",
    ampm: "",
  })

  function generateTime() {
    const date = new Date()
    const currentTime = date.toLocaleString("en-EN", {
      hour: "2-digit",
      minute: "2-digit",
    })
    const [strTime, ampm] = currentTime.split(" ")
    const [hour, minute] = strTime.split(":")
    setTime({ hour, minute, ampm })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      generateTime()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeClass = `font-semibold tracking-tight text-[160px] ${isBottomWidgetRemoved() ? "sm:text-[300px] 2xl:text-[420px]" : "sm:text-[220px] 2xl:text-[350px]"} text-center`

  return (
    <>
      {!isQuoteWidgetRemoved && (
        <div className="w-full sm:w-3/4 mx-auto">
          <div className="flex items-center w-full rounded-[4px] p-2 border border-gray-300 gap-2">
            <div className="flex justify-center items-center w-8 h-8 flex-2 rounded-sm bg-gray-300">
              <img src="/quote.svg" className="w-4 h-4 flex-shrink-0 fill-white" alt="quote-icon" />
            </div>
            {isLoading && <p>Loading Quotes...</p>}
            {error && <p>Error loading your quotes!</p>}
            <p className="flex-1">{data}</p>
            <button
              className="relative z-10 w-8 h-8 flex justify-center items-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer dark:invert hover:invert-0"
              onClick={onRemovedQuoteWidget}
            >
              <img src="/x.svg" className="w-4 h-4" alt="close-icon" />
            </button>
          </div>
        </div>
      )}

      <button className="cursor-pointer opacity-0"></button>
      <div className="relative">
        <p className="text-lg 2xl:text-2xl text-center font-semibold">
          {new Date().toLocaleString("en-EN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h5 className="absolute right-36 2xl:right-44 text-4xl 2xl:pt-12 font-semibold">{time.ampm}</h5>
        <div className="flex justify-center gap-6 -mt-24 2xl:-mt-28">
          <div className={`flex flex-wrap gap-4 ${isBottomWidgetRemoved() ? "sm:gap-28" : "sm:gap-20"}`}>
            <h2 className={timeClass}>{time.hour}</h2>
            <h2 className={timeClass}>{time.minute}</h2>
          </div>
        </div>
      </div>
    </>
  )
}
