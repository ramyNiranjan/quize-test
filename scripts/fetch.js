
let diff = document.querySelector('#diff-select')
let cate = document.querySelector('#cate-select')
let form = document.querySelector('form')


form.addEventListener('submit',(e)=>{
     e.preventDefault()
        let userDiff = e.target.children["0"].lastElementChild.value
        let userCate = e.target.children["1"].lastElementChild.value
        getQuestion(convertingCategory(userCate), userDiff).then(data => {
            console.log(data)
            createIndexDb()
            addDataDataBase(data.results)
            redirectToAnotherPage()
        })
  
    
})



function redirectToAnotherPage(){
    let requestDB = window.indexedDB.open('ss')
    requestDB.onsuccess=()=>{
        if(requestDB.result.objectStoreNames.contains('quiz'))
            window.location.href = './quiz-show.html'

    }
   
}

function createIndexDb(){
    let requestDB=window.indexedDB.open('ss',1)
    requestDB.onupgradeneeded=()=>{
        let db=requestDB.result
    db.createObjectStore('quiz',{autoIncrement:true})}
  
    requestDB.onerror = (e) => {
        console.log(e)
    }
    
}

function addDataDataBase(data){
    let requestDB = window.indexedDB.open('ss', 1)
    requestDB.onsuccess = () => {
        let store = requestDB.result.transaction('quiz', 'readwrite').objectStore('quiz')
        for (let i = 0; i < data.length; i++) {
            store.put({
                'quiz': `${data[i].question}`, 'right': `${data[i].correct_answer}`,
                'wrong1': `${data[i].incorrect_answers[0]}`,
                'wrong2': `${data[i].incorrect_answers[1]}`,
                'wrong3': `${data[i].incorrect_answers[2]}`
            })
        }
    }
}

function convertingCategory(category){
  let cateList={
      generalKnowledge: '9',
      animals: '27',
      flim: '11',
      music: '12',
      scienceNature: '17',
      computer: '18',
      sport: '21',
      geography: '22',
      politics: '23',
      history: '24'
  }
    if (category ==='General Knowledge'){
        let newCate = 'generalKnowledge'
        return cateList[newCate]
    }
    if (category === 'Science Nature' ){
        let newCate = 'scienceNature'
        return cateList[newCate]
    }
  return cateList[category]
}


async function getQuestion(category='9',difficulty='easy'){
    let response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
    let quiz= await response.json()
    return quiz
}
