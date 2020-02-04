
document.addEventListener("DOMContentLoaded", () => {

  indexedDB.deleteDatabase('ss');
})

let count = document.querySelector('.quiz-main__count')

liveCount().then(data => {
  count.innerHTML = data.value
})
async function liveCount() {
  let res = await fetch('https://api.countapi.xyz/update/quiz/nacka/?amount=1')
  return res.json()
}