import { useState ,useEffect} from 'react';
import './App.css';
import Axios from 'axios';
function App() {
  const [uniqueId,setuniqueId]=useState('');
  const [Name,setName]=useState('');
  const [Age,setAge]=useState(0);
  const [Data,setData]=useState([]);
  const addToList=()=>{
    if(uniqueId=='' || Name=='' || Age==null){
      window.alert("Enter Valid Information");
    }
    Axios.post("http://localhost:3001/insert",{uniqueId:uniqueId,Name:Name,Age:Age}).catch((error) => {
      window.alert("Data Invalid");
    });;
  }
  const Delete=()=>{
    if(uniqueId==''){
      window.alert("Enter UniqueId Information");
    }
    Axios.post("http://localhost:3001/delete",{uniqueId:uniqueId});
  }
  const Update=()=>{
    if(uniqueId==''){
      window.alert("Enter UniqueId Information");
    }
    if(Name=='' && Age==null){
      window.alert("Enter Valid Information");
    }
    Axios.put("http://localhost:3001/update",{uniqueId:uniqueId,Name:Name,Age:Age}).catch((error) => {
      window.alert("Enter Valid Unique Id ");
    });
  }
  // const Select=()=>{
  //   Axios.post("http://localhost:3001/read",{uniqueId:uniqueId}).then((response)=>{
  //     setData(response.data);
  //   });
  // }
  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      setData(response.data);
      console.log(Data);
    });
  },[])
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <label>Enter UniqueId :</label>
      <input type="text" onChange={(event)=>{
        setuniqueId(event.target.value)
      }}></input>
      <label>Enter Name :</label>
      <input type="text" onChange={(event)=>{
        setName(event.target.value)
      }}></input>
      <label>Enter Age :</label>
      <input type="number" onChange={(event)=>{
        setAge(event.target.value)
      }}></input>
      <div>
      <button onClick={addToList}>Add Data</button>
      <button onClick={Delete}>Delete Data</button>
      <button onClick={Update}>Update Data</button>
      {/* <button onClick={Select}>Select Data</button> */}
      </div>
      
      <h1>Customer Detail</h1>
      <div className="table-container">
      <tbody>
        <tr>
          <th>UNIQUE ID</th>
          <th>NAME</th>
          <th>AGE</th>
        </tr>
        {Data.map((item, index) => (
          <tr key={index}>
            <td>{item.uniqueId}</td>
            <td>{item.Name}</td>
            <td>{item.Age}</td>
          </tr>
        ))}
      </tbody>
    </div>
      {/* {foodList.map((val,key)=>{
        return <div key={key} className='food'>
          <h1>{val.foodName}</h1> <h2>{val.daysSinceIAte}</h2>
        </div>
      })} */}
    </div>
  );
}

export default App;
