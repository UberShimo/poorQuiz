var score = 0;
var round = 0;
var data;
var xhr  = new XMLHttpRequest();
var correctChoice;

//Make variebles for lots of HTML objects
var question = document.getElementById("question");
var reset = document.getElementById("reset");
var roundShow = document.getElementById("round");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var text3 = document.getElementById("text3");
var text4 = document.getElementById("text4");

//Get questions from API and put it into "data"
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        data = xhr.response;

        htmlFix();
    }
}

xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple");
xhr.responseType = "json";
xhr.send();

//click events
choice1.addEventListener("click", function(){
    if(round < 10){
        if(text1.innerHTML == correctChoice){
            score ++;
        }
        round ++;

        htmlFix();
    }
});

choice2.addEventListener("click", function(){
    if(round < 10){
        if(text2.innerHTML == correctChoice){
            score ++;
        }
        round ++;

        htmlFix();
    }
});

choice3.addEventListener("click", function(){
    if(round < 10){
        if(text3.innerHTML == correctChoice){
            score ++;
        }
        round ++;

        htmlFix();
    }
});

choice4.addEventListener("click", function(){
    if(round < 10){
        if(text4.innerHTML == correctChoice){
            score ++;
        }
        round ++;

        htmlFix();
    }
});

//Resfresh page..... heh
reset.addEventListener("click", function(){
    location.reload();
})

//Update everything
function htmlFix(){
    if(round < 10){
        question.innerHTML = data.results[round].question;
        correctChoice = data.results[round].correct_answer;//Save correct choice in a variable
        var choices = data.results[round].incorrect_answers;
        choices.push(correctChoice);
        choices = randomize(choices);
        
        text1.innerHTML = choices[0];
        text2.innerHTML = choices[1];
        text3.innerHTML = choices[2];
        text4.innerHTML = choices[3];

        roundShow.innerHTML = "Question " + (round+1) + "/10";
    }
    else{
        question.innerHTML = score + "/10 correct";
        text1.innerHTML = "";
        text2.innerHTML = "";
        text3.innerHTML = "";
        text4.innerHTML = "";
    }
}

//Randomize an array... duh
function randomize(array){
    var i = array.length;
    var temp;
    var random;

    while (i !== 0) {
        random = Math.floor(Math.random() * i);
        i -= 1;

        temp = array[i];
        array[i] = array[random];
        array[random] = temp;
    }

    return array;
}