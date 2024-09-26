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