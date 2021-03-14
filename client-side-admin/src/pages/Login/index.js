import React, { useState, useEffect } from 'react'
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom'
import publicIp from 'public-ip'
import BEA256 from 'bea256'
import { useGetAndSet } from 'react-context-hook';

import { handleChange } from '../Settings/functions';

import './style.css'

const initialState = {
    email:"",
    password:""
}
export default function Login({ asyncOp, value }) {
    var history = useHistory()
    const [state, setState] = useState(initialState)
    const [authStatus, setAuthStatus] = useState('Administration Login')
    const [authStatusClass, setAuthStatusClass] = useState('status')
    const [clientIpAddress, setClientIpAddress] = useState()
    const [auth,setAuth] = useGetAndSet('auth')
    const [isCancelled,setIsCancelled] = useState(false)

    useEffect(()=>{
      function authControl (){
        try {
          if (!isCancelled) {
            if(localStorage.getItem('token') !== null)
              history.goBack();
          }
        } catch (e) {
          if (!isCancelled) {
            throw e;
          }
        }
      }
      authControl()
      return () => {
        setIsCancelled(true)
      };
    },[isCancelled, history, auth])

    useEffect(() => {
      (async () => {
        setClientIpAddress(await publicIp.v4() || await publicIp.v6())
      })()
    }, [clientIpAddress])

    async function login(e){
      e.preventDefault()
      await fetch(`http://localhost:3001/auth/generate-user-auth-token/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ip: clientIpAddress,
            emailHash: new BEA256(state.email, clientIpAddress).encrypt("base64"),
            passwordHash: new BEA256(state.password, clientIpAddress).encrypt("base64")
          })
        })
     .then(res => res.json())
     .then((result) => {
       if(result.token) {
         setAuthStatus('Successfully logged in, you are being redirected ...')
         setAuthStatusClass(`success`)
         localStorage.setItem('token',result.token)
         setAuth(result.token)
         setTimeout(function() {
           history.push("/dashboard")
         }, 1000)
       } else {
         setAuthStatusClass('error')
         setAuthStatus('Email or password does not match our records.')
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
                    <span className={authStatusClass}> { authStatus } </span>
                </div>
                <div>
                    <form onSubmit={login}>
                    <div className="input-group">
                        <label>E-mail</label>
                        <input type="text" autoFocus name="email" value={state.email} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={state.password} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                    </div>
                    <button className="btn" onClick={login} type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
