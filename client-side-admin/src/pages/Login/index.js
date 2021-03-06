import React, { useState } from 'react'
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom'

import { handleChange } from '../Settings/functions';

import './style.css'

const initialState = {
    email:"",
    password:""
}
export default function Login() {
    var history = useHistory()
    const [state, setState] = useState(initialState)

    function login(){
        history.push("/dashboard")
    }
    return (
        <div className="login-container">
            <div className="login-bg">
            <Particles/>
            </div>
            <div className="login-box">
                <div className="login-header">
                    Administration Login
                </div>
                <div>
                    <form onSubmit={login}>
                    <div className="input-group">
                        <label>E-mail</label>
                        <input type="text" autoFocus name="email" value={state.email} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={state.password} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                    </div>
                    <button className="btn" onClick={login} type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
