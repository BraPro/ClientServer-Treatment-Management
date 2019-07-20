
var message="Must contain at least one lowercase,one uppercase,one uppercase,one special character and 6 or more characters";
var supposemail ="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
var checkspecial = /(?=.*[^a-zA-Z0-9])/;
 // var lowerCaseLetters = /[a-z]/g;
 // var upperCaseLetters = /[A-Z]/g;
 // var numbers = /[0-9]/g;
 // var Specialchar = /[!@#$%^&*()_+/|{};:/?.<>]/g; 
 // var check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+/|{};:/?.<>]).{6,}/;
 // var goodcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
// Validate lowercase letters ,  // Validate capital letters ,  // Validate numbers , // Validate length , // Validate Special Characters



function ValidationFunction(){ 
    
	 var emailinput = document.getElementById("inputEmail").value;
     var passinput = document.getElementById("inputPassword").value; 
     var emailelem = document.getElementById("inputEmail");
     var passelem = document.getElementById("inputPassword");
     emailelem.setAttribute('pattern',"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
     passelem.setAttribute('pattern',"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,64}$");
	    

 // Validate empty email
  
  if(emailinput=="")
  { 
      emailelem.focus();
	  return false;
  }
   // Validate not @ email
   
  if(!emailinput.match("@"))
  {
      emailelem.title= "Not @ on email";
      passelem.title= "Not @ on email";
      emailelem.focus();
	  return false;
  }
  
   // Validate wrong email
  
  if(!(emailinput.match(supposemail)))
  {
      emailelem.title="Not an email form {example@abc.com}";
      passelem.title="Not an email form {example@abc.com}";
      emailelem.focus();
	  return false;
  }
  
  emailelem.title= "Good Email";
  // Validate empty password
  if(passinput=="")
  {
      passelem.focus();
      passelem.title= "Empty password field.";
	  return false;
  }
  
  // Validate lowercase password
  if(!(passinput.match(/[a-z]/g)))
  {
      passelem.focus();
	  passelem.title="Must contain at least one lowercase";
	  return false;  
  }

 // Validate capital password
  if(!(passinput.match(/[A-Z]/g)))
  { 
      passelem.focus();
	  passelem.title="Must contain at least one capital";
	  return false;  
  }
  
  // Validate number password
  if(!(passinput.match(/[0-9]/g)))
  {
      passelem.focus();
      passelem.title="Must contain at least one number";
	  return false;  
  }
  
  
  // Validate special char password
  if(!(passinput.match(checkspecial)))
  {
      passelem.focus();
	  passelem.title="Must contain at least one special character";
	  return false;  
  }
  
  
  // Validate length
  if(!(passinput.length >= 6))
  {
      passelem.focus();
	  passelem.title="Must contain 6 or more characters";
	  return false;  
  }
 
       
       passelem.title="Good Password";
       //alert("Login successful!\nEmail:"+emailinput+"\nPassword:"+passinput);  
	   document.getElementById('login').action = "/login"; //Will set it	   
       document.getElementById("login").submit();
}


function RegisterValFunction(){ 
    
    var regemail = document.getElementById("inputEmail").value;
    var regpass1 = document.getElementById("inputPassword").value; 
    var regpass2 = document.getElementById("inputCPassword").value; 
    var regemailelem = document.getElementById("inputEmail");
    var regpass1elem = document.getElementById("inputPassword");
    var regpass2elem = document.getElementById("inputCPassword");
    regemailelem.setAttribute('pattern',"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    regpass1elem.setAttribute('pattern',"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,64}$");
    regpass2elem.setAttribute('pattern',"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,64}$");

// Validate empty email
 
 if(regemail=="")
 { 
     regemailelem.focus();
     return false;
 }
  // Validate not @ email
  
 if(!regemail.match("@"))
 {
     regemailelem.title= "Not @ on email";
     regpass1elem.title= "Not @ on email";
     regpass2elem.title= "Not @ on email";
     regemailelem.focus();
     return false;
 }
 
  // Validate wrong email
 
 if(!(regemail.match(supposemail)))
 {
     regemailelem.title="Not an email form {example@abc.com}";
     regpass1elem.title="Not an email form {example@abc.com}";
     regpass2elem.title="Not an email form {example@abc.com}";
     regemailelem.focus();
     return false;
 }
 
    regemailelem.title= "Good Email";
 // Validate empty password
 if(regpass1=="")
 {
     regpass1elem.focus();
     regpass1elem.title= "Empty password field.";
     regpass2elem.title= "Empty password field.";
     return false;
 }
 
 // Validate lowercase password
 if(!(regpass1.match(/[a-z]/g)))
 {
    regpass1elem.focus();
    regpass1elem.title="Must contain at least one lowercase";
    regpass2elem.title="Must contain at least one lowercase";
     return false;  
 }

// Validate capital password
 if(!(regpass1.match(/[A-Z]/g)))
 { 
    regpass1elem.focus();
    regpass1elem.title="Must contain at least one capital";
    regpass2elem.title="Must contain at least one capital";
     return false;  
 }
 
 // Validate number password
 if(!(regpass1.match(/[0-9]/g)))
 {
    regpass1elem.focus();
    regpass1elem.title="Must contain at least one number";
    regpass2elem.title="Must contain at least one number";
     return false;  
 }
 
 
 // Validate special char password
 if(!(regpass1.match(checkspecial)))
 {
    regpass1elem.focus();
    regpass1elem.title="Must contain at least one special character";
    regpass2elem.title="Must contain at least one special character";
     return false;  
 }
 
 
 // Validate length
 if(!(regpass1.length >= 6))
 {
    regpass1elem.focus();
    regpass1elem.title="Must contain 6 or more characters";
    regpass2elem.title="Must contain 6 or more characters";
     return false;  
 }

      regpass1elem.title="Good Password";
      regpass2elem.title="write password again";

      // Validate the 2 fields have the same password.
if(regpass1!=regpass2)
{
    regpass2elem.focus();
    regpass2elem.title="Both password does not match";
    return false;  

}

     // alert("Registration Completed!\nEmail:"+regemail+"\nPassword:"+regpass1); 
	 document.getElementById('login').action = "/register"; //Will set it
	 document.getElementById("login").submit();
}


function showConfirmPassword(){
document.getElementById('inputPasswordDiv').style.display = 'block';
document.getElementById('header').innerHTML = 'Sign In'
document.getElementById('login-Btn').style.display = 'none';
document.getElementById('signInBtn').style.display = 'inline';
document.getElementById('logInSpan').style.display = 'inline';
document.getElementById('signInSpan').style.display = 'none';
}

function backToLogin(){
document.getElementById('inputPasswordDiv').style.display = 'none';
document.getElementById('header').innerHTML = 'Log in to Your Account'
document.getElementById('login-Btn').style.display = 'inline';
document.getElementById('signInBtn').style.display = 'none';
document.getElementById('logInSpan').style.display = 'none';
document.getElementById('signInSpan').style.display = 'inline';
}


/*
function Register(){
var user = {
    password:document.getElementById('inputPassword').value,
    email:document.getElementById('inputEmail').value
}
callHttp('http://localhost:8080/register',user,'POST');
}

function login(){
    var user = {
        password:document.getElementById('inputPassword').value,
        email:document.getElementById('inputEmail').value
    }
 callHttp('http://localhost:8080/login',user,'GET');
}

function callHttp(url,data,type){
    $.ajax({
        url: url,
        data: data,
        type: type,
        success: (data) => {
            console.log(data);
         if(data.error){
             alert(data.error);
         }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            $('#lblResponse').html('Error connecting to the server.');
        },
    });
}*/