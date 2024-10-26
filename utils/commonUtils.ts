import { CommentData, CommunityCardData, InterestCardData, ReplyData } from "@/types/Components";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library'
import { BLURHASH, POST_VISIBILITY } from "@/constants/values";

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

const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
  month: 'short',
  day: '2-digit',
  year: 'numeric',
}

export const formatDateToCustomString = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  if( Platform.OS === 'android') {
    const [day, year, time] = formattedDate.split(', ')
    return `${time} on ${day}, ${year}`
  }

  const [day, yearWithTime] = formattedDate.split(', ')
  const [year, time] = yearWithTime.split(' at ')

  return `${time?.trim()} on ${day}, ${year}`
}

export const timeDataToLocalString  = (timeAt: {_seconds: number, _nanoseconds: number}): Date | null => {
  if (!timeAt?._seconds) return null
  const milliseconds = timeAt._seconds * 1000 + Math.floor(timeAt._nanoseconds / 1000000);
  return new Date(milliseconds);
}

export const isDayOld = (timeAt: { _seconds: number; _nanoseconds: number }) => {
  if (!timeAt?._seconds) return

  const milliseconds = timeAt._seconds * 1000 + Math.floor(timeAt._nanoseconds / 1000000);
  
  const timeDate = new Date(milliseconds);
  const currentTime = new Date();
  
  const diffMilliseconds = currentTime.getTime() - timeDate.getTime();
  const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24);
  
  return diffDays >= 1;
};


export const postCreateTimeToDate = (createdAt: {_seconds: number, _nanoseconds: number}) => {
  const milliseconds = createdAt?._seconds * 1000 + Math.floor(createdAt?._nanoseconds / 1000000);
  const date = new Date(milliseconds);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
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
      _seconds: data.createdAt?._seconds,
      _nanoseconds: data.createdAt?._nanoseconds
    },
    scheduledAt: data?.scheduledAt?._seconds? {
      _seconds: data?.scheduledAt?._seconds,
      _nanoseconds: data?.scheduledAt?._nanoseconds
    }: !!data?.scheduledAt? isoDateTimeToSecond(data?.scheduledAt): undefined,
    visibility: data.visibility,
    voteCount: data?.votes?.length
  }
}

export function parseToCommunityCardProps(data: any): CommunityCardData {
  return {
    id: data.id,
    title: data.title,
    type: data.type,
    imageUrls: {
      sm: data?.imageUrls?.sm,
      md: data?.imageUrls?.md,
      lg: data?.imageUrls?.lg,
    },
    createdUser: {
      uid: data.createdUser.uid,
      displayName: data.createdUser.displayName,
      profileImageUrl: data.createdUser.profileImageUrl
    },
    createdAt: {
      _seconds: data.createdAt._seconds,
      _nanoseconds: data.createdAt._nanoseconds
    },
    scheduledAt: data?.scheduledAt?._seconds? {
      _seconds: data?.scheduledAt?._seconds,
      _nanoseconds: data?.scheduledAt?._nanoseconds
    }: !!data?.scheduledAt? isoDateTimeToSecond(data?.scheduledAt): undefined,
    visibility: data.visibility,
    voteCount: data.votes.length
  }
}

export function parseToCommentProps(data: any): CommentData {
  return {
    id: data.id,
    postId: data.postId,
    createdUser: {
      uid: data.createdBy.uid,
      displayName: data.createdBy.displayName,
      profileImageUrl: data.createdBy.profileImageUrl
    },
    createdAt: {
      _seconds: data.createdAt._seconds,
      _nanoseconds: data.createdAt._nanoseconds
    },
    comment: data.comment,
  }
}

export function parseToReplyProps(data: any): ReplyData {
  return {
    id: data.id,
    commentId: data.commentId,
    createdUser: {
      uid: data.createdBy.uid,
      displayName: data.createdBy.displayName,
      profileImageUrl: data.createdBy.profileImageUrl
    },
    createdAt: {
      _seconds: data.createdAt._seconds,
      _nanoseconds: data.createdAt._nanoseconds
    },
    reply: data.reply,
  }
}

export const escapePercent = (url: string) => {
  return url.replace(/%/g, '__PERCENT__')
}

export const unescapePercent = (url: string) => {
  return url.replace(/__PERCENT__/g, '%')
}

export const updateImageWithSize = (uri: string, type: string, size: string) => {
  return uri.replace(`.${type}`, size)
}

export const minTime = () => {
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() + 1)
  return currentDate
}

const setImageData = async (image: ImagePicker.ImagePickerResult, id: string) => {
  const imageUri = image?.assets?.[0].uri || ''
  const imageType = image?.assets?.[0]?.fileName?.split('.').slice(-1)[0] || 'jpg'
  const imageBlob = await getBlobFromUri(imageUri)

  return {
    uri: imageUri,
    name: `${id}.${imageType}`,
    type: imageType,
    blob: imageBlob as Blob,
  }
}

export const pickImage = async (id: string) => {
  const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
  })

  if (!result.canceled) {
    const data = await setImageData(result, id)
    if (data) {
      return data
    }
  }

  return null
}

export const captureAndPickImage = async (id: string) => {
  await ImagePicker.requestCameraPermissionsAsync()
  await MediaLibrary.requestPermissionsAsync()
  const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
  })

  if (!result.canceled) {
    const data = await setImageData(result, id)
    if (data) {
      return data
    }
  }

  return null
}

export const getRandomBlurHash = () => {
  const randomIndex = Math.floor(Math.random() * BLURHASH.length)
  return BLURHASH[randomIndex]
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}