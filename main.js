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

      function addstb() {
        const stateEle = document.createElement(`td`);
        const stateButton = document.createElement(`button`);
        stateButton.setAttribute(`value`, `working`);
        stateButton.textContent = working;

        ele.appendChild(stateEle);
        stateEle.appendChild(stateButton);

        stateButton.addEventListener(`click`, function(){
          if (stateButton.value === `working`) {
            stateButton.setAttribute(`value`, `perfect`);
            stateButton.textContent = perfect;
          } else {
            stateButton.setAttribute(`value`, `working`);
            stateButton.textContent = working;
          }
        })
      }


      function  adddlt(){
        const deleteEle = document.createElement(`td`);
        const deleteButton = document.createElement(`button`);
          deleteButton.setAttribute(`value`, `finish`);
          deleteButton.textContent = finish;

          ele.appendChild(deleteEle);
          deleteEle.appendChild(deleteButton);

        deleteButton.addEventListener(`click`, function(){
            todoList.removeChild(ele);
          })

        }


      addstb();

      adddlt();




      ctn.addEventListener(`click`, ()=>{
        if (stateButton.value === `working`) {
          ele.style.display = "" ;
        }else {
          ele.style.display = "none";
        }
      })


      cmp.addEventListener(`click`, ()=>{
        if (stateButton.value === `perfect`) {
          ele.style.display = "" ;
        }else {
          ele.style.display = "none";
        }
      })

      every.addEventListener(`click`, ()=>{
        ele.style.display = "";
      })



})
