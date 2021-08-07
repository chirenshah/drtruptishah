var create = document.querySelector('.sigup__button');
var recipe = [];
var therapy = [];
firebase.firestore().collection("Recipe").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        recipe.push(doc.id);
    });
});
firebase.firestore().collection("Therapy").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        therapy.push(doc.id);
    });
    console.log(therapy)
});


create.onclick = () =>{
    var name = document.querySelector('input[name="Name"]').value;
    var phone = document.querySelector('input[name="phoneNumber"]').value;
    
    var Age = document.querySelector('input[name="Age"]').value;
    var Weight = document.querySelector('input[name="Weight"]').value;
    var Gender = document.querySelector('#gender').value;
    var bp = document.querySelector('input[name="bloodpressure"]').value;
    var history = document.querySelector('textarea[name="history"]').value;
    var medication = document.querySelector('textarea[name="medication"]').value;
    var Symptoms = document.querySelector('textarea[name="Symptoms"]').value;
    var daily__time = document.querySelectorAll('input[name="time"]');
    var daily__content = document.querySelectorAll('input[name="content"]');
    var Urine = document.querySelector('textarea[name="Urine"]').value;
    var Stool = document.querySelector('textarea[name="Stool"]').value;
    var Hunger = document.querySelector('input[name="Hunger"]').value;
    var thirst = document.querySelector('input[name="thirst"]').value;
    var tongue = document.querySelector('input[name="tongue"]').value;
    var teeth = document.querySelector('input[name="teeth"]').value;
    var prakruti = document.querySelector('input[name="prakruti"]').value;
    var mences = document.querySelector('textarea[name="mences"]').value;
    var fingers = document.querySelector('#Fingers').value;
    var bodypart = document.querySelector('#bodypart').value;
    var diet__time = document.querySelectorAll('input[name="diet__time"]');
    var dish = document.querySelectorAll('input[name="dish"]');
    var suggestion = document.querySelectorAll('input[name="TREATMENT"]');

    
    var dietUser = {}
    for (let index = 0; index < diet__time.length; index++) {
        if (diet__time[index].value != '' && dish[index].value != "") {
            dietUser[diet__time[index].value] = dish[index].value;
        }   
    }
    
    var dailyUser = {}
    for (let index = 0; index < daily__content.length; index++) {
        if(daily__time[index].value != "" && daily__content[index].value != ""){
        dailyUser[daily__time[index].value] = daily__content[index].value;
    }
}

    var Personal = {
        phone:"+91"+phone,
        age:Age,
        weight:Weight,
        Gender:Gender,
        Bloodpressure:bp,
        history:history,
        medication:medication,
        Symptoms:Symptoms,
    }

    var treatmentUser = [];
    for (let index = 0; index < suggestion.length; index++) {
        treatmentUser.push(suggestion[index].value);
    }

    var diagnosisUser = {
        Urine:Urine,
        Stool:Stool,
        Hunger:Hunger,
        thirst:thirst,
        tongue:tongue,
        teeth:teeth,
        prakruti:prakruti,
        mences:mences,
        fingers:fingers,
        bodypart:bodypart
    }
    var User = {
        name:name,
            personal: Personal,
            daily:dailyUser,
            diagnosis: diagnosisUser,
            treatment:treatmentUser,
            diet:dietUser
    }

console.log(dailyUser)

    if (!phone || phone.includes('+')) {
        alert('Phone Number Required and without +91')
    }else{
        firebase.firestore().collection("Users").doc("+91"+phone).set({...User})
        .then(function() {
            firebase.firestore().collection("Names").doc(name).set({
                phone:'+91'+phone
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    alert('User Created');    
    }
    
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("form");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
var dish = document.querySelectorAll('input[name="dish"]');
for (let index = 1; index <= dish.length; index++) {
    autocomplete(document.querySelector('#recipe' + index),recipe);
}
var suggestion = document.querySelectorAll('input[name="TREATMENT"]');
for (let index = 1; index <= suggestion.length; index++) {
    autocomplete(document.querySelector('#therapy' + index),therapy);
}