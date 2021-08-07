var modal = document.querySelector('.modal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    onlogin(user);
  }
})


var close = false 
var sidebar = document.querySelector('.sidebar__content')
var bars = document.querySelector('.bars'); 
bars.onclick = () =>{
   if(!close){
    bars.childNodes[1].style.transform = 'rotate(45deg)';
    bars.childNodes[1].style.transformOrigin = '10% 10%';
    bars.childNodes[3].style.opacity = '0';
    bars.childNodes[5].style.transform = 'rotate(-45deg)';
    bars.childNodes[5].style.transformOrigin = '10% 90%';
    close =true;
    sidebar.style.display = 'flex';
    
   }
   else
   {
    bars.childNodes[1].style.transform = 'rotate(0)';
    bars.childNodes[3].style.opacity = '1';
    bars.childNodes[5].style.transform = 'rotate(0)';
    close =false;
    sidebar.style.display = 'none';
   }
   
 }
 

var login = document.querySelector('.button');
login.onclick = function(){
    modal.style.display = 'block'
}

var responsivelogin = document.querySelector('#login');
responsivelogin.onclick = function(){
  modal.style.display = 'block'
}

firebase.auth().setPersistence('local')


var SendOtp = document.querySelector('.login');
SendOtp.onclick = () => {


  var phone = document.querySelector('#phone').value;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submit', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('Captcha resolved');
      }
    });
    var submit = document.querySelector('#submit')
    var appVerifier = window.recaptchaVerifier
    firebase.auth().signInWithPhoneNumber('+91'+ phone, appVerifier)
      .then(function (confirmationResult) {
        submit.style.transform = 'translateY(1000px)';
        submit.style.opacity = '0';
        document.querySelector('#otp__label').style.display = 'block'
        document.querySelector('#otp__label').style.opacity = '1'
        document.querySelector('#otp').style.display = 'block'
        document.querySelector('#otp').style.opacity = '1'
        setTimeout(()=>{
          submit.style.display = 'none';
          document.querySelector('#confirm').style.display = 'block';
        },1000); 
        window.confirmationResult = confirmationResult;
      }).catch(function (error) {
        alert(error.message + " PLEASE REFRESH THE PAGE AND TRY AGAIN");
  })}

  document.querySelector('#confirm').onclick = function(){
    var otp = document.querySelector('#otp').value
    confirmationResult.confirm(otp).then(function (result) {
        onlogin(result);
        }).catch(function (error) {
          alert(error.message + " PLEASE REFRESH THE PAGE AND TRY AGAIN")
        });
  }

var nav_profile = document.querySelector('#nav_profile');
var nav_diet = document.querySelector('#nav_diet');
var nav_signup = document.querySelector('#signup__navbar');
var nav_user = document.querySelector('#users__navbar');
var nav_message = document.querySelector('#messages__navbar');

  const onlogin = (user) =>{
    var number = user.phoneNumber
    document.querySelector('.button').style.display = 'none';
    document.querySelector('#contact').style.borderBottom = 'solid white 1px';
    var logout = document.querySelectorAll('.logout');
    logout.forEach((element) => {
      element.style.display = 'block';  
    })
    
    if (screen.width < 765) {
      responsivelogin.style.display = 'none'
      nav_profile.style.display = 'block'
      nav_diet.style.display = 'block'
    }else{
      document.querySelector('.profile').style.display = 'block'
    }
    modal.style.display = "none";
    
    if(number == '+919987929313'){
      if(screen.width < 765){
        nav_signup.style.display = 'block'
        nav_user.style.display = 'block'
        nav_message.style.display = 'block'
      }
      nav_profile.style.display = 'none';
      nav_diet.style.display = 'none';
      document.querySelector('#users').style.display = 'block';
      document.querySelector('#signup').style.display = 'block';
      document.querySelector('#messages').style.display = 'block';
      document.querySelector('#profile').style.display = 'none';
      document.querySelector('#diet').style.display = 'none';
    }
  }

var logout = document.querySelectorAll('.logout')
logout.forEach(element =>{
  element.onclick = () =>{
    document.querySelector('#submit').style.display = 'block';
    document.querySelector('#confirm').style.display = 'none';
    firebase.auth().signOut().then(function(){
      window.location.href = "index.html";
    })
   }
})

 