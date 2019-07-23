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

     var emailinput = document.getElementById("conemail").value;
     var emailelem = document.getElementById("conemail");
     emailelem.setAttribute('pattern',"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
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
	checkemail();
    
         	
}

function checkemail(){
	
var e = document.getElementById("reason");

var user = {
    name:document.getElementById('fname').value,
    conemail:document.getElementById('conemail').value,
	reason:e.options[e.selectedIndex].value,
	subject:document.getElementById('subject').value
}


callHttp('https://wefixproject.herokuapp.com/cont',user,'POST');
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
		 else{
			  document.getElementById('cont').action = data.ok; //Will set it	   
              document.getElementById('cont').submit();
		 }
		 
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            $('#lblResponse').html('Error connecting to the server.');
        },
    });
}