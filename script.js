const questionNumber = document.querySelector(".number")
const image = document.querySelector(".image")
const object = document.querySelector(".object")
const hint = document.querySelector(".hint")
const confrimButton = document.querySelector(".confrimButton")
const game = document.querySelector(".game")
const final = document.querySelector(".final")

let totalQuestion;
let current;
let choice;
let answer;
let answerName;
let selectedBtn;
let rightBtn;
let gotRight;
let once;
let score;

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

Start()
Question()

function Start(){
    current = score = 0
    gotRight = once = false
    totalQuestion = Math.floor(Math.random() * 10) + 5;
}

function Question(){
    if(current == totalQuestion){
        game.classList.add("hide")
        final.classList.remove("hide");
        let pass = totalQuestion/2
        if(score == totalQuestion){
            image.src = "./img/greatJob.png"
        }
        else if(score >= pass){
            image.src = "./img/goodJob.png"
        }
        else{
            image.src = "./img/niceTry.png" 
        }
        return
    }

    current += 1;
    choice = 0
    questionNumber.innerHTML = current + "/" + totalQuestion;

    qIndex = Math.floor(Math.random() * 10);

    object.src = objects[qIndex].image
    hint.innerHTML= `${objects[qIndex].description}`
    answer = objects[qIndex].number
    answerName = objects[qIndex].name

    randomBtn1 = Math.floor(Math.random() * 10);
    randomBtn2 = Math.floor(Math.random() * 10);
    randomBtn3 = Math.floor(Math.random() * 10);

    for(let i = 0; i < 20; i++){
        if(randomBtn1 == randomBtn2 || randomBtn1 == randomBtn3){
            randomBtn1 = Math.floor(Math.random() * 9);
        }
        if(randomBtn2 == randomBtn3){
            food2 = Math.floor(Math.random() * 9);
        }
    }

    for (let i = 1; i < 4; i ++){
        let currentClass = "btn" + (i)

        let randombtn = "randomBtn" + i
        randombtn = window[randombtn]

        console.log(randombtn)

        let currentBtn = document.getElementById(currentClass)
        
        console.log(currentBtn)
        currentBtn.innerHTML = objects[randombtn].name

        if(objects[randombtn].number == answer){
            rightBtn = currentBtn
            gotRight = true
        }

        currentBtn.setAttribute("data",objects[randombtn].number)

        if(once == false){
            currentBtn.addEventListener("click", () => {
                let number = currentBtn.getAttribute("data")
                if(choice == number){
                    console.log("s")
                    currentBtn.style.backgroundColor = "#BEBEBE"
                    choice = 0
                    selectedBtn = null
                    return
                }
                else{
                    if(selectedBtn !=null){
                        console.log("d")
                        selectedBtn.style.backgroundColor = "#BEBEBE"
                    }
                    currentBtn.style.backgroundColor = "white"
                    choice = number
                    selectedBtn = currentBtn
                    console.log(choice)
                }
            })
        }
    }

    once = true
    console.log(gotRight)
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

confrimButton.addEventListener("click", () => {
    if(choice == 0){
        return
    }
    confrimButton.classList.add("hide")

    if(choice == answer){
        score += 1
        selectedBtn.style.backgroundColor = "green"
    }
    if(choice != answer){
        selectedBtn.style.backgroundColor = "red"
        rightBtn.style.backgroundColor = "green"
    }

    let delay = setTimeout(() => {
        selectedBtn.style.backgroundColor = "#BEBEBE"
        rightBtn.style.backgroundColor = "#BEBEBE"
        object.src = ""
        Question()
        confrimButton.classList.remove("hide")
    }, 1500);
})