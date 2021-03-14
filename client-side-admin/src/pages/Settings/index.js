import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { useToasts } from 'react-toast-notifications';

import axios from '../../interceptor'
import { handleChange } from './functions'
const initialState = {
    port : "",
    assumption:"",
    delay:"",
    api_key:"",
    secret_key:"",
    endpoint1:"",
    endpoint2:"",
    endpoint3:"",
    endpoint4:"",
    job:"",
    timer:"",
    start:false,
    currency:"",
    currency_code:"",
    currency_symbol:"",
    crypto:"",
    crypto_code:"",
    status:"",
    expiry_date:"",
    rate:""
}
export default function Settings() {
    const [state, setState] = useState(initialState)
    const [cronModal,setCronModal] = useState(false)
    const [currencyModal,setCurrencyModal] = useState(false)
    const [cryptoModal,setCryptoModal] = useState(false)
    const [cronJobs,setCronJobs] = useState([])
    const [currencies,setCurrencies] = useState([])
    const [cryptos,setCryptos] = useState([])
    const [updated,setUpdated] = useState(false)
    
    const { addToast } = useToasts();
    
    function toast(status,content){
        //status = success,error,warning,info
        addToast(content, {
            appearance: status,
            autoDismiss: true,
        })
    }
    useEffect(()=>{
        axios.get('parameters').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                handleChange(setState,element.name,element.value_)
            }
        }).catch(err => console.log(err))
    },[])
    function handleClickSave(parameter,name){
        if(parameter === "binance"){
            const { api_key,secret_key,endpoint1,endpoint2,endpoint3,endpoint4 } = state
            var values = {
                api_key,secret_key,endpoint1,endpoint2,endpoint3,endpoint4
            }
            Object.keys(values).forEach(v => {
                axios.put(`parameters/${parameter}/${v}`, {value_ : values[v]}).then(res => {
                    toast("success","The changes have been saved.")
                    console.log(res)
                }).catch(err => {
                    toast("error", err)
                    console.log(err)
                })
            })
        }else{
            var value_ = state[name]
            axios.put(`parameters/${parameter}/${name}`, {value_}).then(res => {
                toast("success","The changes have been saved.")
                console.log(res)
            }).catch(err => {
                toast("error", err)
                console.log(err)
            })
        }
    }
    function postCronJob(){
        const { job, timer, start } = state
        axios.post('cron-jobs',{job,timer,start}).then(res => {
            toast("success","The changes have been saved.")
            setUpdated(!updated)
            console.log(res)
        }).catch(err => {
            toast("error", err)
            console.log(err)
        })
    }
    function putCronJobs(index){
        var cronjob = cronJobs[index]
        axios.put(`cron-jobs/${cronjob.id}`,cronjob).then(res => {
            toast("success","The changes have been updated.")
            console.log(res)
        }).catch(err => {
            toast("error", err)
            console.log(err)
        })
    }
    function handleChangeCronJobs(e,index){
        var cronjobs = [...cronJobs]
        var name = e.target.name
        var value = e.target.value === "on" || e.target.value === "off" ? e.target.checked : e.target.value
        cronjobs[index][name] = value
        setCronJobs(cronjobs)
    }
    function postCurrencies(){
        const { currency, currency_code, currency_symbol } = state
        axios.post('currencies',{currency, currency_code, currency_symbol}).then(res => {
            toast("success","The changes have been saved.")
            setUpdated(!updated)
            console.log(res)
        }).catch(err => {
            toast("error", err)
            console.log(err)
        })
    }
    function handleChangeCurrency(e,index){
        var curr = [...currencies]
        var name = e.target.name
        var value = e.target.value
        curr[index][name] = value
        setCurrencies(curr)
    }
    function putCurrencies(index){
        var currency = currencies[index]
        axios.put(`currencies/${currency.id}`,currency).then(res => {
            toast("success","The changes have been updated.")
            console.log(res)
        }).catch(err => {
            toast("error", err)
            console.log(err)
        })
    }
    function postCrypto(){
        const { crypto, crypto_code, status } = state
        axios.post('crypto-currencies',{crypto, crypto_code, status}).then(res => {
            toast("success","The changes have been saved.")
            setUpdated(!updated)
            console.log(res)
        }).catch(err => {
            toast("error", err)
            console.log(err)
        })
    }
    function handleChangeCrypto(e,index){
        var cryptos_ = [...cryptos]
        var name = e.target.name
        var value = e.target.value === "on" || e.target.value === "off" ? e.target.checked : e.target.value
        cryptos_[index][name] = value
        setCryptos(cryptos_)
    }
    function putCrypto(index){
        var cryptos_ = cryptos[index]
        axios.put(`crypto-currencies/${cryptos_.id}`,cryptos_).then(res => {
            toast("success","The changes have been updated.")
            console.log(res)
        }).catch(err => {
            toast("error", err)
            console.log(err)
        })
    }
    
    useEffect(()=>{
        function getCronJobs(){
            axios.get('cron-jobs').then(res => {
                setCronJobs(res.data)
            }).catch(err => {
                toast("error", err)
                console.log(err)
            })
        }
        function getCurrencies(){
            axios.get('currencies').then(res => {
                setCurrencies(res.data)
            }).catch(err => {
                toast("error", err)
                console.log(err)
            })
        }
        function getCryptos(){
            axios.get('crypto-currencies').then(res => {
                setCryptos(res.data)
            }).catch(err => {
                toast("error", err)
                console.log(err)
            })
        }
        getCryptos()
        getCronJobs()
        getCurrencies()
        // eslint-disable-next-line
    },[updated])
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
                            <input type="text" name="port" value={state.port} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={()=>handleClickSave("port","port")}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Assumption</div>
                        <div className="input-group">
                            <label>USDT/USD Assumption</label>
                            <input type="text" name="assumption" value={state.assumption} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn"  onClick={()=>handleClickSave("assumption","assumption")}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Delay</div>
                        <div className="input-group">
                            <label>Regular Delay For Necessary Points</label>
                            <input type="text" name="delay" value={state.delay} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={()=>handleClickSave("delay","delay")}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Cron Job</div>
                        <div className="input-group">
                            <label>Job</label>
                            <input type="text" name="job" value={state.job} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Timer</label>
                            <input type="text" name="timer" value={state.timer} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="checkbox-group">
                            <label><input type="checkbox" name="start" checked={state.start} onChange={({target}) => handleChange(setState,target.name,target.checked)} />Run at Start</label>
                        </div>
                        <button className="btn" onClick={postCronJob}><i className="fi fi-rr-check" /> Save</button>
                        <button className="btn" onClick={() => setCronModal(!cronModal)} ><i className="fi fi-rr-eye" /> Show All</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Currencies</div>
                        <div className="input-group">
                            <label>Currency Name</label>
                            <input type="text" name="currency" value={state.currency} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Currency Code</label>
                            <input type="text" name="currency_code" value={state.currency_code} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Currency Code</label>
                            <input type="text" name="currency_symbol" value={state.currency_symbol} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={postCurrencies}><i className="fi fi-rr-check" /> Save</button>
                        <button className="btn" onClick={() => setCurrencyModal(!currencyModal)}><i className="fi fi-rr-eye" /> Show All</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Crypto Currencies</div>
                        <div className="input-group">
                            <label>Crypto Name</label>
                            <input type="text" name="crypto" value={state.crypto} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Crypto Code</label>
                            <input type="text" name="crypto_code" value={state.crypto_code} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="checkbox-group">
                            <label><input type="checkbox" name="status" checked={state.status} onChange={({target}) => handleChange(setState,target.name,target.checked)} />Status</label>
                        </div>
                        <button className="btn" onClick={postCrypto}><i className="fi fi-rr-check" /> Save</button>
                        <button className="btn" onClick={() => setCryptoModal(!cryptoModal)}><i className="fi fi-rr-eye" /> Show All</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Binance API</div>
                        <div className="input-group">
                            <label>Binance Api Key</label>
                            <input type="text" name="api_key" value={state.api_key} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Binance Secret Key</label>
                            <input type="text" name="secret_key" value={state.secret_key} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="endpoint1" value={state.endpoint1} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="endpoint2" value={state.endpoint2} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="endpoint3" value={state.endpoint3} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>API End Point</label>
                            <input type="text" name="endpoint4" value={state.endpoint4} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn"  onClick={()=>handleClickSave("binance","binance")}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card ">
                        <div className="card-title">Commission Rate</div>
                        <div className="input-group">
                            <label>Commission Rate</label>
                            <input type="text" name="rate" value={state.rate} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn"  onClick={()=>handleClickSave("commission_rate","rate")}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                    <div className="card ">
                        <div className="card-title">Expiry Date</div>
                        <div className="input-group">
                            <label>Expiry Date</label>
                            <input type="text" name="expiry_date" value={state.expiry_date} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={()=>handleClickSave("expiry_date","expiry_date")}><i className="fi fi-rr-check" /> Save</button>
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
                                {
                                    cronJobs.length > 0 &&
                                    cronJobs.map((cj,index) => 
                                        <tr key={index}>
                                            <td data-label="Job">
                                                <div className="input-group">
                                                    <input type="text" name="job" value={cj.job} onChange={(e) => handleChangeCronJobs(e,index)} />
                                                </div>
                                            </td>
                                            <td data-label="Timer">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" name="timer" value={cj.timer}  onChange={(e) => handleChangeCronJobs(e,index)} />
                                                </div>
                                            </td>
                                            <td data-label="Run at Start">
                                                <label><input type="checkbox" name="start" checked={cj.start}  onChange={(e) => handleChangeCronJobs(e,index)} /></label>
                                            </td>
                                            <td data-label="Action">
                                                <button className="btn btn-success" onClick={() => putCronJobs(index)} ><i className="fi fi-rr-checkbox" /></button>
                                                <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                            </td>
                                        </tr>
                                    )
                                }
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
                                {
                                    currencies.length > 0 &&
                                    currencies.map((c,index) =>
                                        <tr key={index}>
                                            <td data-label="Currency Name">
                                                <div className="input-group">
                                                    <input type="text" name="currency" value={c.currency}  onChange={(e) => handleChangeCurrency(e,index)}/>
                                                </div>
                                            </td>
                                            <td data-label="Currency Code">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" name="currency_code" value={c.currency_code}  onChange={(e) => handleChangeCurrency(e,index)}/>
                                                </div>
                                            </td>
                                            <td data-label="Currency Symbol">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" name="currency_symbol" value={c.currency_symbol}  onChange={(e) => handleChangeCurrency(e,index)}/>
                                                </div>
                                            </td>
                                            <td data-label="Action">
                                                <button className="btn btn-success" onClick={() => putCurrencies(index)}><i className="fi fi-rr-checkbox" /></button>
                                                <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                            </td>
                                        </tr>
                                    )
                                }
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
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cryptos.length > 0 &&
                                    cryptos.map((c,index) =>
                                        <tr key={index}>
                                            <td data-label="Crypto Currency Name">
                                                <div className="input-group">
                                                    <input type="text" name="crypto" value={c.crypto}  onChange={(e) => handleChangeCrypto(e,index)} />
                                                </div>
                                            </td>
                                            <td data-label="Crypto Currency Code">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" name="crypto_code" value={c.crypto_code}  onChange={(e) => handleChangeCrypto(e,index)} />
                                                </div>
                                            </td>
                                            <td data-label="Status">
                                                <label><input type="checkbox" name="status" checked={c.status}  onChange={(e) => handleChangeCrypto(e,index)} /></label>
                                            </td>
                                            <td data-label="Action">
                                                <button className="btn btn-success" onClick={() => putCrypto(index)}><i className="fi fi-rr-checkbox" /></button>
                                                <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                            </td>
                                        </tr>
                                    )
                                }
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
