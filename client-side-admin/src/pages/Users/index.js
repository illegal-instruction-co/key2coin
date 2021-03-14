import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { useToasts } from 'react-toast-notifications';

import { handleChange } from '../Settings/functions'
import axios from '../../interceptor'

const initialState = {
    oldPass:"",
    newPass:"",
    againPass:""
}
export default function Users() {
    const [passwordModal, setPasswordModal] = useState(false)
    const [state, setState] = useState(initialState)
    const [users,setUsers] = useState([])
    const [selectedUser,setSelectedUser] = useState(0)

    const { addToast } = useToasts();
    
    function toast(status,content){
        //status = success,error,warning,info
        addToast(content, {
            appearance: status,
            autoDismiss: true,
        })
    }

    function putChangePassword(){
        const { oldPass, newPass, againPass } = state
        if(selectedUser === 0) return toast('warning','User could not be selected, please try again.')
        if(newPass === againPass)
            axios.put(`users/${selectedUser}`, { oldPass, newPass }).then(res => {
                if(res.data.success) toast('success','The password was changed.')
                else toast('warning','Old password is wrong.')
                console.log(res)
            }).catch(err => {
                toast('error',err)
                console.log(err)
            })
        else toast('warning','Passwords do not match.')
    }
    function openModal(id){
        setSelectedUser(id)
        setPasswordModal(!passwordModal)
    }
    useEffect(() => {
        function getUsers(){
            axios.get('users').then(res => {
                setUsers(res.data)
            }).catch(err => console.log(err))
        }
        getUsers()
    }, [])
    return (
        <div className="card">
            <Row>
                <Col xs={12}>
                    <div className="card-title">
                        <i className="fi fi-rr-users" /> Users
                    </div>
                </Col>
                <Col xs={12}>
                    <table>
                        <caption></caption>
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(u => 
                                    <tr key={u.id}>
                                        <td data-label="Name">
                                            {u.full_name}
                                        </td>
                                        <td data-label="Email">
                                            {u.email}
                                        </td>
                                        <td data-label="Action">
                                            <button className="btn" onClick={() => openModal(u.id)}><i className="fi fi-rr-password" /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
            <div className="modal-area" style={{display:passwordModal ? "flex" : "none"}}>
                <div className="modal-overlay" onClick={openModal} />
                <div className="modal">
                    <div className="modal-header">
                        Change Password
                        <i className="fi fi-rr-cross" onClick={openModal} />
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <label>Old Password</label>
                            <input type="text" name="oldPass" value={state.oldPass} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>New Password</label>
                            <input type="text" name="newPass" value={state.newPass} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Again New Password</label>
                            <input type="text" name="againPass" value={state.againPass} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={putChangePassword}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={openModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
