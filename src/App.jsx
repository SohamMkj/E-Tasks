import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      // let todos = JSON.parse(localStorage.getItem("todos"));
      // setTodos(todos);
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLocalSto = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
    saveToLocalSto();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalSto();
  };

  const handleDelete = (e, id) => {
    // let index = todos.findIndex(item=>{
    //   return item.id === id
    // })
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLocalSto();
    localStorage.setItem("todos",JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLocalSto();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalSto();
  };

  return (
    <>
      <Navbar />
      <div className="md:container flex md:justify-center items-center">
        <div className="rounded-xl m-8 p-7 bg-green-200  md:w-[80%] min-h-[80vh]">
          <h1 className="text-3xl text-slate-900 font-bold mb-6 text-center">
            ETasks - OnePlace Solution For Your Tasks Management :-
          </h1>
          <div className="addtodo mb-3 space-x-4">
            <h2 className="text-lg font-bold mb-1">Add a Task</h2>
            <input
              onChange={handleChange}
              value={todo}
              className="bg-green-100 h-10  w-[60%] rounded-lg px-1.5"
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-green-700 hover:bg-green-800 disabled:bg-green-600 rounded-md py-2 px-4 text-white font-bold"
            >
              Save
            </button>
          </div>
          <input
            className="my-3"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />{" "}
          Show Finished Tasks
          <h2 className="text-lg font-bold mt-6 mb-2">Your Todos</h2>
          <div className="todos">
            {todos.length == 0 && (
              <div className="m-4">No Tasks To Display</div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex w-fit mt-3 justify-between"
                  >
                    <div className="flex gap-2">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        id=""
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-green-700 hover:bg-green-800 p-4 py-0.5 rounded-md text-white ml-6 font-bold"
                      >
                        <MdEditSquare />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-green-700 hover:bg-green-800 p-4 py-0.5 rounded-md text-white ml-4 font-bold"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
