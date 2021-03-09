import React, { useState,useEffect } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useParams } from 'react-router-dom'

import languages from '../../lang/languages.json'
import './style.css'

export default function Redeem() {
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const [term, setTerm] = useState(true)
    const [newsletter, setNewsletter] = useState(true)

    let { lang } = useParams();
    const selectLang = languages.hasOwnProperty(lang) ? languages[lang] : languages["en"]

    useEffect(() => {
      document.title = 'Key2Coin | Redeem crypto currency keys'
    }, [])

    return (
        <Container>
            <Row justify="center">
                <Col md={6} lg={5} xl={4}>
                    <div className="redeem-form">
                        <div className="redeem-form-group">
                            <label>{selectLang.enter_the_code}</label>
                            <input type="text" name="code" value={code} placeholder={selectLang.enter_the_code_ph} onChange={(e) => setCode(e.target.value)} />
                        </div>
                        <div className="redeem-form-group">
                            <label>{selectLang.email}</label>
                            <input type="email" name="email" value={email} placeholder={selectLang.email_ph} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="redeem-form-checkbox">
                            <input type="checkbox" name="term" checked={term} id="term" onClick={() => setTerm(!term)} />
                            <label htmlFor="term">{selectLang.term_check}</label>
                        </div>

                        <div className="redeem-form-checkbox">
                            <input type="checkbox" name="newsletter" checked={newsletter} id="newsletter" onClick={() => setNewsletter(!newsletter)} />
                            <label htmlFor="newsletter">{selectLang.newsletter_check}</label>
                        </div>
                        <div className="redeem-form-group">
                        <button className="btn-buy">{selectLang.redeem_button_continue}</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
