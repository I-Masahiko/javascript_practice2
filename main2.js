'use strict';

//----------------------------------------
// 定数
//----------------------------------------
const TYPE = {
  ALL: '全て',
  DOING: '作業中',
  DONE: '完了'
};

//----------------------------------------
// グローバル変数
//----------------------------------------
const todos = []; //タスク格納用配列
let selectedRadioType = TYPE.ALL; //選択されているラジオボタンのタイプ

//----------------------------------------
// ●createStatusBtn●
// statusBtnを生成する関数
// [引数]
//   index : 選択されたタスクのインデックス
// [戻り値]
//   statusBtn：タスクの作業中と完了を切り替えるボタン
//----------------------------------------
const createStatusBtn = index => {
  //ボタンを生成
  const statusBtn = document.createElement('button');
  statusBtn.textContent = todos[index].status;

  //イベントを追加
  statusBtn.addEventListener('click', () => {
    //statusを変更
    todos[index].status =
      todos[index].status === TYPE.DOING
        ? TYPE.DONE
        : TYPE.DOING;

    //todosを再表示
    displayTodos(selectedRadioType);
  });

  return statusBtn;
}

//----------------------------------------
// ●createRemoveBtn●
// removeBtnを生成する関数
// [引数]
//   index : 選択されたタスクのインデックス
// [戻り値]
//   removeBtn：タスクを削除するボタン
//----------------------------------------
const createRemoveBtn = index => {
  //ボタンを生成
  const removeBtn = document.createElement('button');
  removeBtn.textContent = `削除`;

  //イベントを追加
  removeBtn.addEventListener('click', () => {
    //選択されたタスクを削除
    todos.splice(index, 1);

    //todosを再生成
    createTodos();

    //todosを再表示
    displayTodos(selectedRadioType);
  });

  return removeBtn;
}

//----------------------------------------
// ●createTodos●
// taskエレメントを生成する関数
// [引数]
//   task：フォームに入力されたtaskの内容
// [戻り値]
//   なし（グローバル変数を操作）
//----------------------------------------
const createTodos = task => {

  //タスクが指定された場合はタスクを追加
  if (task) {
    const todo = { task, status: TYPE.DOING };
    todos.push(todo);
  }

  //タスクのIDを定義
  todos.forEach((todo, index) => {
    todo.id = index + 1;
  })
}

//----------------------------------------
// ●displayTodos●
// タスクの表示を切り替える関数
// [引数]
//   radioType：選択されているラジオボタンのタイプ
// [戻り値]
//   なし（表示を切り替え）
//----------------------------------------
const displayTodos = radioType => {

  //選択されているラジオボタンに応じてtodosをフィルタリング
  const filteredTodos = filterTodos(radioType);

  //tbodyタグを取得
  const todoList = document.getElementById('todo-list');

  //初期化
  todoList.textContent = '';

  filteredTodos.forEach((filteredTodo, index) => {
    //todo表示用tr要素を生成
    const taskElement = document.createElement('tr');

    //ID表示用td要素を生成
    const idElement = document.createElement('td');
    const taskId = filteredTodo.id;
    idElement.textContent = taskId;

    //task表示用td要素を生成
    const commentElement = document.createElement('td');
    commentElement.textContent = filteredTodo.task;

    //statusBtn表示用td要素を生成
    const statusBtnElement = document.createElement('td');
    const statusBtn = createStatusBtn(taskId - 1);
    statusBtnElement.appendChild(statusBtn);

    //deleteBtn表示用td要素を生成
    const removeBtnElement = document.createElement('td');
    const removeBtn = createRemoveBtn(taskId - 1);
    removeBtnElement.appendChild(removeBtn);

    //生成したtdをtrにセット
    taskElement.appendChild(idElement);
    taskElement.appendChild(commentElement);
    taskElement.appendChild(statusBtnElement);
    taskElement.appendChild(removeBtnElement);

    todoList.appendChild(taskElement);
  })
}

//----------------------------------------
// ●filterTodos●
// ラジオボタンに応じてタスクをフィルタリングする関数
// [引数]
//   radioType：選択されているラジオボタンのタイプ
// [戻り値]
//   フィルタリング後のタスク配列
//----------------------------------------
const filterTodos = radioType => {

  //「全て」が選択されているときはそのまま
  if (radioType === TYPE.ALL) {
    return todos.slice();
  }

  //それ以外の時はフィルタリング
  return todos.filter(todo => {
    return todo.status === radioType;
  });
}

//----------------------------------------
// 追加ボタンを押下したときの処理
//----------------------------------------
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {

  //<iuput>タグに入力された値を取得
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value

  //タスクを追加
  createTodos(task);

  //タスクを表示
  displayTodos(selectedRadioType);

  //inputを初期化
  taskInput.value = '';
});

//----------------------------------------
// ラジオボタンを押下したときの処理
//----------------------------------------
const radioAll = document.getElementById('radio-all');
const radioDoing = document.getElementById('radio-doing');
const radioComplete = document.getElementById('radio-complete');

radioAll.addEventListener('change', () => {
  selectedRadioType = TYPE.ALL;
  displayTodos(selectedRadioType);
});

radioDoing.addEventListener('change', () => {
  selectedRadioType = TYPE.DOING;
  displayTodos(selectedRadioType);
});

radioComplete.addEventListener('change', () => {
  selectedRadioType = TYPE.DONE;
  displayTodos(selectedRadioType);
});

