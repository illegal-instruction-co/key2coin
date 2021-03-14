import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'

import { handleChange } from '../Settings/functions'
import axios from '../../interceptor'
import { useToasts } from 'react-toast-notifications'

const initialState = {
    language : "",
    short_name : "",
    value : "",
    selectedLang: {
        id:"",
        language:"",
        value:""
    }
}
export default function Languages() {
    const [state, setState] = useState(initialState)
    const [languages, setLanguages] = useState([])
    const [languageTexts,setLanguageTexts] = useState([])
    const [saveBtn,setSaveBtn] = useState(false)
    const { addToast } = useToasts();
    
    function toast(status,content){
        //status = success,error,warning,info
        addToast(content, {
            appearance: status,
            autoDismiss: true,
        })
    }
    function postLang(){
        const { language, short_name, value } = state
        axios.post('languages',{ language, short_name, value }).then(res => {
            toast("success","New language added.")
            console.log(res.data)
        }).catch(err => toast("error", err))
    }
    function getEditLang(id,language,value){
        setState({...state,selectedLang:{id, language, value}})
        axios.get('translates',{params:{language_id:id}}).then(res => setLanguageTexts(res.data))
        .catch(err => console.log(err))
    }
    function handleChangeTranslate(e,index){
        var texts = [...languageTexts]
        var name = e.target.name
        var value = e.target.value
        texts[index][name] = value
        setLanguageTexts(texts)
    }
    function putLangTexts(){
        let i = 0
        if(state.selectedLang.id === "") return toast("warning", "Select the language you want to edit.")
        for (i; i < languageTexts.length; i++) {
            const l = languageTexts[i];
            axios.put(`translates/${l.id}`,{value:l.value})
            .catch(err => {
                return toast("error",err)
            })
        }
        if(i === languageTexts.length) {
            setSaveBtn(false)
            return toast("success","The changes have been updated.")
        }
    }
    useEffect(() => {
        function getLangs(){
            axios.get('languages').then(res => {
                setLanguages(res.data)
            }).catch(err => console.log(err))
        }
        getLangs()
    }, [])
    return (
        <div className="card">
            <Row>
                <Col xs={12}>
                <div className="card-title">
                    <i className="fi fi-rr-world" /> Languages
                </div>
                </Col>
                <Col md={6}>
                    <div className="card">
                        <div className="card-title">Add Languages</div>
                        <div className="input-group">
                            <label>Language</label>
                            <input type="text" name="language" value={state.language} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Short Name</label>
                            <input type="text" name="short_name" value={state.short_name} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Value</label>
                            <input type="text" name="value" value={state.value} onChange={({target}) => handleChange(setState,target.name,target.value)} />
                        </div>
                        <button className="btn" onClick={postLang}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                    <div className="card">
                        <div className="card-title">Languages List</div>
                        <table>
                            <caption></caption>
                            <thead>
                                <tr>
                                <th scope="col">Language</th>
                                <th scope="col">Short Name</th>
                                <th scope="col">Value</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    languages.map(l => 
                                        <tr key={l.id}>
                                            <td data-label="Language">
                                                {l.language}
                                            </td>
                                            <td data-label="Short Name">
                                                {l.short_name}
                                            </td>
                                            <td data-label="Value">
                                                {l.value}
                                            </td>
                                            <td data-label="Action">
                                                <button className="btn" onClick={() => getEditLang(l.id, l.language, l.value)}><i className="fi fi-rr-edit" /></button>
                                                <button className="btn btn-danger"><i className="fi fi-rr-trash" /></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="card">
                        <div className="card-title">Language Edit</div>
                        <table>
                            <caption>Selected Language {"=>"} {state.selectedLang.language}</caption>
                            <thead>
                                <tr>
                                <th scope="col">Key</th>
                                <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    languageTexts.length > 0 &&
                                    languageTexts.map((lt,index) => 
                                        <tr key={index}>
                                            <td data-label="Key">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" defaultValue={lt.key} disabled />
                                                </div>
                                            </td>
                                            <td data-label="Value">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" value={lt.value || ""} name="value" onChange={(e) => handleChangeTranslate(e,index)} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <button className="btn" onClick={putLangTexts} disabled={saveBtn}><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
