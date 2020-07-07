var panCard = document.getElementById("pan");
var panEx = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
var mobNo = document.getElementById("mobile");
var mobEx = /^\d{10}$/;
var otpEx = /^\d{4}$/; 


var form = document.getElementById('form');
var errorElement = document.getElementById('error');
var name = document.getElementById('name').value;
var getOtpB = document.getElementById('getOtpB');  
var submitB = document.getElementById('submitB');  
var reset = document.getElementById('reset');  


var link = document.getElementById("link");
link.style.display = "none";
var newScreen = document.getElementById("newScreen");
newScreen.style.display = "none";
var timerOn = true;


var otp = document.getElementById('otp'); 





form.addEventListener('submit', (e) => {
  let messages = []
  
  if (panEx.test(panCard.value.toUpperCase()) == false ) {

     messages.push("*Invalid PAN Number");
}

if (mobEx.test(mobNo.value) == false)   
        {  
             messages.push("*Invalid Mobile Number.")  
        } 



  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(', \n');
  }


 if (messages.length == 0) {

errorElement.innerText = " ";
sendOtp();   

}
 e.preventDefault();

})




function verifyOtp() {
submitB.onclick= function otpValidation() {
 if (otpEx.test(otp.value) == false)   
        {  
            document.getElementById('error').innerHTML = "*Invalide OTP";
        } 
else {

 document.getElementById('error').innerHTML = "";
var raw = "{\n    \"mobile\": document.getElementById('mobile'),\n    \"otp\": 2222\n}";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://be82e237-b88a-4237-873f-c49ad8dd999f.mock.pstmn.io/service/verifyOtp", requestOptions)
  .then(response => response.text())
  .then(result => (console.log(result), dislpayName(), (newScreen.style.display = "block"), (link.style.display = "none"), (timer.style.display = "none")))
  .catch(error => console.log('error', error));
}
}
}

function sendOtp() {
var raw = "{\n    \"panNumber\": \"document.getElementById('pan'),\",\n    \"city\": \"document.getElementById('city'),\",\n    \"fullname\": \"document.getElementById('name'),\",\n    \"email\": \"document.getElementById('email')\",\n    \"mobile\": document.getElementById('mobile')\n}";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://be82e237-b88a-4237-873f-c49ad8dd999f.mock.pstmn.io/service/getOtp", requestOptions)
  .then(response => response.text())
  .then(result => (console.log(result), (result.status = "Success")? ((otp.type = "text"), (submitB.style.display = "block"), resendOtpLink(180),(getOtpB.style.display = "block"), (reset.style.display = "none"),(link.style.display = "block"), (getOtpB.style.display = "none"), verifyOtp() ): console.log("Error"))
 


)
  .catch(error => console.log('error', error));
}




function  resendOtpLink(resendOtpTime) {
document.getElementById("link").disabled = true;
  var m = Math.floor(resendOtpTime / 60);
  var s = resendOtpTime % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('timer').innerHTML = "Resend OTP in" + " " + m + ':' + s + "mins";
 resendOtpTime -= 1;
  
  if(resendOtpTime >= 0 && timerOn) {
    setTimeout(function() {
       resendOtpLink(resendOtpTime);

    }, 1000);
    return;
  }


  if(!timerOn) {
    return;

  }
  
  
link.style.disabled = "false";
document.getElementById("link").disabled = false;
link.style.color = "blue";
counter
if(counter >= 3)
{
document.getElementById("link").disabled = true;
 document.getElementById('timer').innerHTML = "Please try again after an hour.";
link.style.display = "none";
}


}


var counter = 0;
function btnclick() {
link.style.color = "red";
counter++;

}

function dislpayName() {
var name = document.getElementById("name").value;
alert("Thank you for verification" + " " + name);
}

