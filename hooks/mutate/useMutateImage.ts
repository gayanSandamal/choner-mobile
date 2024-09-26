import { useRef, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from 'firebase/storage'
import { UploadImage } from '@/types/Components'
import { storage } from '@/firebaseConfig'
import { User } from '@/types/User'

export const useUploadImage = (
    onSuccess?: (uri: string) => void,
    onError?: (error: StorageError) => void
) => {
    const progress = useRef(0)

    const [isUploading, setIsUploading] = useState(false)
  
    const uploadImage = async (image: UploadImage | null, user: User | null) => {
      if (image?.blob && user) {
        const storageRef = ref(storage, `users/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image.blob)
  
        setIsUploading(true)
  
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const uploadedProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              progress.current = uploadedProgress
            },
            (error) => {
              setIsUploading(false)
              onError && onError(error)
              progress.current = 0
              reject(error)
            },
            async () => {
              try {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
                onSuccess && onSuccess(imageUrl)
                setIsUploading(false)
                progress.current = 0
                resolve()
              } catch (error) {
                setIsUploading(false)
                progress.current = 0
                reject(error)
              }
            }
          )
        })
      }
    }
  
    const progressState = progress.current
    return { isUploading, progressState, uploadImage }
  }