import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingText, setEditingText] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="input">
        <input
          className="text"
          autoFocus
          type="text"
          placeholder="🖊️ Add item..."
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <i
          className="fas fa-plus"
          onClick={() => {
            if (todo) {
              setTodos([
                ...todos,
                { id: Date.now(), text: todo, status: false }
              ]);
            } else {
              alert("Todo cannot be empty");
            }
          }}
        ></i>
      </div>
      <div className="todos">
        {todos.map((item, index) => {
          return (
            <div className="todo" key={index}>
              <div className="left">
                <input
                  onChange={(e) => {
                    setTodos(
                      todos.filter((obj) => {
                        if (obj.id === item.id) {
                          obj.status = e.target.checked;
                        }
                        return obj;
                      })
                    );
                  }}
                  value={item.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                {todoEditing === item.id ? (
                  <input
                    autoFocus
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                    className="text"
                  />
                ) : (
                  <p
                    className={`${item.status ? "completed" : ""}`}
                    key={index}
                  >
                    {item.text}
                  </p>
                )}
              </div>
              <div className="right">
                {todoEditing === item.id ? (
                  <i
                    className="fas fa-check"
                    onClick={() => {
                      setTodos(
                        todos.filter((obj) => {
                          if (item.id === obj.id) {
                            obj.text = editingText;
                          }
                          return obj;
                        })
                      );
                      setEditingText("");
                      setTodoEditing(null);
                    }}
                  ></i>
                ) : (
                  <i
                    className="fas fa-pen"
                    onClick={() => {
                      todos.filter((obj) => {
                        if (item.id === obj.id) {
                          //console.log(obj.id);
                          setTodoEditing(obj.id);
                        }
                        return obj;
                      });
                    }}
                  ></i>
                )}
                <i
                  className="fas fa-times"
                  onClick={() => {
                    setTodos(
                      todos.filter((obj) => {
                        if (item.id !== obj.id) {
                          return obj;
                        }
                        return null;
                      })
                    );
                  }}
                ></i>
              </div>
            </div>
          );
        })}
        {todos.map((obj, index) => {
          if (obj.status) {
            return <h2 key={index}>{obj.text}</h2>;
          }
          return null;
        })}
      </div>
    </div>
  );
}
