window.onload = () =>{
    var times = document.querySelectorAll('.event');
    var diet = document.querySelectorAll('.event > h3');
    var recipe = document.querySelector('#names');
    console.log(recipe)
    firebase.auth().onAuthStateChanged(function(user){
        
        onlogin()
        firebase.database().ref('/users/' + user.phoneNumber + '/diet/').once('value').then(function(snapshot) {
            for (let index = 0; index < times.length; index++) {
                console.log(user.phoneNumber)
                times[index].setAttribute('data-date',snapshot.val()[index].time.toUpperCase())
                diet[index].innerText = snapshot.val()[index].diet.toUpperCase();
                recipe.innerHTML += '<li>' + snapshot.val()[index].diet.toUpperCase() + '</li>';
            }
        });
    })
    

}