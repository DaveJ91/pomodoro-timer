// convertTime
convertTime = function(secondsTotal){
    minutes = Math.floor(secondsTotal / 60);
    seconds = secondsTotal % 60;
    if (seconds < 10){
        seconds = '0' + seconds;
    }    
    return  minutes + ":" + seconds;
}


// UI Functions
TimerUI = {
    updateTimeDisplay: function (time) {
        document.getElementById('timer').innerHTML = convertTime(time);
    }
}


// Timer Class
class Timer {
    constructor(){
        this.remainingTime = 1500;
        this.timerRunning = false;
    }

    // Pause Timer
    pauseTimer(){
        this.timerRunning = false;
    }

    // Start Timer - need to stop this running multiple times
    startTimer(){
        this.timerRunning  = true;
        let countDown = setInterval(()=>{
            if (this.remainingTime < 1 || this.timerRunning==false){
                clearInterval(countDown);
            }
            TimerUI.updateTimeDisplay(this.remainingTime);
            this.remainingTime-=1;
        },1000);
    }

    // reset timer/ new 25 min period
    resetTimer(){
        this.timerRunning = false;
        this.remainingTime = 1500;
        TimerUI.updateTimeDisplay(this.remainingTime);
    }

    // 5 min break
    takeBreak(mins){
        this.pauseTimer();
        let seconds = mins* 60;
        this.remainingTime = seconds;
        this.startTimer();
    }

}

timer = new Timer();

// Add Event Listeners - will be part of app initialization
document.getElementById('startButton').addEventListener('click', ()=>timer.startTimer())
document.getElementById('pauseButton').addEventListener('click', ()=>timer.pauseTimer())
document.getElementById('resetButton').addEventListener('click', ()=>timer.resetTimer())
document.getElementById('shortBreakButton').addEventListener('click', ()=>timer.takeBreak(5))
document.getElementById('longBreakButton').addEventListener('click', ()=>timer.takeBreak(10))

// When a button is clicked - set class to active
let buttons = [...document.getElementsByClassName('timerButton')]
for (let i=0; i < buttons.length;  i++){
    buttons[i].addEventListener('click', function(){
        pressButton(buttons[i])
    })
}

let pressButton=function(button){
    //first remove active from all other buttons
    let buttons = [...document.getElementsByClassName('timerButton')]
    for (let i=0; i < buttons.length;  i++){
        buttons[i].classList.remove('active')
    }
    button.classList.add('active');
}
