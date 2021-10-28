let yourVoteFor= document.querySelector('.session-1-1-1 span');
let tittle = document.querySelector('.session-1-1-2 span');
let numbers = document.querySelector('.session-1-1-3');
let description = document.querySelector('.session-1-1-4');
let instructions = document.querySelector('.session-2');
let sideImg = document.querySelector('.session-1-2');


let currentStage = 0;
let num = '';
let branco = true;
function beginStage(){
    let stage= stages[currentStage];
    let numberHTML = '';
    num = '';
    branco = false;

    for (let i=0; i<stage.numbers; i++){
        if(i ===0){
            numberHTML += '<div class="number blink"></div>';
        } else
        numberHTML += '<div class="number"></div>';
    }

    yourVoteFor.style.display = 'none';
    tittle.innerHTML = stage.office;
    description.innerHTML = ' ';
    instructions.style.display =  ' none';
    numbers.innerHTML = numberHTML;
    sideImg.innerHTML= ' ';

}

function updateInterFace(){
    let stage= stages[currentStage];
    let candidate = stage.candidates.filter((item)=>{
        if(item.number === num){
            return  true;
        } else{
            return false;
        }
    });
    if (candidate.length > 0){
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        description.innerHTML = `Name: ${candidate.name}<br>Office: ${candidate.party}`;

        let pictureHTML = '';
        for (let i in candidate.images){
            if(candidate.images[i].small){
                pictureHTML += `
            <div class="image vice">
                <img src="./images/${candidate.images[i].url}" alt="">
                ${candidate.images[i].legenda}
            </div>`
            }else{
            pictureHTML += `
            <div class="image">
                <img src="./images/${candidate.images[i].url}" alt="">
                ${candidate.images[i].legenda}
            </div>`
            }    
        }
            sideImg.innerHTML= pictureHTML;
            instructions.style.display =  'block';
    } else {
        yourVoteFor.style.display = 'block';
        description.innerHTML = `<div class="nulo blink">null vote</div>`;
    }
    
}

function clicked(n){
    let elNumber = document.querySelector('.number.blink');
    if(elNumber !== null){
        elNumber.innerHTML = n;
        num= `${num}${n}`;

        elNumber.classList.remove('blink');
        if(elNumber.nextElementSibling !== null){
            elNumber.nextElementSibling.classList.add('blink');
        } else{
            updateInterFace();
        }
    }
    
}

function blank (){
    if(num === ''){
        branco=true;
        yourVoteFor.style.display = 'block';
        description.innerHTML = `<div class="nulo blink">blank</div>`;
        instructions.style.display = 'block';
        numbers.innerHTML= '';

    }else
    alert('To vote blank press correct then press blank');
}

function correct(){
    beginStage();
}

function confirm(){
    let stage= stages[currentStage];

    let voteConfirmed = false;
    if(branco === true){
        voteConfirmed=true;
    } else if(num.length === stage.numbers){
        voteConfirmed = true;
    }
    if(voteConfirmed){
        currentStage++;
        if(stages[currentStage] !== undefined){
            beginStage();
        }else{
            document.querySelector('.screen').innerHTML='<div class ="screen end"> END </div>'
        }
    }
}

beginStage();