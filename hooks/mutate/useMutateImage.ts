import { useRef, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from 'firebase/storage'
import { UploadImage } from '@/types/Components'
import { storage } from '@/firebaseConfig'

export const useUploadImage = (
    onSuccess?: (uri: string) => void,
    onError?: (error: StorageError) => void
) => {
    const progress = useRef(0)
    const url = useRef<string | null>(null)

    const [isUploading, setIsUploading] = useState(false)
  
    const uploadImage = async (image: UploadImage | null, storagePath: string) => {
      if (image?.blob) {
        const storageRef = ref(storage, `${storagePath}${image.name}`)
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
                url.current = imageUrl
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
    const imageUrl = url.current
    return { imageUrl, isUploading, progressState, uploadImage }
  }