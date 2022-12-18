const input = document.querySelector("input");
const todoContainer = document.querySelector(".tasks");
let todoArr = [];
let test;
class Todo {
  id = (new Date().getTime() + "").slice(-10);
  constructor(title) {
    this.title = title;
  }
  _createTodo() {
    let editedVal = "";
    const div = document.createElement("div");
    div.classList.add("todo");
    div.dataset.id = this.id;
    const divContent = document.createElement("p");
    divContent.classList.add("task");
    ////////////////////////////////////////////////////////////
    // Start Edit Todo
    const editInput = document.createElement("input");
    editInput.classList.add("editedInput");

    // editInput.style.display = "none";
    div.append(editInput);
    // End Edit Todo
    ///////////////////////////////////////////////////////////////
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("delete");
    btnDelete.append("Delete");
    btnDelete.dataset.id = `${this.id}`;
    ///////////////////////////////////////////////////////////////

    // ////////////////////
    // Start edit button
    const btnEdit = document.createElement("button");
    btnEdit.dataset.id = this.id;
    div.append(btnEdit);
    btnEdit.append("Edit");
    btnEdit.classList.add("edit");
    var self = this;
    //TRICK  Event Listenr
    btnEdit.addEventListener("click", function (e) {
      ///// Test

      ////////////////
      editInput.classList.add("showInput");
      editInput.value = divContent.textContent;
      editInput.focus();
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          editInput.classList.remove("showInput");
          divContent.textContent = editInput.value;
          editedVal = editInput.value;
          self.title = editedVal;
          localStorage.setItem("todos", JSON.stringify(todoArr));
        }
      });
    });
    // END
    ///////////////////////////////////////////////////////////////
    divContent.textContent = this.title;
    div.prepend(divContent);
    div.append(btnDelete);
    todoContainer.append(div);
    input.value = "";
    //
    //
    btnDelete.addEventListener("click", function () {
      div.remove();
      let deletedEl = todoArr.indexOf(
        todoArr.find((ele) => ele.id === btnDelete.dataset.id)
      );
      todoArr.splice(deletedEl, 1);
      // instead of remove all data we can set data again so that overwrite the previoursData
      localStorage.setItem("todos", JSON.stringify(todoArr));
      if (JSON.parse(localStorage.getItem("todos")).length === 0) {
        localStorage.clear();
      }
    });
    div.addEventListener("click", function (e) {
      if (e.target.classList.contains("edit")) return;
      //Implment DONE TASK 1)_
      todoArr.forEach((ele) => {
        if (ele.id === e.target.dataset.id) {
          // console.log(e.target);
          ele.selcted = true;
          localStorage.setItem("todos", JSON.stringify(todoArr));
          e.target.classList.toggle("todo-Done");
          if (!e.target.classList.contains("todo-Done")) {
            ele.selcted = false;
            localStorage.setItem("todos", JSON.stringify(todoArr));
          }
        }
      });
    });
  }
}
document.forms[0].addEventListener("submit", function (e) {
  e.preventDefault();
  const task = new Todo(input.value);
  if (!task.title) return;
  todoArr.push(task);
  task._createTodo();
  localStorage.setItem("todos", JSON.stringify(todoArr));
});

if (localStorage.getItem("todos")) {
  // when refresh and set another data so data is not gone

  //Implment DONE TASK 2)_
  todoArr = JSON.parse(localStorage.getItem("todos"));
  todoArr.forEach((todo) => {
    todo.__proto__ = Todo.prototype;
    todo._createTodo();
    if (todo.selcted) {
      console.log(todo.id);
      const element = document.querySelector(`[data-id='${todo.id}']`);
      element.classList.add("todo-Done");
    } else {
      const element = document.querySelector(`[data-id='${todo.id}']`);
      element.classList.remove("todo-Done");
    }
    // todo._markedTodo();
  });
}
