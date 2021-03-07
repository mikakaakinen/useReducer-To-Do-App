import { useReducer, useState } from "react";
import { Row, Col } from "antd";
import { Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineFileDone } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const done = {
  textDecoration: "line-through",
  color: "#ff0000!important",
};

const undone = {
  textDecoration: "none",
};

const initialTodos = [
  {
    id: "a",
    task: "Learn React",
    complete: true,
  },
  {
    id: "b",
    task: "Learn Firebase",
    complete: false,
  },
  {
    id: "c",
    task: "Learn MongoDB",
    complete: false,
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "DO_TODO":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case "UNDO_TODO":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "ADD_TODO":
      console.log("id=", action.id);
      return state.concat({
        id: action.id,
        task: action.task,
        complete: false,
      });
    case "UPDATE_TODO":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, task: action.task };
        } else {
          return todo;
        }
      });
    default:
      throw new Error();
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [task, setTask] = useState("");
  const [editMode, seteditMode] = useState(false);
  const [updateId, setupdateId] = useState("");
  const [updateTask, setupdateTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", id: uuidv4(), task });
    setTask("");
  }

  function handleEditMode(e) {
    seteditMode(true);
  }

  function handleEdit(e) {
    e.preventDefault();
    dispatch({ type: "UPDATE_TODO", id: updateId, task: updateTask });
    seteditMode(false);
    setupdateTask("");
  }

  const editForm = () => {
    if (editMode) {
      return (
        <Row justify="center" className="margin-bottom">
          <Col span={10}>
            <form onSubmit={handleEdit}>
              <p>
                <input
                  type="text"
                  name="task"
                  className="add-task"
                  onChange={(e) => {
                    setupdateTask(e.target.value);
                  }}
                  autoComplete="off"
                  value={updateTask}
                  placeholder="Update a task"
                  required
                />
                <button className="baseButton add" type="submit">
                  Update
                </button>
              </p>
            </form>
          </Col>
        </Row>
      );
    }
  };

  return (
    <div className="heightA">
      <Row justify="center" className="margin-bottom">
        <Col span={10}>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                name="task"
                className="add-task"
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                autoComplete="off"
                value={task}
                placeholder="Add a task"
              />
              <button className="baseButton add" type="submit">
                Add
              </button>
            </p>
          </form>
        </Col>
      </Row>
      <ul>
        {todos &&
          todos.map((todo) => (
            <Row justify="center" className="margin-bottom">
              <Col span={12}>
                <li key={todo.id} style={{ listStyleType: "none" }}>
                  <Button className="buttonA margin-right">
                    <span style={todo.complete ? done : undone}>
                      <h4> {todo.task}</h4>
                    </span>
                  </Button>
                  <Button
                    type="danger"
                    className="margin-right"
                    onClick={() =>
                      dispatch({ type: "DELETE_TODO", id: todo.id })
                    }
                  >
                    <AiFillDelete />
                    DELETE
                  </Button>
                  <Button
                    type="primary"
                    className="margin-right"
                    onClick={() => {
                      setupdateId(todo.id);
                      handleEditMode();
                    }}
                  >
                    <AiFillEdit />
                    UPDATE
                  </Button>
                  <Button
                    type="primary"
                    className="margin-right widthA"
                    onClick={() =>
                      dispatch({
                        type: todo.complete ? "UNDO_TODO" : "DO_TODO",
                        id: todo.id,
                      })
                    }
                  >
                    <AiOutlineFileDone />
                    {todo.complete ? (
                      <p className="fontsizeA">CLEAR</p>
                    ) : (
                      <p className="fontsizeA">DONE</p>
                    )}
                  </Button>
                </li>
              </Col>
            </Row>
          ))}
      </ul>
      {editForm()}
    </div>
  );
};

export default App;
