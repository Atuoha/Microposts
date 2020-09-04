class UI{
    constructor(){
        this.post = document.getElementById('posts');
        this.titleInput = document.getElementById('title');
        this.bodyInput = document.getElementById('body');
        this.idInput = document.getElementById('id');
        this.postBtn = document.getElementById('postBtn');
        this.forState = 'add';

    }

    // showPost method
    showPost(posts){
        let output = '';

        posts.forEach((post)=>{
            output += `
                <div class="card mb-3">
                    <div class="card-body">            
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>

                        <a href="#" class="remove card-link" id="${post.id}" data-id="${post.id}"><i class="fa fa-remove" style="color:red;"></i></a> 

                        <a href="#" class="edit card-link" id="${post.id}" data-id="${post.id}"><i class="fa fa-pencil" style="color:green;"></i></a>
                    </div>
                </div>
            `;
        })

        this.post.innerHTML = output;
    }

    showAlert(alert,className){
          this.hideAlert();  

          const div  = document.createElement('div');
          div.classList = className;
          div.appendChild(document.createTextNode(alert));
          document.querySelector('h1').appendChild(div);
          setTimeout(this.hideAlert,3000);

         
    }

    hideAlert(){
        const alert = document.querySelector('.alert');

        if(alert){
            alert.remove();
        }
    }

    clearInput(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Add_editState(){
         //EDIT STATES

        //hide add psot button
        // document.querySelector('.post-submit').style.display = 'none';

        // ADD EDIT STATE BUTTONS
        //edit button
        // const edit_button = document.createElement('button');
        // edit_button.className = 'edit_btn btn btn-primary btn-block'
        // edit_button.appendChild(document.createTextNode('Edit Element'));
        // document.querySelector('.card-form').appendChild(edit_button);

        // add cancel button
        // const cancel_button = document.createElement('button');
        // cancel_button.className = 'cancel btn btn-secondary btn-block'
        // cancel_button.appendChild(document.createTextNode('Cancel'));
        // document.querySelector('.card-form').appendChild(cancel_button);

        //EDIT STATES
    // }

    Clear_editState(){
        // Clear Edit state Function
        this.Change_editState('add');
        document.querySelector('.cancel').style.display = 'none';

         //clear ID from hidden field
         this.idInput.value = '';
    }

    fillForm(data){
        this.titleInput.value  = data.title;
       this.bodyInput.value = data.body;
       this.idInput.value = data.id;
       this.Change_editState('edit');
    }

    Change_editState(type){
        if(type === 'edit'){
            this.postBtn.textContent = 'Edit Content';
            this.postBtn.className = 'btn btn-warning btn-block';


            //remove cancel button if exist
            const cancelBtn = document.querySelector('.cancel');
            if(cancelBtn){
                cancelBtn.remove();
            }

             // add cancel button
            const cancel_button = document.createElement('button');
            cancel_button.className = 'cancel btn btn-light btn-block'
            cancel_button.appendChild(document.createTextNode('Cancel'));
            document.querySelector('.card-form').appendChild(cancel_button);

        }else{
            this.postBtn.textContent = 'Post it';
            this.postBtn.className = 'btn btn-danger btn-block';

             // clear input
             this.clearInput();

             //remove cancel button if exist
             const cancelBtn = document.querySelector('.cancel');
             if(cancelBtn){
                 cancelBtn.remove();
             }

             //clear ID from hidden field
             this.idInput.value = '';

        }
    }

}

export const ui = new UI();