let arr=[];
for(let i=0; i<9; i++){
    arr.push(null);
}
let btns=document.querySelectorAll("button.gameButtons");
let trn;
let msg=document.querySelector("h2");
let body=document.querySelector("body");
msg.innerText=`Choose Option :- `;
function check(player)
{
    if((arr[0]==player && arr[1]==player && arr[2]==player) || (arr[3]==player && arr[4]==player && arr[5]==player) || (arr[6]==player && arr[7]==player && arr[8]==player)) {return true;}
    else if((arr[0]==player && arr[3]==player && arr[6]==player) || (arr[1]==player && arr[4]==player && arr[7]==player) || (arr[2]==player && arr[5]==player && arr[8]==player)) {return true;}
    else if((arr[2]==player && arr[4]==player && arr[6]==player) || (arr[0]==player && arr[4]==player && arr[8]==player)) {return true;}
    else {return false;}
}
function restart(wonPlayer){
    if(wonPlayer=="draw"){
        msg.innerText=`It's a Draw!`;
    }
    else
    {
        msg.innerText=`${wonPlayer} won!`;
    }
    let restartButton=document.querySelector("#abs");
    restartButton.style.display ="inline-block";
    //Enabilng the restart button:-
    restartButton.disabled=false;
    //disabling all buttons till restart Button is clicked
    for(let i=0; i<9; i++)
        {
         btns[i].disabled=true;
        }
    //After clicking the restart button, we will enable all buttons and disable the restart button and make it invisible
    restartButton.onclick=function()
    {
        trn="X";
        msg.innerText="X's turn";
        for(let i=0; i<9; i++){
                arr[i]=null;
                btns[i].innerText="";
            }
        restartButton.style.display="none";
        restartButton.disabled=true;
        for(let i=0;i<9; i++)
        {
            btns[i].disabled=false;
        }
    }
    return;
}
function draw(){
    for(let i=0; i<9; i++) {
        if(arr[i]==null) return false;
    }
    return true;
}
function perform(i){
    console.log(i);
    if(arr[i]!=null){
        msg.innerText=`Occupied space! ${trn}'s turn`;
    }
    else
    {
        btns[i].innerText=trn;
        arr[i]=trn;
        if(check(trn)==true)
        {
            restart(trn);//restart function will print the player that won
        }
        else if(draw()){
            restart("draw");
        }
        else
        {
            if(trn=='X') trn="O";
            else trn="X";
            msg.innerText=`${trn}'s turn`;
        }
    }
}
function activatebuttons(){
    for(let i=0; i<9; i++)
    {
        btns[i].addEventListener("click",function(event){
            event.preventDefault();
            perform(i)
        });
    }
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad1"){
        perform(0);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad2"){
        perform(1);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad3"){
        perform(2);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad4"){
        perform(3);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad5"){
        perform(4);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad6"){
        perform(5);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad7"){
        perform(6);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad8"){
        perform(7);
        }
    });
    body.addEventListener("keydown", function(event){
        if(event.code=="Numpad9"){
        perform(8);
        }
    });
}
function playWithFriend()
{
    trn='X';
    activatebuttons();
    msg.innerText=`${trn}'s turn`;
}
let chooseFriend=document.querySelector("#choose-btn-1");
let chooseComp=document.querySelector("#choose-btn-2");
chooseFriend.onclick=function(){
    chooseFriend.classList.add("set-display-none");
    chooseComp.classList.add("set-display-none");
    playWithFriend();
}
chooseComp.onclick=function(){
    chooseFriend.innerText='Play as X';
    chooseComp.innerText='Play as O';
    let compTurn;
    chooseFriend.onclick=function(){
        // chooseFriend.innerText='X clicked';
        // chooseComp.innerText='O not clicked';
        chooseFriend.classList.add("set-display-none");
        chooseComp.classList.add("set-display-none");
        trn='X';
        compTurn='O';
        activatebuttons_comp();
        msg.innerText='Your turn';
    }
    chooseComp.onclick=function(){
        // chooseFriend.innerText='X not clicked';
        // chooseComp.innerText='O clicked';
        chooseFriend.classList.add("set-display-none");
        chooseComp.classList.add("set-display-none");
        trn='X';
        perform_comp(4);
        compTurn='X';
        trn='O';    
        activatebuttons_comp();
        msg.innerText=`Your turn`;
    }
    function perform_comp(idx1){
        if(arr[idx1]!=null){
            msg.innerText=`Occupied space!, Your turn`;
            return;
        }
        else
        {
            btns[idx1].innerText=trn;
            arr[idx1]=trn;
            if(check(trn)==true)
            {
                restart_comp(trn);//restart function will print the player that won
            }
            else if(draw()){
                restart_comp("draw");
            }
            else
            {
                if(trn=='X') trn="O";
                else trn="X";
            }
        }
    }
    function activatebuttons_comp(){
        for(let i=0; i<9; i++)
        {
            btns[i].addEventListener("click",function(event){
                if(arr[i]!=null) 
                {
                    msg.innerText=`Occupied space!, Your turn`;
                    return;
                }
                event.preventDefault();
                perform_comp(i);
                if(!draw())
                {
                    let idx=calculate(trn);
                    perform_comp(idx);
                }
            });
        }
    }
    function restart_comp(plyr){
        if(plyr=='draw'){
            msg.innerText=`It's a draw!`;
        }
        else{
            if(plyr==compTurn) msg.innerText='You lose!';
            else msg.innerText='You won!';
        }
        let restartButton=document.querySelector("#abs");
        restartButton.style.display ="inline-block";
        for(let i=0; i<9; i++)
        {
            btns[i].disabled=true;
        }
        restartButton.onclick=function()
        {
            location.reload();
        }
    return;
    }
}


function minimax(dum, turn, ult_turn){
    if(check('X')){
        if(ult_turn==='X') return 1;
        else return -1;
    }
    if(check('O')){
        if(ult_turn==='O') return 1;
        else return -1;
    }
    if(draw()) return 0;
    if(turn===ult_turn){
        let maxi=-Infinity;
        for(let i=0; i<9; i++){
            if(dum[i]!=null) continue;
            dum[i]=turn;
            let nextTurn='O';
            if(turn=='O') nextTurn='X';
            let ans=minimax(dum, nextTurn, ult_turn);
            if(maxi<ans){
                maxi=ans;
            }
            dum[i]=null;
        }
        return maxi;
    }
    else{
        let mini=Infinity;
        for(let i=0; i<9; i++){
            if(dum[i]!=null) continue;
            dum[i]=turn;
            let nextTurn='O';
            if(turn=='O') nextTurn='X';
            let ans=minimax(dum, nextTurn, ult_turn);
            if(mini>ans){
                mini=ans;
            }
            dum[i]=null;
        }
        return mini;
    }
}
function calculate(compWord){
    let bestscore=-Infinity;
    let bestmove=-1;
    let turn1=compWord;
    for(let i=0; i<9; i++){
        if(arr[i]!=null) continue;
        arr[i]=compWord;
        turn1='O';
        if(compWord=='O') turn1='X'; 
        let ans=minimax(arr, turn1, compWord);
        let score=ans;
        if(score>bestscore)
        {
            bestscore=score;
            bestmove=i;
        }
        arr[i]=null;    
    }
    return bestmove;
}


// function minimax(dum, turn, ult_turn) { // changed
//     if(check('X')){
//         if(ult_turn==='X') return 1;
//         else return -1;
//     }
//     if(check('O')){
//         if(ult_turn==='O') return 1;
//         else return -1;
//     }
//     if(draw()) return 0;

//     let bestScore = (turn === ult_turn) ? -Infinity : Infinity; // changed
//     for (let i = 0; i < 9; i++) { // unchanged
//         if (dum[i] != null) continue; // unchanged

//         dum[i] = turn; // unchanged
//         let nextTurn = (turn === 'X') ? 'O' : 'X'; // unchanged
//         let score = minimax(dum, nextTurn, ult_turn); // unchanged
//         dum[i] = null; // unchanged

//         if (turn === ult_turn) { // changed
//             if (score > bestScore) bestScore = score; // changed
//         } else { // changed
//             if (score < bestScore) bestScore = score; // changed
//         }
//     }

//     return bestScore; // changed
// }

// function calculate(compWord) { // unchanged
//     let bestScore = -Infinity; // unchanged
//     let bestMove = -1; // unchanged

//     for (let i = 0; i < 9; i++) { // unchanged
//         if (arr[i] != null) continue; // unchanged

//         arr[i] = compWord; // unchanged
//         let nextTurn = (compWord === 'X') ? 'O' : 'X'; // unchanged
//         let score = minimax(arr, nextTurn, compWord); // unchanged
//         arr[i] = null; // unchanged

//         if (score > bestScore) { // unchanged
//             bestScore = score; // unchanged
//             bestMove = i; // unchanged
//         }
//     }

//     return bestMove; // unchanged
// }
















//waste of time:-
// function f(dum, turn, ult_turn){
//     if(check('O')) return -1;
//     if(check('X')) return -2;
//     if(draw()) return -3;
//     if(turn=='X'){
//         let idx=-5;
//         for(let i=0; i<dum.length; i++){
//             if(dum[i]!=null) continue;
//             dum[i]=turn;
//             let ans1=f(dum, 'O', ult_turn);
//             if(ans1==-2) return -2;
//             if(ans1==-3) idx=i;
//             dum[i]=null;
//         }
//         if(idx==-5) return -1;
//         return idx;
//     }
//     else{
//         let idx=-5;
//         for(let i=0; i<dum.length; i++){
//             if(dum[i]!=null) continue;
//             dum[i]=turn;
//             let ans1=f(dum, 'X', ult_turn);
//             if(ans1==-1) return -1;
//             if(ans1==-3) idx=i;
//             dum[i]=null;
//         }
//         if(idx==-5) return -2;
//         return idx;
//     }

// }

// function calculate(compWord){
//     console.log(compWord);
//     let idx=-5;
//     for(let i=0; i<arr.length; i++){
//         if(arr[i]!=null) continue;
//         arr[i]=compWord;
//         let trn1='O';
//         if(compWord=='O') trn1='X';
//         let ans=f(arr, trn1, compWord);//'X' 'O'
//         if(compWord=='O' && ans==-1) return i;
//         if(compWord=='X' && ans==-2) return i;
//         if(ans==-3) idx=i;
//         arr[i]=null;
//     }
//     return idx;
// }


