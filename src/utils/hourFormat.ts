export const hourFormat = (hour: string) => {
  const currentDate = new Date().toLocaleString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" })
  return new Date(`${currentDate} ${hour}`).toLocaleString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
