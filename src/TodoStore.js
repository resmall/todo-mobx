import { observable, computed } from "mobx";

class Todo {
  @observable value;
  @observable id;
  @observable complete;

  constructor(value) {
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

class TodoStore {
  @observable todos = [];
  @observable filter = "";
  @computed get filteredTodos() {
    var matchesFilters = new RegExp(this.filter, "i");
    return this.todos.filter(
      (todo) => !this.filter || matchesFilters.test(todo.value)
    );
  }

  createTodo(value) {
    this.todos.push(new Todo(value));
  }

  clearComplete = () => {
    const incompleteTodos = this.todos.filter((todo) => !todo.complete);
    this.todos.replace(incompleteTodos);
  };
}

export default new TodoStore();
