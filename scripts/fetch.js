


let diff = document.querySelector('#diff-select')
let cate = document.querySelector('#cate-select')
let form = document.querySelector('form')
let spinner = document.querySelector('.water-mark__spinner')
let main = document.querySelector('.main-quiz')



// let reload = confirm("are you sure you want to leave?");


form.addEventListener('submit',(e)=>{
     e.preventDefault()
        let userDiff = e.target.children["0"].lastElementChild.value
        let userCate = e.target.children["1"].lastElementChild.value
        getQuestion(convertingCategory(userCate), userDiff).then(data => {
            addDataDataBase(data.results)
            redirectToAnotherPage()
            
        })
  
    
})



function redirectToAnotherPage(){
     spinner.style.display='block'
     main.style.opacity='0.2'
    let requestDB = window.indexedDB.open('ss')
    requestDB.onsuccess=()=>{
        if(requestDB.result.objectStoreNames.contains('quiz')){
            spinner.style.display = 'none' 
            window.location.replace('./quiz-show.html')
           
        }
    }
}

// this function deprecated

// function createIndexDb(){
//     let requestDB=window.indexedDB.open('ss')
//     requestDB.onupgradeneeded=()=>{
//         let db=requestDB.result
//     db.createObjectStore('quiz',{autoIncrement:true})}
  
//     requestDB.onerror = (e) => {
//         console.log(e)
//     }
    
// }

function addDataDataBase(data){
    let requestDB = window.indexedDB.open('ss')
    requestDB.onupgradeneeded = () => {
        let db = requestDB.result
        db.createObjectStore('quiz', { autoIncrement: true })
    }
    requestDB.onsuccess = () => {
        let tx = requestDB.result.transaction('quiz', 'readwrite')
        let store = tx.objectStore('quiz')
        for (let i = 0; i < data.length; i++) {
            store.add({
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
      film: '11',
      music: '12',
      scienceNature: '17',
      computer: '18',
      sport: '21',
      geography: '22',
      mythology: '20',
      history: '23'
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




if (performance.navigation.type == 1 || performance.navigation.type == 2) {
    let req = indexedDB.deleteDatabase('ss');
    location.href='/'
  
}
