export const DateUtil = {
  convertToDate(date: Date): Date {
    if (!date) {
      return date
    }
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return new Date(
      [date?.getFullYear(), date?.getMonth() + 1, date?.getDate()].join('-')
    )
  }
}
