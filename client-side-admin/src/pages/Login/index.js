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



    useEffect(() => {
      (async () => {
        setClientIpAddress(await publicIp.v4() || await publicIp.v6())
      })()
    }, [clientIpAddress])
    async function login(e){
      e.preventDefault()
      await fetch(`http://localhost:3001/auth/generate-user-auth-token/${clientIpAddress}/${ new BEA256(state.email, clientIpAddress).encrypt("base64") }/${ new BEA256(state.password, clientIpAddress).encrypt("base64") }`)
     .then(res => res.json())
     .then((result) => {
       if(result.token) {
         history.push("/dashboard")
       } else {
         console.log(" Auth failed ");
       }
     })
     .catch((err) => {
       console.log(err);
     })
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
