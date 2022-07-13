import React from 'react';
import { useState } from 'react';
import axios from 'axios';



const Login = () => {
    //state to keep track of the username and password
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");


    const handleSubmit = (e) => {
        //prevent a refresh
        e.preventDefault();

        axios({
            method: "post",
            url: 'http://localhost:3000/register',
            data: {
                username: user,
                password: pass
            }
        })

        //some prints to keep track of username and password
        console.log(user);
        console.log(pass);
    }

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Username: </label>
                    {/** when the value has changed, trigger the onchange event, in which we set the username to the new value */}
                    <input type='text' name='uname' onChange={e => setUser(e.target.value)} required />
                </div>
                <div className='input-container'>
                    <label>Password: </label>
                    <input type='password' name='pass' onChange={e => setPass(e.target.value)} required />
                </div>
                <div className='button-container'>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}


export default Login;