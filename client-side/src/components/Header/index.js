import React, { useEffect } from 'react'
import { Col, Row } from 'react-grid-system'
import { useGetAndSet } from 'react-context-hook'
import { Link,useParams,useHistory } from 'react-router-dom'

import './style.css'
import logo from './k2c.png'
import HeaderMiniSelect from '../HeaderMiniSelect'
import languages from '../../lang/languages.json'

export default function Header() {
    const [currency, setCurrency] = useGetAndSet('currency')
    const [language, setLanguage] = useGetAndSet('language')
    const [langs, setlangs] = useGetAndSet('langs')
    const [currencies, setcurrencies] = useGetAndSet('currencies')

    let history = useHistory();
    let { lang } = useParams();
    const selectLang = languages.hasOwnProperty(lang) ? languages[lang] : languages["en"]
    function handleChangeLang(value) {
        setLanguage(value)
        history.push(`/${value}`)
    }
    useEffect(() => {
        setLanguage(lang)
    }, [lang])
    return (
        <Row className="header" justify="center">
            <Col className="logo" xs={3} md={2}>
                <img src={logo} alt="" />
            </Col>
            <Col className="menu" xs={5} md={6}>
                <Link to={`/${lang}/buy`}>{selectLang.nav_buy}</Link>
                <Link to={`/${lang}/redeem`}>{selectLang.nav_redeem}</Link>
                <Link to={`/${lang}/`}>{selectLang.developers}</Link>
            </Col>
            <Col className="menu-action" xs={4} md={2}>
                <HeaderMiniSelect defaultValue={lang} options={langs} onChange={(e) => handleChangeLang(e.target.value)} />
                <HeaderMiniSelect defaultValue={currency} options={currencies} onChange={(e) => setCurrency(e.target.value)} />
            </Col>
        </Row>
    )
}
