import React, { useState, useEffect } from 'react'
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom'
import publicIp from 'public-ip'
import BEA256 from 'bea256'

import { handleChange } from '../Settings/functions';

import './style.css'

const initialState = {
    email:"",
    password:""
}
export default function Login() {
    var history = useHistory()
    const [state, setState] = useState(initialState)
    const [clientIpAddress, setClientIpAddress] = useState()

    useEffect(async function() {
      setClientIpAddress(await publicIp.v4() || await publicIp.v6())
    },[])
    function login(){
        // api request /generate-user-auth-token/:ip/:emailHash/:passwordHash { auth: false } || {ip: ip, email: email, token: token }
        console.log(clientIpAddress);
        console.log("emailHash", new BEA256(state.email, clientIpAddress).encrypt("base64"))
        console.log("passwordHash", new BEA256(state.password, clientIpAddress).encrypt("base64"))
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
