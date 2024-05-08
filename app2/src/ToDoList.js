import React, { useState } from "react";

const ToDoList = () => {
    const [ToDos, setToDos] = useState([]);
    const [NewToDo, setNewToDo] = useState("");
    const [EditMode, setEditMode] = useState(null);
    const [EditedText, setEditedText] = useState("");

    const handleAddToDo = () => {
        if (NewToDo.trim() !== "") {
            setToDos([...ToDos, { text: NewToDo.trim(), checked: false }])
            setNewToDo("");
        }
    };

    const handleDeleteToDo = (index) => {
        const NewToDos = [...ToDos];
        NewToDos.splice(index, 1);
        setToDos(NewToDos);
    }

    const handleToggleToDo = (index) => {
        const NewToDos = [...ToDos];
        NewToDos[index].checked = !NewToDos[index].checked;
        setToDos(NewToDos);
    }

    const handleEditToDo = (index) => {
        setEditMode(index);
        setEditedText(ToDos[index].text);
    };

    const handleSaveEdit = (index) => {
        const NewToDos = [...ToDos];
        NewToDos[index].text = EditedText.trim();
        setToDos(NewToDos);
        setEditMode(null);
    };

    return (
        <div>
            <h2> To-Do List</h2>
            <input type="text" value={NewToDo} onChange={(e) => setNewToDo(e.target.value)} />
            <button onClick={handleAddToDo}>Add</button>
            <ul>
                {ToDos.map((todo, index) => (
                    <li key={index} style={{ display: "flex" }}>
                        {EditMode === index ? (
                            <>
                                <input
                                    type="text"
                                    value={EditedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(index)}>Save</button>
                            </>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    checked={todo.checked}
                                    onChange={() => handleToggleToDo(index)}
                                />
                                <span
                                    style={{
                                        marginRight: "10px",
                                        textDecoration: todo.checked ? "line-through" : "none",
                                    }}
                                >
                                    {todo.text}
                                </span>
                                <button
                                    style={{ marginRight: "5px" }}
                                    onClick={() => handleEditToDo(index)}
                                >
                                    Edit
                                </button>
                                <button style={{ marginTop: "5px", marginBottom: "5px" }}onClick={() => handleDeleteToDo(index)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;