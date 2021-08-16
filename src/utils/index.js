export function formattedDate(date) {
  const dateNow = new Date(date).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  return dateNow.split('.').map(el => {
    const tirmText = el.trim();
    return tirmText.length === 1 ? `0${tirmText}` : tirmText
  }).join('. ')
}
