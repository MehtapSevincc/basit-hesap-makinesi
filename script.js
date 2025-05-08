const display =document.querySelector('.hesapmakinesi-input');
const keys=document.querySelector('.keys');

let displayValue='0';
let firstValue= null;
let secondValue=null;
let operator=null;
let waitingforSecondValue= false;
updateDisplay();
function updateDisplay(){
    display.value=displayValue;
}
function inputNumber(num) {
    if (waitingforSecondValue) {
        displayValue += ' ' + num;
        secondValue=parseFloat(num);
        waitingforSecondValue=false;
    } else {
        displayValue= displayValue==='0'? num: displayValue+num;
        secondValue=parseFloat(displayValue);
    }   
} 
function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue+= '.';
        updateDisplay();
    }
}
keys.addEventListener('click',function(e){ //tum buton tiklamalarini bir yerden yonetir
    const element=e.target;
    if(!element.matches('button')) 
        return ;
    const value=element.value;

     switch(value){
        case '+':
        case '-':
        case '*':
        case '/':

        handleOperator(value)  ;
        break;

        case '.':
        inputDecimal();
        break;
        
         case '=':
            if(operator!==null && firstValue !==null &&!waitingforSecondValue ){
                secondValue=parseFloat(display.value.split(' ').slice(-1)[0]); //delete tusundan sonra girilen gercek degeri dogru hesaplamasi icin 
                const result= calculate(firstValue,secondValue,operator);
                displayValue=String(result);
                firstValue=null;
                operator=null;
                secondValue=null;
                waitingforSecondValue=false;
                updateDisplay();
            }
          break;
          case '%':
        if(operator && firstValue!==null){
            secondValue=(firstValue*parseFloat(displayValue))/100; 
            displayValue=String(secondValue);
        } else{
            displayValue=String(parseFloat(displayValue)/100); // operator olmadiginda girilen sayininin yuzdesini hesaplar
        }
        updateDisplay();
        break;
        case 'square':
            displayValue=String(Math.pow(parseFloat(displayValue),2));
            updateDisplay();
            break;
         case 'clear': 
         displayValue='0';
         firstValue=null;
         operator=null;
         waitingforSecondValue=false;
         updateDisplay();
         break;
         case 'delete':
          if(displayValue.length===1){  //son silme islemi yapildiginda ekranda 0 gostermeye yarar
            displayValue='0';
          }  else{
            displayValue=displayValue.slice(0,-1);// 0 ile bastan alir -1 ile sondan bir karakter eksik yazar
          }
          updateDisplay( );
          break;
 default :  
    inputNumber(value);
    updateDisplay();
    break;
  }
});
 function handleOperator(nextOperator){ 
    const currentValue=parseFloat(displayValue);

    if(waitingforSecondValue){
        operator=nextOperator;
        displayValue=firstValue + " " + operator;
        updateDisplay();
        return;
    }
     if(firstValue===null &&!isNaN(currentValue)){ //islem baslar
        firstValue=currentValue;
        displayValue=displayValue + " " + nextOperator;
     }
     else if(operator){ // iki sayinin islemini yapip tek sayiya dusurur
            const result =calculate(firstValue,currentValue,operator);
            displayValue=String(result) + " " + nextOperator;
            firstValue=result;    
     }
     operator=nextOperator;
     waitingforSecondValue=true;    
     updateDisplay();
    }
    
function calculate(first,second,operator){
    if(operator==='+'){
        return first+second;
    }
    else if(operator==='-'){
        return first-second;
    }
    else if(operator==='*'){
        return first*second;
    }
    else if(operator==='/'){
        if(second===0){
            return 'hata';
        }
        return first/second;
    } 
}








