import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const getTask = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/OUHernandezAyalaLatm23');
      if (response.status !== 200) {
        console.log(`Ocurrió un error ${response.status}`);
        return;
      }
      const body = await response.json();
      setTodos(body);
    } catch (error) {
      console.log(error);
    }
  };

  const putTask = async (taskInput) => {
    const newTodoApi = {
      label: taskInput,
      done: false
    };
  
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/OUHernandezAyalaLatm23', {
        method: 'PUT',
        body: JSON.stringify([...todos, newTodoApi]),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status !== 200) {
        console.log(`Ocurrió un error ${response.status}`);
      } else {
        setTodos([...todos, newTodoApi]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskApi = async (updatedTodos) => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/OUHernandezAyalaLatm23', {
        method: 'PUT',
        body: JSON.stringify(updatedTodos),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status !== 200) {
        console.log(`Ocurrió un error ${response.status}`);
      } else {
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  


  useEffect(() => {
    getTask();
  }, []);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTodo = {
        id: Date.now().toString(),
        label: taskInput,
      };
      setTodos([...todos, newTodo]);
      putTask(taskInput)
      setTaskInput("");
      
    }
  };

  const deleteTask = (label) => {
    const updatedTodos = todos.filter((item) => item.label !== label);
    deleteTaskApi(updatedTodos);

  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="contenedorTodolist">
      <div className="tittleTodos">todos</div>
      <div className="form-floating">
        <label className="floatingTextarea2" htmlFor="taskInput"></label>
        <input
          className=""
          type="text"
          id="taskInput"
          value={taskInput}
          onChange={(event) => setTaskInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ul>
          {todos && todos.length > 0 ? (
            todos.map((item) => (
              <li key={item.id}>
                {item.label}
                <button
                  className="delete-button"
                  onClick={() => deleteTask(item.label)}
                >
                  X
                </button>
              </li>
            ))
          ) : (
            <li>No hay tareas</li>
          )}
          <div className="counter">{todos ? todos.length : 0} item</div>
        </ul>
      </div>
    </div>
  );
};

export default Todo;

