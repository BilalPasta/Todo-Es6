let username=document.getElementById('todologo');



 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIu1WuePZvI_2xUPBxItUL57nt7ay2p6I",
    authDomain: "hello-993f9.firebaseapp.com",
    databaseURL: "https://hello-993f9.firebaseio.com",

  };
  firebase.initializeApp(config);
let auth=firebase.auth();
let database = firebase.database().ref("/");
let CurrentUser=localStorage.getItem('CurentUser');
// console.log(database);
let input = document.getElementById("demo");
let list = document.getElementById("list");
var addBtn=document.getElementById('add');
 add=()=>{
    let Userinfo = {
        todo: input.value,
    };
    auth.onAuthStateChanged((user)=> {
  if (user) {
  database.child(`${user.uid}/Todolist` ).push(Userinfo);
    input.value = '';
  } else {
  }
});  
}
auth.onAuthStateChanged((user)=> {
  if (user) {
database.child(`${user.uid}/userinfo`).on("child_added", (snapshot)=>{
    var obj = snapshot.val();
   username.innerHTML=`${obj.FirstName} ${obj.LastName}`;
});
      
database.child(`${user.uid}/Todolist`).on("child_added", (snapshot)=>{
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
});

  } else {

  }
});


 clearall=()=>{
      auth.onAuthStateChanged((usr)=> {
  if (usr) {
database.child(`${usr.uid}/Todolist` ).remove();

  }
  else {

  }
});



}

 render=(user)=>{


    let li = document.createElement("LI");
    let text = document.createTextNode(user.todo);
    li.appendChild(text);
    li.setAttribute("id", user.id);
    li.setAttribute('class','list-group-item');

    let deleteBtn = document.createElement("BUTTON");
    deleteBtn.setAttribute('class','btn btn-danger float-right');
    let btnText = document.createTextNode("Delete");
    deleteBtn.appendChild(btnText);
let EditBtn=document.createElement('button');
    EditBtn.setAttribute('class','btn btn-secondary float-right');
     let btnText1 = document.createTextNode("Edit");
     EditBtn.appendChild(btnText1);
         li.appendChild(deleteBtn);
         li.appendChild(EditBtn);
    list.appendChild(li);
    deleteBtn.onclick = ()=> {
        console.log(user.id);
        remove(user.id);
    }
    EditBtn.onclick= ()=>{
        editFunc(user);
    }}


 Logout=()=>{
  firebase.auth().signOut().then(()=> {
location.assign('index.html');
}).catch((error)=> {
});

}


     editFunc=(user)=>{
     input.value=user.todo;
     addBtn.innerHTML='save';
     addBtn.onclick= ()=>{
         save(user);
     }
    }

     save=(user)=>{
     
        var newData={
           todo:input.value,
        };

        auth.onAuthStateChanged((usr)=> {
  if (usr) {
database.child(`${usr.uid}/Todolist/${user.id}` ).update(newData);
addBtn.innerHTML='Add';
addBtn.onclick=()=>{
    add();
}
input.value='';

  } 
  else {

  }
}); }


        auth.onAuthStateChanged((usr)=> {
  if (usr) {
database.child(`${usr.uid}/Todolist`).on('child_changed',(EditObje)=>{
    let newObj=EditObje.val();
    newObj.id=EditObje.key;
   document.getElementById(newObj.id).firstChild.nodeValue=newObj.todo;
});
  }
else{}

});
var removeuserid='';
 remove=(key)=>{
    auth.onAuthStateChanged((usr)=>{
        if(usr){
database.child(`${usr.uid}/Todolist/` + key).remove();
removeuserid=`${usr.uid}/Todol/ist`;
        }
   

    });
}

 database.child(`${CurrentUser}/Todolist`).on("child_removed", (data)=>{
console.log(removeuserid);
    let deletedLi = document.getElementById(data.key);
    console.log(deletedLi);
    deletedLi.remove();
});



