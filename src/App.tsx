import { useState } from "react"
import { Timer } from "./components/Timer"
import { STORAGE_KEY } from "./constants/storage"
import { ResetButton } from "./components/ResetButton"
import { getLocalStorage } from "./utils/getLocalStorage"
import useSWR from "swr"
import { holidaysFetcher, prayerFetcher } from "./utils/fetcher"
import { hourFormat } from "./utils/hourFormat"

function App() {
  const storage = getLocalStorage()
  const { isLoading, error, data: holidays } = useSWR("/api/holiday", holidaysFetcher)
  const { isLoading: isLoadingPrayTime, error: errorPrayTime, data: prayTime } = useSWR("/api/prayer", prayerFetcher)
  const [isHolidayWidgetRemoved, setIsHolidayWidgetRemoved] = useState(storage ? storage.holiday : false)
  const [isPrayTimeWidgetRemoved, setIsPrayTimeWidgetRemoved] = useState(storage ? storage.prayTime : false)
  const [isQuoteWidgetRemoved, setIsQuoteWidgetRemoved] = useState(storage ? storage.quote : false)
  const day = new Date().getDate()

  function handleRemovedWidget(
    key: "holiday" | "prayTime" | "quote",
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    const data = storage
      ? {
          ...storage,
          [key]: true,
        }
      : {
          [key]: true,
        }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setState(true)
  }

  function onReset() {
    localStorage.removeItem(STORAGE_KEY)
    setIsQuoteWidgetRemoved(false)
    setIsHolidayWidgetRemoved(false)
    setIsPrayTimeWidgetRemoved(false)
  }

  return (
    <div className="px-6 py-4 sm:px-28 w-full h-screen">
      <Timer
        onRemovedQuoteWidget={() => handleRemovedWidget("quote", setIsQuoteWidgetRemoved)}
        isQuoteWidgetRemoved={isQuoteWidgetRemoved}
      />
      <div className="flex flex-wrap gap-6 justify-center -mt-16 mb-4">
        {!isHolidayWidgetRemoved && (
          <div className="w-full sm:w-[36%] border border-gray-300 dark:bg-transparent rounded-md px-6 py-4">
            <div className="flex justify-between">
              <h3 className="font-semibold mb-3">
                {new Date().toLocaleString("en-EN", { month: "long" })}'s public holidays 🏝️
              </h3>
              <button
                className="relative z-10 w-8 h-8 -mr-3 flex justify-center items-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer dark:invert hover:invert-0"
                onClick={() => handleRemovedWidget("holiday", setIsHolidayWidgetRemoved)}
              >
                <img src="/x.svg" className="w-4 h-4" alt="close-icon" />
              </button>
            </div>
            <ul>
              {error && <p>Error loading public holidays!</p>}
              {isLoading && <p>Loading public holidays...</p>}
              {holidays?.map((holiday, idx) => (
                <li key={idx} className="flex gap-2 items-center mb-2">
                  <div className="w-11 h-11 flex justify-center items-center rounded-md bg-gray-300">
                    <span className="font-bold dark:text-indigo-950">{holiday.holiday_date.split("-")[2]}</span>
                  </div>
                  <div className="leading-normal">
                    <small className="text-sm font-semibold">
                      {new Date(holiday.holiday_date).toLocaleString("en-EN", {
                        day: "numeric",
                        weekday: "long",
                        month: "long",
                        year: "numeric",
                      })}
                    </small>
                    <p>{holiday.holiday_name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isPrayTimeWidgetRemoved && (
          <div className="w-full sm:w-[36%] border border-gray-300 dark:bg-transparent rounded-md px-6 py-4">
            <div className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  Prayer time (Jakarta,{" "}
                  {prayTime &&
                    new Date(prayTime?.prayers[day - 1].date).toLocaleString("en-EN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  ) 🤲
                </h3>
                <button
                  className="relative z-10 w-8 h-8 -mr-3 flex justify-center items-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer dark:invert hover:invert-0"
                  onClick={() => handleRemovedWidget("prayTime", setIsPrayTimeWidgetRemoved)}
                >
                  <img src="/x.svg" className="w-4 h-4" alt="close-icon" />
                </button>
              </div>
            </div>
            {errorPrayTime && <p>Error loading prayer time!</p>}
            {isLoadingPrayTime && <p>Loading prayer time...</p>}
            {prayTime && (
              <>
                <div className="flex">
                  <p className="w-[90px]">1. Fajr </p>
                  <p>: &nbsp; {hourFormat(prayTime.prayers[day - 1].time.subuh)}</p>
                </div>
                <div className="flex">
                  <p className="w-[90px]">2. Dhuhr </p>
                  <p>: &nbsp; {hourFormat(prayTime.prayers[day - 1].time.dzuhur)}</p>
                </div>
                <div className="flex">
                  <p className="w-[90px]">3. Asr </p>
                  <p>: &nbsp; {hourFormat(prayTime.prayers[day - 1].time.ashar)}</p>
                </div>
                <div className="flex">
                  <p className="w-[90px]">4. Maghrib </p>
                  <p>: &nbsp; {hourFormat(prayTime.prayers[day - 1].time.maghrib)}</p>
                </div>
                <div className="flex">
                  <p className="w-[90px]">5. Isha </p>
                  <p>: &nbsp; {hourFormat(prayTime.prayers[day - 1].time.isya)}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <ResetButton isStorageNotEmpty={!!storage} onReset={onReset} />
    </div>
  )
}

export default App
