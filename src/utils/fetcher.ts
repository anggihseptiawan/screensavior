import { API_URL_HARI_LIBUR, API_URL_JADWAL_SHOLAT, API_URL_RANDOM_QUOTE } from "../constants/url"
import { Holiday, PrayTime } from "../types/all"

export const quotesFetcher = () =>
  fetch(`${API_URL_RANDOM_QUOTE}/quotes/random`)
    .then((res) => res.json())
    .then((data) => data[0].content)

const date = new Date()
export const holidaysFetcher = (): Promise<Holiday[]> =>
  fetch(`${API_URL_HARI_LIBUR}/api?month=${date.getMonth() + 1}`)
    .then((res) => res.json())
    .then((data) => data)

export const prayerFetcher = (): Promise<PrayTime> =>
  fetch(
    `${API_URL_JADWAL_SHOLAT}/calendarByCity/${date.getFullYear()}/${
      date.getMonth() + 1
    }?city=Jakarta&country=Indonesia&method=4`,
  )
    .then((res) => res.json())
    .then((data) => {
      const day = date.getDate()
      return data.data[day - 1]
    })
