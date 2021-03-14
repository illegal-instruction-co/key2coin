
import { useEffect } from 'react'
import { useGetAndSet, useSetStoreValue } from 'react-context-hook'
import { NavLink, useHistory } from 'react-router-dom'
import { useScreenClass } from 'react-grid-system'

import './style.css'
import {menuItems} from '../../menu-items'

export default function Drawer() {
    var history = useHistory()
    const screenClass = useScreenClass()
    const [drawer,setDrawer] = useGetAndSet('drawer')
    const setAuth = useSetStoreValue('auth')

    function openFullscreen() {
        var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    function logout(){
        localStorage.removeItem('token')
        setAuth("")
        history.push('/login')
    }
    useEffect(()=>{
        if(['xs','sm'].includes(screenClass)){
            setDrawer(false)
        }
        // eslint-disable-next-line
    },[])
    return (
        <div className="drawer" style={{marginLeft:drawer ? '0px' : '-250px'}}>
            <div className="drawer-header">
                {/*<img src={logo} alt="cancel" className="logo" onClick={() => history.push('/dashboard')}/>*/}
                <h2>Key2Coin</h2>
            </div>
            <div className="drawer-items">
                {
                    menuItems.map((item,index) => 
                        <NavLink key={index} className="drawer-item" activeClassName="active-link" to={item.link}><i className={item.icon} />{item.name}</NavLink>
                    )
                }
            </div>
            <div className="drawer-footer">
                <div className="drawer-footer-item" onClick={logout}><i className="fi fi-rr-power" /></div>
                <div className="drawer-footer-item" onClick={openFullscreen}><i className="fi fi-rr-screen" /></div>
            </div>
        </div>
    )
}
