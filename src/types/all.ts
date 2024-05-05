export interface Holiday {
  holiday_date: string
  holiday_name: string
  is_national_holiday: boolean
}

export interface PrayTime {
  date: {
    readable: string
  }
  meta: {
    timezone: string
  }
  timings: {
    Fajr: string
    Sunrise: string
    Dhuhr: string
    Asr: string
    Sunset: string
    Maghrib: string
    Isha: string
    Imsak: string
    Midnight: string
    Firstthird: string
    Lastthird: string
  }
}

export interface LocalStorage {
  holiday: boolean
  prayTime: boolean
  quote: boolean
}
