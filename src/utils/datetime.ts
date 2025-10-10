import { dayjs } from "element-plus";

// 当前时间
export function datetime(): string {
  return dayjs().format('YYYY-MM-DD HH:mm')
}

function pad(num: number): string {
  return num.toString().padStart(2, '0')
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isSameYear(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
}

function formatDate(d: Date, withTime = true): string {
  const year = d.getFullYear()
  const month = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hour = pad(d.getHours())
  const minute = pad(d.getMinutes())
  return withTime ? `${year}/${month}/${day} ${hour}:${minute}` : `${year}/${month}/${day}`
}

/**
 * 格式化时间为相对可读形式
 * @param input 时间戳（秒/毫秒）或日期字符串
 */
export function formatRelativeTime(input: string | number | Date): string {
  const now = new Date()
  let date: Date

  if (typeof input === 'number') {
    // 秒级时间戳转毫秒
    date = new Date(input.toString().length === 10 ? input * 1000 : input)
  } else if (typeof input === 'string') {
    date = /^[1-9]\d*$/.test(input)
      ? new Date(parseInt(input) * 1000)
      : new Date(input.replace(/-/g, '/'))
  } else {
    date = input
  }

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(diff / 60)
  const days = Math.floor(diff / 86400)

  if (diff < 60) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (isSameDay(now, date)) return `${pad(date.getHours())}:${pad(date.getMinutes())}`
  if (days === 1) return `昨天 ${pad(date.getHours())}:${pad(date.getMinutes())}`
  if (days === 2) return `前天 ${pad(date.getHours())}:${pad(date.getMinutes())}`
  if (isSameYear(now, date)) return `${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
  return formatDate(date)
}
