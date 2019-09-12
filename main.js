    const todoList = document.getElementById(`todoList`);
    const text = document.getElementById(`text`);
    const addButton = document.getElementById(`addButton`);

    const todo= [];
    const textValue = text.value;
    const index = todo.indexOf(textValue);

    const every = document.getElementById(`every`);
    const ctn = document.getElementById(`ctn`);
    const cmp = document.getElementById(`cmp`);


    addButton.addEventListener(`click`, ()=>{
      const textValue = text.value;

      todo.push(textValue);
      text.value = "";


      console.log(todo);

      const working = `作業中`;
      const perfect = `完了`;
      const finish = `削除`;
    // ----------------------------------
    // table　追加したコメントの作成

      const ele = document.createElement(`tr`);
        todoList.appendChild(ele);

      const numId = document.createElement(`td`);
        numId.innerHTML += todo.length-1;

        ele.appendChild(numId);

      const comment = document.createElement(`td`);
        comment.innerHTML += textValue;

        ele.appendChild(comment);

      function addStatusButton(){
        const statusButton = document.createElement(`button`);
        statusButton.setAttribute(`value`, `working`);
        statusButton.textContent = working;

        statusButton.addEventListener(`click`, ()=> {
          if (statusButton.value === `working`) {
            statusButton.setAttribute(`value`, `perfect`);
            statusButton.textContent = perfect;
          } else {
            statusButton.setAttribute(`value`, `working`);
            statusButton.textContent = working;
          }
        });
        return statusButton;
      }

        const statusButton = addStatusButton();
        const stateEle = document.createElement(`td`);

        ele.appendChild(stateEle);
        stateEle.appendChild(statusButton);



      function  addDeleteButton(){
        const deleteButton = document.createElement(`button`);
          deleteButton.setAttribute(`value`, `finish`);
          deleteButton.textContent = finish;

        deleteButton.addEventListener(`click`, function(){
            todoList.removeChild(ele);
          })
          return deleteButton;
        }

        const deleteButton = addDeleteButton();
        const deleteEle = document.createElement(`td`);

        ele.appendChild(deleteEle);
        deleteEle.appendChild(deleteButton);


      // addstb();
      //
      // adddlt();




      ctn.addEventListener(`click`, ()=>{
        if (statusButton.value === `working`) {
          ele.style.display = "" ;
        }else {
          ele.style.display = "none";
        }
      })


      cmp.addEventListener(`click`, ()=>{
        if (statusButton.value === `perfect`) {
          ele.style.display = "" ;
        }else {
          ele.style.display = "none";
        }
      })

      every.addEventListener(`click`, ()=>{
        ele.style.display = "";
      })



})
