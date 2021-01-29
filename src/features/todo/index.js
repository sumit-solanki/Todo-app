import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNew, deleteTodo, updateTodo, selectTodoList } from "./todoSlice";
import "./todo.css";
import DatePicker from "react-date-picker";
import Select from "react-select";

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];
const defaultStatus = { value: "active", label: "Active" };
function Todo() {
  const list = useSelector(selectTodoList);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [status, setstatus] = useState(defaultStatus.label);
  const [editIndex, setEditIndex] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleChange = selectedOption => {
    setstatus(selectedOption.label);
    console.log(`Option selected:`, selectedOption);
  };
  const editHandleChange = selectedOption => {
    setEditStatus(selectedOption.label);
  };

  const handleName = e => {
    setName(e.target.value);
  };
  const addInList = () => {
    let obj = {
      date: date.toString(),
      name: name || "blank...",
      status
    };

    dispatch(addNew(obj));
    setName('')
    setDate(new Date())
    setstatus(defaultStatus.label)
  };

  const deleteIndex = index => {
    dispatch(deleteTodo(index));
  };
  const UpdateList = () => {
    let obj = {
      index: editIndex,
      data: {
        date: editDate.toString(),
        name: editName || "blank...",
        status: editStatus
      }
    };
    dispatch(updateTodo(obj));
    setEditIndex("");

  };

  useEffect(() => {
    if (typeof editIndex == 'number') {
      let editRowData = list[editIndex];
      setEditName(editRowData.name);
      setEditStatus(editRowData.status);
      setEditDate(new Date(editRowData.date));
    } else {
      //   setEditIndex("");
    }
  }, [editIndex]);

  let statusValue =
    options.filter(item => item.label == status) || defaultStatus;

  return (
    <div className="inner-todo"> 
    <h3 className='heading'>   Todo Component </h3>
      <div className="todo-block">
        <div className="single-wrapper">
          <div className="">date</div>
          <div>
            <DatePicker
              onChange={val => {
                // console.log('val-->>',val)
                setDate(val);
              }}
              // returnValue={'range'}
              value={date}
              // format={"y-MM-dd"}
            />
          </div>
        </div>
        <div className="single-wrapper">
          <div className="">Name</div>
          <div>
            <input type="text" onChange={handleName} value={name} placeholder={'Enter Todo Name...'} />
          </div>
        </div>
        <div className="single-wrapper">
          <div className="">Status</div>
          <div>
            <Select
              value={statusValue}
              onChange={handleChange}
              options={options}
            />
          </div>
        </div>

        <div className="single-wrapper">
          <div className="">Action</div>
          <div>
            <button onClick={addInList}> Add to List </button>
          </div>
        </div>
      </div>
      <div className="list-block">
        {list.map((item, index) => {
          let isEditable = index === editIndex;
          let statusVal =
            options.filter(item => item.label == editStatus) || defaultStatus;
          return (
            <div className="single-row" key={''+JSON.stringify(item)+index}>
              <div>
                {isEditable ? (
                  <DatePicker
                    onChange={val => setEditDate(val)}
                    value={editDate}
                  />
                ) : (
                  new Date(item.date).toLocaleDateString()
                )}
              </div>
              <div>
                {isEditable ? (
                  <input
                    type="text"
                    onChange={e => setEditName(e.target.value)}
                    value={editName}
                  />
                ) : (
                  item.name
                )}
              </div>
              <div>
                {isEditable ? (
                  <Select
                    value={statusVal}
                    onChange={editHandleChange}
                    options={options}
                  />
                ) : (
                  item.status
                )}
              </div>
              <div className="action-block">
                {isEditable ? (
                  <button onClick={UpdateList}>Update & Save</button>
                ) : (
                  <>
                    <div onClick={() => setEditIndex(index)}>
                      <i className="fas fa-edit"></i>
                    </div>
                    <div onClick={() => deleteIndex(index)}>
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
