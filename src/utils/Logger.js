const getDate = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month =
    String(dateNow.getMonth() + 1).length === 1
      ? `0${dateNow.getMonth() + 1}`
      : dateNow.getMonth() + 1;
  const day =
    String(dateNow.getDay()).length === 1
      ? `0${dateNow.getDay()}`
      : dateNow.getDay();
  const hours =
    String(dateNow.getHours()).length === 1
      ? `0${dateNow.getHours()}`
      : dateNow.getHours();
  const minutes =
    String(dateNow.getMinutes()).length === 1
      ? `0${dateNow.getMinutes()}`
      : dateNow.getMinutes();
  const seconds =
    String(dateNow.getSeconds()).length === 1
      ? `0${dateNow.getSeconds()}`
      : dateNow.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const getMessage = (message) => {
  const regex = /\[(.*?)\]/gm;
  const firstMatch = message.match(regex)?.shift();
  const result = message.split(firstMatch).filter((el) => el.length !== 0).map((el) => el.trim()).join(" ")
  // return `${firstMatch} %c${result}`
  return message
};

const Logger = {
  info: (message) => console.log(`%c${getDate()} [INFO] ${getMessage(message)}`, "color: #47ed4a;"),
  debug: (message) => console.log(`%c${getDate()} [DEBUG] ${getMessage(message)}`, "color: #47eaed;"),
  warn: (message) => console.log(`%c${getDate()} [WARN] ${getMessage(message)}`, "color: #edab47;"),
  error: (message) => console.log(`%c${getDate()} [ERRRO] ${getMessage(message)}`, "color: #ed4747;"),
  verbose: (message) => console.log(`%c${getDate()} [VERBOSE] ${getMessage(message)}`, "color: #8c8c8c;"),
};

export default Logger;
