import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGetAndSet, useStoreValue } from 'react-context-hook'

import './style.css'

export default function Header() {
    var history = useHistory()
    const [drawer,setDrawer] = useGetAndSet('drawer')
    const auth = useStoreValue('auth')
    const [isCancelled,setIsCancelled] = useState(false)

    useEffect(()=>{
        function authControl (){
          try {
            if (!isCancelled) {
              if(localStorage.getItem('token') === null)
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
    return (
        <div className="header">
            <div className="menu">
                <i className="fi fi-rr-menu-burger" onClick={() => setDrawer(!drawer)} />
            </div>
        </div>
    )
}
