import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGetAndSet } from 'react-context-hook'

import './style.css'

export default function Header() {
    var history = useHistory()
    const [drawer,setDrawer] = useGetAndSet('drawer')
    const [auth,setAuth] = useGetAndSet('auth')

    useEffect(()=>{
        if(!auth.success) history.push('/login')
        // eslint-disable-next-line
    },[])
    return (
        <div className="header">
            <div className="menu">
                <i className="fi fi-rr-menu-burger" onClick={() => setDrawer(!drawer)} />
            </div>
        </div>
    )
}
