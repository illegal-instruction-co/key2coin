import React, { useState } from 'react'
import { Col, Row } from 'react-grid-system'

import { handleChange } from '../Settings/functions'
import { languagesContent } from './languages'

const initialState = {
    language : "",
    shortName : "",
    langValue : "",
    selectedLang:"en"
}
const langTexts = [
"nav_buy",
"nav_redeem",
"buy_instantly",
"voucher_value",
"currently_worth",
"buy_now",
"payment_control",
"for_last_24_hours",
"payment",
"card_number",
"name",
"valid_thru",
"cvc",
"pay",
"enter_the_code",
"enter_the_code_ph",
"email",
"email_ph",
"term_check",
"newsletter_check",
"redeem_button_continue",
"developers",
"card1title",
"card1content",
"card2title",
"card2content",
"card3title",
"card3content",
"card4title",
"card4content",
]
const languages = [
    {
        id:1,
        name:"English",
        shortName:"EN",
        value:"en"
    },{
        id:2,
        name:"Türkçe",
        shortName:"TR",
        value:"tr"
    },{
        id:3,
        name:"Español",
        shortName:"ES",
        value:"es"
    },{
        id:4,
        name:"Français",
        shortName:"FR",
        value:"fr"
    }
]
export default function Languages() {
    const [state, setState] = useState(initialState)
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
                            <input type="text" name="language" value={state.language} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Short Name</label>
                            <input type="text" name="shortName" value={state.shortName} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Value</label>
                            <input type="text" name="langValue" value={state.langValue} onChange={({target}) => handleChange(state,setState,target.name,target.value)} />
                        </div>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
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
                                                {l.name}
                                            </td>
                                            <td data-label="Short Name">
                                                {l.shortName}
                                            </td>
                                            <td data-label="Value">
                                                {l.value}
                                            </td>
                                            <td data-label="Action">
                                                <button className="btn" onClick={() => setState({...state,selectedLang:l.value})}><i className="fi fi-rr-edit" /></button>
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
                            <caption>Selected Lang : {state.selectedLang}</caption>
                            <thead>
                                <tr>
                                <th scope="col">Key</th>
                                <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    langTexts.map((lt,index) => 
                                        <tr key={index}>
                                            <td data-label="Key">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" value={lt} disabled/>
                                                </div>
                                            </td>
                                            <td data-label="Value">
                                                <div className="input-group">
                                                    <label></label>
                                                    <input type="text" value={languagesContent[state.selectedLang][lt]} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <button className="btn"><i className="fi fi-rr-check" /> Save</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
