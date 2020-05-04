import React from "react";
import { observer } from "mobx-react";

@observer
class TodoList extends React.Component {
  filter(e) {
    this.props.store.filter = e.target.value;
  }

  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value);
      e.target.value = "";
    }
  }

  // TODO: Toggle the status using actions/flux.
  toggleComplete(todo) {
    todo.complete = !todo.complete;
  }

  clearComplete() {}

  render() {
    const { filter, filteredTodos, clearComplete } = this.props.store;
    const todoList = filteredTodos.map((todo) => (
      <li key={todo.id}>
        <input
          type="checkbox"
          value={todo.complete}
          checked={todo.complete}
          onChange={this.toggleComplete.bind(this, todo)}
        />
        {todo.value}
      </li>
    ));

    return (
      <div>
        <h1>Todos</h1>
        <input
          className="create"
          onKeyPress={this.createNew.bind(this)}
        ></input>
        <input
          className="filter"
          value={filter}
          onChange={this.filter.bind(this)}
        ></input>
        <ul>{todoList}</ul>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a href="#" onClick={clearComplete}>
          Clear complete
        </a>
      </div>
    );
  }
}

export default TodoList;
