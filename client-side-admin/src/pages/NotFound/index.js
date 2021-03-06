import React from 'react'
import Particles from 'react-particles-js'

import './style.css'

export default function NotFound() {
    return (
        <div className="notfound-container">
            <div className="notfound-bg">
            <Particles/>
            </div>
            <div className="notfound-box">
                404
                <div className="notfound-subtitle">
                    Page Not Found
                </div>
            </div>
        </div>
    )
}
