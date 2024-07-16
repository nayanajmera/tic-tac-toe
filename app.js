let arr=[];
for(let i=0; i<9; i++){
    arr.push(null);
}
let btns=document.querySelectorAll("button.gameButtons");
let trn='X';
let msg=document.querySelector("h2");
let body=document.querySelector("body");
msg.innerText="X's turn";
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
            restart(trn);
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


