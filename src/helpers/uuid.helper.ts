export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (match) {
    const randomValue = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0
    const replaceValue = match === 'x' ? randomValue : (randomValue & 0x3) | 0x8
    return replaceValue.toString(16)
  })
}