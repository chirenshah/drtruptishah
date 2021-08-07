auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log('success')
    } else {
        
    }
    }, function(error) {
      console.log(error);
    });
  

const loginB = document.querySelector('#login')
loginB.addEventListener('click',(e) => {
    e.preventDefault()
    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    auth.signInWithEmailAndPassword(email.value, password.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' ' + errorMessage)
    });
})

const test = document.querySelector('#test');
test.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('clicked')
    const adminRole = functions.httpsCallable('addAdminRole');
    adminRole().then(result =>{
        console.log(result);
    })
})
