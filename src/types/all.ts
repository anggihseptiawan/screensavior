export interface Holiday {
  holiday_date: string
  holiday_name: string
  is_national_holiday: boolean
}

export interface PrayTime {
  name: string
  slug: string
  provinceId: string
  province: {
    id: string
    name: string
    slug: string
  }
  prayers: Prayer[]
}

interface Prayer {
  time: {
    imsak: string
    subuh: string
    terbit: string
    dhuha: string
    dzuhur: string
    ashar: string
    maghrib: string
    isya: string
  }
  id: string
  date: string
  cityId: string
}

export interface LocalStorage {
  holiday: boolean
  prayTime: boolean
  quote: boolean
}
