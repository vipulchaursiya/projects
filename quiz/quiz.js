function check(){
  var q1=document.quiz.question1.value;   
  var q2=document.quiz.question2.value;
  var q3=document.quiz.question3.value;
  var correct=0;
  
  if(q1=="delhi")
  correct++;
  if(q2=="jaipur")
  correct++;
  if(q3=="panaji")
  correct++;
  

  var range=0;

  var messages=["Great job!","That's just okay","You need to do better"];
  var pictures=["img/low.gif","img/candomore.gif","img/victory.gif"]; 
  switch(correct){
    case 1:
      range=1;
      break;
    case 2:
      range =0;
      break;
    case 3:
       range=0; 
       break; 
    default:
       range=2;   
  }
  document.getElementById("message").innerHTML= messages[range]; 
  document.getElementById("after_submit").style.visibility="visible";
  document.getElementById("number_correct").innerHTML= "you got "+ correct+" correct.";
   document.getElementById("picture").src=pictures[range];
}  