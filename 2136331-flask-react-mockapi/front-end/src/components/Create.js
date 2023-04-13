import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Create = ()=> {


    const[addFirstName, setAddFirstName] = useState('');
    const[addLastName, setAddLastName] = useState('');
    const[addEmail, setAddEmail] = useState('');

    const history = useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();
        fetch('/create', {
            method: 'POST',
            body: JSON.stringify({
                first_name:addFirstName,
                last_name:addLastName,
                email:addEmail
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        }).then(response => response.json())
          .then(message => console.log(message))
          .then(() => {
            history("/");
          });
    }
    
    return(
        <>
            <form id="form">
            <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type ="text" value={addFirstName} onChange={(e) => setAddFirstName(e.target.value)}></input>
            </div>

            <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type ="text" value={addLastName} onChange={(e) => setAddLastName(e.target.value)}></input>
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type ="email" value={addEmail} onChange={(e) => setAddEmail(e.target.value)}></input>
            </div>

            <input type="submit" onClick={handleSubmit}></input>
            </form>
        </>
    )
}