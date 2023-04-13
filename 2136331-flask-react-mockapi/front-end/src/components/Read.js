import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';



function Read() {

    const [data, setData] = useState([{}]);
    const history = useNavigate();

    const setToLocalStorage = (id, first_name, last_name, email) => {
      localStorage.setItem("id", id);
      localStorage.setItem("first_name", first_name);
      localStorage.setItem("last_name", last_name);
      localStorage.setItem("email", email);
    };

    function handleRemove(id){
      fetch('/delete/'+id, {
        method: 'POST',
        body: JSON.stringify({
          id : id
        })
        }).then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
          history("/");
        });
        window.location.reload();
   }

    useEffect(() => {
        fetch("/customers").then(
          res => res.json()
        ).then(
          data => {
            setData(data)
            console.log(data)
          }
        )
      }, [])

    return(
        <>
        <div>
        <Link to="/create">
          <button className="btn btn-secondary" id="create-btn">Create</button>
        </Link>
        </div>

        <div>
      <table class="table table-success table-striped" id="table">
        <thead>
          <tr>
            <th scope="col">SL.No</th>
            <th scope="col">first Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
      {data.map((eachData, index) => {
          return (
            <>
            <tbody>
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{eachData.first_name}</td>
                  <td>{eachData.last_name}</td>
                  <td>{eachData.email}</td>
                  <td>
                  <Link to="/update">
                      <button className="btn-success" onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.first_name,
                            eachData.last_name,
                            eachData.email
                          )
                        }>Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleRemove(eachData.id)}>Delete</button>
                  </td>

                  </tr>
            </tbody>
            </>
          )
      })}
      </table>
      
      
    </div>
        </>

    )
}

export default Read;