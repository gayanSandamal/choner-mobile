import { InterestCardData, InterestCardProps, PostedByProps } from "@/types/Components";

export const matchOnlyLetters = (text: string) => {
    const regex = /^\p{L}+$/u
        
    return regex.test(text)
}

type AnyObject = { [key: string]: any };

export const replaceNullUndefined = (obj: AnyObject): AnyObject => {
  const result: AnyObject = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'undefined' || value === null) {
      result[key] = ''
    } else if (typeof value === 'object' && value !== null) {
      result[key] = replaceNullUndefined(value)
    } else {
      result[key] = value
    }
  }

  return result
}

export const getBlobFromUri = async (uri: string) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"))
    };
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })

  return blob
}

export const formatDateToCustomString = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  const [day, yearWithTime] = formattedDate.split(', ')
  const [year, time] = yearWithTime.split(' at ')

  return `${time?.trim()} on ${day}, ${year}`
}

export const postCreateTimeToDate = (createdAt: {_seconds: number, _nanoseconds: number}) => {
  const milliseconds = createdAt._seconds * 1000 + Math.floor(createdAt._nanoseconds / 1000000);
  const date = new Date(milliseconds);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

export const isoDateTimeToSecond = (dateTime: string) => {
  const date = new Date(dateTime)

  const seconds = Math.floor(date.getTime() / 1000)

  const nanoseconds = (date.getMilliseconds() * 1e6)

  return {
      _seconds: seconds,
      _nanoseconds: nanoseconds
  }
}

export function parseToInterestCardProps(data: any): InterestCardData {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    createdUser: {
      uid: data.createdUser.uid,
      displayName: data.createdUser.displayName,
      profileImageUrl: data.createdUser.profileImageUrl
    },
    createdAt: {
      _seconds: data.createdAt._seconds,
      _nanoseconds: data.createdAt._nanoseconds
    },
    voteCount: data.votes.length
  }
}

export const escapePercent = (url: string) => {
  return url.replace(/%/g, '__PERCENT__')
}
export const unescapePercent = (url: string) => {
  return url.replace(/__PERCENT__/g, '%')
}
