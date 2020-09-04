
// common js 
// const person = require('./module1');

// ES2015

// import { person , greet } from './module2';
// console.log(person.name);
// console.log(greet());

// To export everything from a module without having to specify the one you want use
//mod here can be any word
// import * as mod from './module2';

// To access them use
// console.log(mod.person.name);
// console.log(mod.greet());


// To import a default export from a module use  (A default export is specified using: (export default CHOICEitem) );
// import career from './module2';

// console.log(career);



// MAIN WORK STARTS HERE

//importing EasyHttp object
import{ http } from './http';

//importing UI class object
import { ui } from './ui';


// Get 
document.addEventListener('DOMContentLoaded',getPost);

function getPost(){
    http.get('http://localhost:3000/posts')
    .then(data =>{
       ui.showPost(data);
    })
    .catch(err => console.log('Error'))
}

// Add Post
document.getElementById('postBtn').addEventListener('click',submitPost);



function submitPost(){

    //Collect data input 
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

   
    if(title !== '' && body !== ''){
       

       const data = {
        title,
        body
        
    }
    //ID fIELD TO determine ADD or EDITING post
    const idField = document.getElementById('id').value;

       
       if(idField == ''){
            // Add post

               //create post
        http.post('http://localhost:3000/posts',data)
        .then(result =>{
            getPost();
            ui.showAlert('Post saved successfully!','alert alert-success');
            ui.clearInput()
            console.log(result);
            
        })
        .catch(err =>{
            console.log(err)  // there is an error
        })

       }else{
           // Edit post

           //edit post
           http.put(`http://localhost:3000/posts/${idField}`,data)
           .then(result =>{
               ui.showAlert('Post updated successfully','alert alert-success');
               getPost();
               ui.clearInput();
               ui.Clear_editState();
           })
           .catch(err => console.log('ERROR'))
       }
       
         

//inputs are empty
    }else{
        ui.showAlert('Fields can\'t be empty! ','alert alert-danger');
        console.log('inputs can\'t be empty ')
    }
}


// delete Post eventlistener
document.body.addEventListener('click',deletePost)

// delete post function
function deletePost(e){
    if(e.target.parentElement.classList.contains('remove')){
        const element = e.target.parentElement;
        const id = element.id;

        if(confirm('Are you sure you want to delete this ?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(result =>{
                ui.showAlert('Post deleted successfully','alert alert-success')
                getPost();
            })
            .catch(err => console.log('error'));

        }
        
        

    }
  e.preventDefault();  
}

// Edit eventListener
document.getElementById('posts').addEventListener('click',editPost);

function editPost(e){
    if(e.target.parentElement.classList.contains('edit')){

        // Add edit state
    //    ui.Add_editState();


        // Obtain Related stuffs Like ID,TITLE AND BODY of the content to be edited
        const element = e.target.parentElement;   
        const id = element.id;
        const body = element.previousElementSibling.previousElementSibling.innerHTML;
        const title = element.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  
        // create data for updating
        const data = {
            id,
            title,
            body
        } 

          // Pass-in the retrieved contents to the input boxes up
          ui.fillForm(data)


        // Change sumbit button textContent
        



        console.log(id,body,title);
    }
}


// Cancel eventListener
document.querySelector('.card-form').addEventListener('click',cancelEdit);

function cancelEdit(e){
    if(e.target.classList.contains('cancel')){
        ui.Clear_editState();
    }   
    e.preventDefault();
}
