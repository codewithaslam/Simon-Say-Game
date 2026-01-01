let gameSeq=[]; //game flashing sequence
let userSeq=[]; //user clicking the button sequence

let btns=["red","blue","orange","purple"];

let started=false; //initializing start to false
let level=0; //initializing level to zero

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started!!");
        started=true;
        levelUp();
    }
})

function GameFlash(btn){
    btn.classList.add("flash"); //to turn the button to white
    setTimeout(function(){
        btn.classList.remove("flash"); //to turn to normal color
    },250); //after 0.25 sec
}

function UserFlash(btn){
    btn.classList.add("userflash"); //to turn the button to green on pressing
    setTimeout(function(){
        btn.classList.remove("userflash"); //to turn to normal color
    },250); //after 0.25 sec
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`; //writing level 1 etc in teh screen
    let randIdx = Math.floor(Math.random() * 3); //random index generation
    let randColor = btns[randIdx]; //selecting the color using index
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    GameFlash(randbtn);
}

function CheckAns(idx){

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press Any Key to Start`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="white";
        },150)
        reset();
    }
}

function BtnPress(){
    let btn = this;
    console.log(btn);
    UserFlash(btn);

    let Usercolor=btn.getAttribute("id");
    userSeq.push(Usercolor);
    console.log(userSeq);
    CheckAns(userSeq.length-1);
}

let AllBtns=document.querySelectorAll(".btn");
for(btn of AllBtns){
    btn.addEventListener("click",BtnPress);
}


function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
