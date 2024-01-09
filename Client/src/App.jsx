import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${baseURL}/save`,{
      method:'POST',
      body:JSON.stringify(
        {
          "toDo":input,
          "Duedate":input2,
          
        }

      ),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    console.log(input2);
   console.log(data);
  }





  const saveToDo = () => {
    
    axios
      .post(`${baseURL}/save`,{toDo:input, Duedate:input2})
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
        setInput2("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Task Manager</h1>

        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a Task..."
          />
          <input
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            type="text"
            placeholder="Add due Date..."
          />
          
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              input2={el.Duedate}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
