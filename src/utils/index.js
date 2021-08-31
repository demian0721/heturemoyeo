export function formattedDate(date) {
  const dateNow = new Date(date).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  return dateNow
    .split(".")
    .map((el) => {
      const tirmText = el.trim();
      return tirmText.length === 1 ? `0${tirmText}` : tirmText;
    })
    .join(". ");
}

export function formattedLastLoginTime(time) {
  if (time) {
    const numberToTime = Number(time);
    const seconds = Math.round(numberToTime / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)
    let result, state
    if (seconds >= 1) {
      result = `${seconds}초 전 접속`
      state = 'offline'
    }
    if (minutes >= 1) {
      result = `${minutes}분 전 접속`
      state = 'offline'
    }
    if (hours >= 1) {
      result = `${hours}시간 전 접속`
      state = 'offline'
    }
    if (days >= 1) {
      result = `${days}일 전 접속`
      state = 'offline'
    }
    return { time, seconds, minutes, hours, days, result, state }
  }
  return { time, result: '접속중', state: 'online' }
}
