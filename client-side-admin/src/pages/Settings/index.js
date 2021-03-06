import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { useToasts } from 'react-toast-notifications';

import { handleChange } from './functions'
const initialState = {
    port : "",
    assumption:"",
    delay:"",
    binanceApi:"",
    binanceSecret:"",
    binanceEndPoint1:"",
    binanceEndPoint2:"",
    binanceEndPoint3:"",
    binanceEndPoint4:"",
    job:"",
    timer:"",
    runAtStart:"",
    currencyName:"",
    currencyCode:"",
    currencySymbol:"",
    cryptoName:"",
    cryptoCode:"",
    comission:"",
    expiryDate:""
}
export default function Settings() {
    const [state, setState] = useState(initialState)
    const [cronModal,setCronModal] = useState(false)
    const [currencyModal,setCurrencyModal] = useState(false)
    const [cryptoModal,setCryptoModal] = useState(false)
    
    const { addToast } = useToasts();
    
    function toast(status,content){
        //status = success,error,warning,info
        addToast(content, {
            appearance: status,
            autoDismiss: true,
          })
    }
    useEffect(()=>{
        console.log(state)
    },[state])
    return (
        <div className="card">
            <Row>
                <Col xs={12}>
                <div className="card-title">
                    <i className="fi fi-rr-settings-sliders" /> Settings
                </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Port</div>
                        <div className="input-group">
                            <label>Development Port</label>
                            <input type="text" name="port" value={state.port} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={()=>toast("error","Port changed.")}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Assumption</div>
                        <div className="input-group">
                            <label>USDT/USD Assumption</label>
                            <input type="text" name="assumption" value={state.assumption} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Delay</div>
                        <div className="input-group">
                            <label>Regular Delay For Necessary Points</label>
                            <input type="text" name="delay" value={state.delay} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Cron Job</div>
                        <div className="input-group">
                            <label>Job</label>
                            <input type="text" name="job" value={state.job} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Timer</label>
                            <input type="text" name="timer" value={state.timer} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="checkbox-group">
                            <label><input type="checkbox" name="runAtStart" checked={state.runAtStart} onChange={({target}) => handleChange(state,setState,target.name,target.checked)} />Run at Start</label>
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                        <button className="btn" onClick={() => setCronModal(!cronModal)} ><i className="fi fi-rr-eye" /> Show All</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Currencies</div>
                        <div className="input-group">
                            <label>Currency Name</label>
                            <input type="text" name="currencyName" value={state.currencyName} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Currency Code</label>
                            <input type="text" name="currencyCode" value={state.currencyCode} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Currency Code</label>
                            <input type="text" name="currencySymbol" value={state.currencySymbol} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                        <button className="btn" onClick={() => setCurrencyModal(!currencyModal)}><i className="fi fi-rr-eye" /> Show All</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Crypto Currencies</div>
                        <div className="input-group">
                            <label>Crypto Name</label>
                            <input type="text" name="cryptoName" value={state.cryptoName} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Crypto Code</label>
                            <input type="text" name="cryptoCode" value={state.cryptoCode} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                        <button className="btn" onClick={() => setCryptoModal(!cryptoModal)}><i className="fi fi-rr-eye" /> Show All</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Binance API</div>
                        <div className="input-group">
                            <label>Binance Api Key</label>
                            <input type="text" name="binanceApi" value={state.binanceApi} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Binance Secret Key</label>
                            <input type="text" name="binanceSecret" value={state.binanceSecret} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="binanceEndPoint1" value={state.binanceEndPoint1} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="binanceEndPoint2" value={state.binanceEndPoint2} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="binanceEndPoint3" value={state.binanceEndPoint3} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="binanceEndPoint4" value={state.binanceEndPoint4} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Commission Rate</div>
                        <div className="input-group">
                            <label>Commission Rate</label>
                            <input type="text" name="comission" value={state.comission} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                    <div className="card ">
                        <div className="card-title">Expiry Date</div>
                        <div className="input-group">
                            <label>Expiry Date</label>
                            <input type="text" name="expiryDate" value={state.expiryDate} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
            </Row>
            <div className="modal-area" style={{display:cronModal ? "flex" : "none"}}>
                <div className="modal-overlay" onClick={() => setCronModal(!cronModal)} />
                <div className="modal">
                    <div className="modal-header">
                        Cron Jobs
                        <i className="fi fi-rr-cross" onClick={() => setCronModal(!cronModal)} />
                    </div>
                    <div className="modal-body">
                        <table>
                            <caption></caption>
                            <thead>
                                <tr>
                                <th scope="col">Job</th>
                                <th scope="col">Timer</th>
                                <th scope="col">Run At Start</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Job">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Timer">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Run at Start">
                                        <label><input type="checkbox" /></label>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Job">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Timer">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Run at Start">
                                        <label><input type="checkbox" /></label>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Job">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Timer">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Run at Start">
                                        <label><input type="checkbox" /></label>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={() => setCronModal(!cronModal)}>Close</button>
                    </div>
                </div>
            </div>
            <div className="modal-area" style={{display:currencyModal ? "flex" : "none"}}>
                <div className="modal-overlay" onClick={() => setCurrencyModal(!currencyModal)} />
                <div className="modal">
                    <div className="modal-header">
                        Currencies
                        <i className="fi fi-rr-cross" onClick={() => setCurrencyModal(!currencyModal)} />
                    </div>
                    <div className="modal-body">
                        <table>
                            <caption></caption>
                            <thead>
                                <tr>
                                <th scope="col">Currency Name</th>
                                <th scope="col">Currency Code</th>
                                <th scope="col">Currency Symbol</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Currency Name">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Currency Code">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Currency Symbol">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Currency Name">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Currency Code">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Currency Symbol">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Currency Name">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Currency Code">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Currency Symbol">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={() => setCurrencyModal(!currencyModal)}>Close</button>
                    </div>
                </div>
            </div>
            <div className="modal-area" style={{display:cryptoModal ? "flex" : "none"}}>
                <div className="modal-overlay" onClick={() => setCryptoModal(!cryptoModal)} />
                <div className="modal">
                    <div className="modal-header">
                        Crypto Currencies
                        <i className="fi fi-rr-cross" onClick={() => setCryptoModal(!cryptoModal)} />
                    </div>
                    <div className="modal-body">
                        <table>
                            <caption></caption>
                            <thead>
                                <tr>
                                <th scope="col">Crypto Currency Name</th>
                                <th scope="col">Crypto Currency Code</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Crypto Currency Name">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Crypto Currency Code">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Crypto Currency Name">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Crypto Currency Code">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Crypto Currency Name">
                                        <div className="input-group">
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Crypto Currency Code">
                                        <div className="input-group">
                                            <label></label>
                                            <input type="text" />
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        <button className="btn btn-success"><i className="fi fi-rr-checkbox" /></button>
                                        <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={() => setCryptoModal(!cryptoModal)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
