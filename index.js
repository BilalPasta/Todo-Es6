 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIu1WuePZvI_2xUPBxItUL57nt7ay2p6I",
    authDomain: "hello-993f9.firebaseapp.com",
    databaseURL: "https://hello-993f9.firebaseio.com",

  };
  firebase.initializeApp(config);
let emailInput=document.getElementById('getemail');
let passInput=document.getElementById('getpass');

database=firebase.database().ref('/');
auth=firebase.auth();
database=firebase.database().ref('/');

 signin=()=>{
  let user={
    email:emailInput.value,
    password:passInput.value
  };
    auth.signInWithEmailAndPassword(user.email,user.password).catch((error)=>{
    // document.getElementById('Error').innerHTML=" <div class='alert alert-success Profile' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'>  <span aria-hidden='true'>&times;</span>  </button> <h4 class='alert-heading'>Error</h4> <hr>  <p class='mb-0'>"+error.message+ '</p></div>'  ;


}).then((usr)=>{
  console.log(usr);
    localStorage.setItem('CurentUser',usr.uid);
    emailInput.value='';
  passInput.value='';
location='home.html';
});}


// database.child('Users').on('value',function (snap){
//   var allusers=snap.val();
//   console.log();

// });

 sigup=()=>{
  location='signup.html';
}





