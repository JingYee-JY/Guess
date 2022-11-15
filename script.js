const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const questionNumber = document.querySelector(".number")
const image = document.querySelector(".image")
const object = document.querySelector(".object")
const hint = document.querySelector(".hint")
const game = document.querySelector(".game")
const final = document.querySelector(".final")
const againButton = document.querySelector(".againButton")
const homeButton = document.querySelector(".homeButton")

const clickSound = document.getElementById("click")
const completed = document.getElementById("completed")
const clap = document.getElementById("clap")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const lose = document.getElementById("lose")

let totalQuestion;
let current;
let choice;
let answer;
let answerName;
let rightBtn;
let gotRight;
let once;
let score;
let tempArray = [];

let objects = [
    {number: "1", name:"Chapteh",image:"./img/chapteh.png", description:"Something you play by kicking it."},
    {number: "2", name:"Doctor",image:"./img/doctor.png", description:"Someone you visit when you are sick."},
    {number: "3", name:"Family",image:"./img/family.png", description:"Poeples who care about you very much."},
    {number: "4", name:"Five Stone",image:"./img/fiveStone.png", description:"A childhood games where you throw and catch."},
    {number: "5", name:"Hopscotch",image:"./img/hopscotch.png", description:"An outdoor activity everyone plays before."},
    {number: "6", name:"Kopi",image:"./img/kopi.png", description:"A drink that people drink in the morning."},
    {number: "7", name:"Mahjong",image:"./img/mahjong.png", description:"An all time farvourite game that you play."},
    {number: "8", name:"Nurse",image:"./img/nurse.png", description:"Someone who help the doctor take care of you."},
    {number: "9", name:"Paper Ball",image:"./img/paperBall.png", description:"A object you hit when playing a simple game."},
    {number: "10", name:"Pets",image:"./img/pets.png", description:"Something you like and have to take care of."}
]

function Start(){
    current = score = 0
    gotRight = once = false
    totalQuestion = Math.floor(Math.random() * 6) + 5;
}

function Question(){
    if(current == totalQuestion){
        game.classList.add("hide")
        final.classList.remove("hide");
        let pass = totalQuestion/2
        if(score == totalQuestion){
            clap.currentTime = 0
            clap.play()
            image.src = "./img/greatJob.png"
        }
        else if(score >= pass){
            completed.currentTime = 0
            completed.play()
            image.src = "./img/goodJob.png"
        }
        else{
            lose.currentTime = 0
            lose.play()
            image.src = "./img/niceTry.png" 
        }
        return
    }

    if(tempArray.length == 0){
        for(let x = 0; x < objects.length; x++){
            tempArray.push(objects[x])
        }
    }

    current += 1;
    choice = false
    questionNumber.innerHTML = current + "/" + totalQuestion;

    qIndex = Math.floor(Math.random() * tempArray.length);

    object.src = tempArray[qIndex].image
    hint.innerHTML= `${tempArray[qIndex].description}`
    answer = tempArray[qIndex].number
    answerName = tempArray[qIndex].name

    tempArray.splice(qIndex, 1)

    let checkOption = [];
    for(let x = 0; x < objects.length; x++){
        checkOption.push(objects[x])
    }

    for (let i = 1; i < 4; i ++){
        let currentClass = "btn" + (i)

        let randomNumber = Math.floor(Math.random() * checkOption.length);

        let currentBtn = document.getElementById(currentClass)
        
        console.log(currentBtn)
        currentBtn.innerHTML = checkOption[randomNumber].name

        if(checkOption[randomNumber].number == answer){
            rightBtn = currentBtn
            gotRight = true
        }

        currentBtn.setAttribute("data",checkOption[randomNumber].number)
        
        checkOption.splice(randomNumber, 1)

        if(once == false){
            currentBtn.addEventListener("click", () => {
                if(choice == false){
                    playClickSound()
                    let number = currentBtn.getAttribute("data")
                    if(number == answer){
                        correct.currentTime = 0
                        correct.play()
                        score += 1
                        currentBtn.style.backgroundColor = "green"
                    }
                    if(number != answer){
                        wrong.currentTime = 0
                        wrong.play()
                        currentBtn.style.backgroundColor = "red"
                        rightBtn.style.backgroundColor = "green"
                    }
                    choice = true
                    let delay = setTimeout(() => {
                        currentBtn.style.backgroundColor = "#BEBEBE"
                        rightBtn.style.backgroundColor = "#BEBEBE"
                        object.src = ""
                        Question()
                    }, 1500); 
                }         
                })
        }
    }

    once = true
    
    if(gotRight == false){
        console.log("r")
        let index = Math.floor(Math.random() * 3) + 1;
        let randomRight = "btn" + index
        rightBtn = document.getElementById(randomRight)
    
        rightBtn.setAttribute("data", answer)

        rightBtn.innerHTML = answerName
    }
    else{
        gotRight = false
    }
}

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        game.classList.remove("hide")
        Start()
        Question()
    }, 200);
})

againButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        final.classList.add("hide")
        start.classList.remove("hide")
    }, 200);
})

homeButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        location.assign('https://gimme.sg/activations/dementia/');
    }, 200);
})

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });