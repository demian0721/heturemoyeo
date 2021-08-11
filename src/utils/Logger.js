const getDate = () => {
  const dateNow = new Date()
  const year = dateNow.getFullYear()
  const month = String(dateNow.getMonth() + 1).length === 1 ? `0${dateNow.getMonth() + 1}` : dateNow.getMonth() + 1
  const day = String(dateNow.getDay()).length === 1 ? `0${dateNow.getDay()}` : dateNow.getDay()
  const hours = String(dateNow.getHours()).length === 1 ? `0${dateNow.getHours()}` : dateNow.getHours()
  const minutes = String(dateNow.getMinutes()).length === 1 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes()
  const seconds = String(dateNow.getSeconds()).length === 1 ? `0${dateNow.getSeconds()}` : dateNow.getSeconds()
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default {
  info: (prefix, message) => console.log(`%c${getDate()} [INFO] ${prefix}` + ' ' + `%c${message}`, 'color: lightGreen;', 'color: white'),
  debug: (prefix, message) => console.log(`%c${getDate()} [DEBUG] ${prefix}` + ' ' + `%c${message}`, 'color: cyan;', 'color: white'),
  warn: (prefix, message) => console.log(`%c${getDate()} [WARN] ${prefix}` + ' ' + `%c${message}`, 'color: orange;', 'color: white'),
  error: (prefix, message) => console.log(`%c${getDate()} [ERRRO] ${prefix}` + ' ' + `%c${message}`, 'color: red;', 'color: white'),
  verbose: (prefix, message) => console.log(`%c${getDate()} [VERBOSE] ${prefix}` + ' ' + `%c${message}`, 'color: gray;', 'color: white'),
}