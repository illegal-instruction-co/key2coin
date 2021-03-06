import React, { useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { handleChange } from '../Settings/functions'


const users = [
    {
        id:1,
        name:"Berkay Karataş",
        email:"berkay@key2coin.com"
    },{
        id:2,
        name:"Batuhan Bekir",
        email:"batuhan@key2coin.com"
    }
]
const initialState = {
    oldPass:"",
    newPass:"",
    againPass:""
}
export default function Users() {
    const [passwordModal, setPasswordModal] = useState(false)
    const [state, setState] = useState(initialState)

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
                                            {u.name}
                                        </td>
                                        <td data-label="Email">
                                            {u.email}
                                        </td>
                                        <td data-label="Action">
                                            <button className="btn" onClick={() => setPasswordModal(!passwordModal)}><i className="fi fi-rr-password" /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
            <div className="modal-area" style={{display:passwordModal ? "flex" : "none"}}>
                <div className="modal-overlay" onClick={() => setPasswordModal(!passwordModal)} />
                <div className="modal">
                    <div className="modal-header">
                        Change Password
                        <i className="fi fi-rr-cross" onClick={() => setPasswordModal(!passwordModal)} />
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <label>Old Password</label>
                            <input type="text" name="oldPass" value={state.oldPass} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>New Password</label>
                            <input type="text" name="newPass" value={state.newPass} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Again New Password</label>
                            <input type="text" name="againPass" value={state.againPass} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={() => setPasswordModal(!passwordModal)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
