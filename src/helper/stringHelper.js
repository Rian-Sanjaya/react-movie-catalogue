export const stringTruncate = (str, length = 100, ending = '...') => {
  if (str.length > length)
    return str.substr(0, length - 4) + ending
  else
    return str
}