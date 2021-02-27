import React, { useEffect, useState } from 'react'
import { Col, Container, Hidden, Row, Visible } from 'react-grid-system'
import { useGetAndSet } from 'react-context-hook'
import { Link,useParams,useHistory } from 'react-router-dom'

import './style.css'
import logo from './k2c.png'
import menuIcon from './menu.svg'
import HeaderMiniSelect from '../HeaderMiniSelect'
import languages from '../../lang/languages.json'

export default function Header() {
    const [mobileMenu,setMobileMenu] = useState(false)
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
        <div className="header">
        <Container>
        <Row justify="between">
            <Visible xs sm>
                <Col xs={3}>
                    <img src={menuIcon} alt="menu-icon" className="menu-icon" onClick={() => setMobileMenu(!mobileMenu)}  />
                </Col>
                <Col className="logo" xs={3} md={2}>
                    <Link to={`/${lang}/buy`}> <img src={logo} alt="" /> </Link>
                </Col>
                <Col className="menu-action" xs={4} md={2}>
                    <HeaderMiniSelect defaultValue={lang} options={langs} onChange={(e) => handleChangeLang(e.target.value)} />
                    <HeaderMiniSelect defaultValue={currency} options={currencies} onChange={(e) => setCurrency(e.target.value)} />
                </Col>
                <Visible xs={mobileMenu} sm={mobileMenu}>
                    <Col xs={12}>
                        <Row>
                            <Col className="mobile-menu" xs={12}>
                                <Link to={`/${lang}/buy`}>{selectLang.nav_buy}</Link>
                                <Link to={`/${lang}/redeem`}>{selectLang.nav_redeem}</Link>
                                <a href={`https://docs.key2coin.com`}>{selectLang.developers}</a>
                            </Col>
                        </Row>
                    </Col>
                </Visible>
            </Visible>
            <Hidden xs sm>
                <Col className="logo" xs={3} md={2}>
                    <Link to={`/${lang}/buy`}> <img src={logo} alt="" /> </Link>
                </Col>
                <Col className="menu" xs={5} md={6}>
                    <Link to={`/${lang}/buy`}>{selectLang.nav_buy}</Link>
                    <Link to={`/${lang}/redeem`}>{selectLang.nav_redeem}</Link>
                    <a href={`https://docs.key2coin.com`}>{selectLang.developers}</a>
                </Col>
                <Col className="menu-action" xs={4} md={2}>
                    <HeaderMiniSelect defaultValue={lang} options={langs} onChange={(e) => handleChangeLang(e.target.value)} />
                    <HeaderMiniSelect defaultValue={currency} options={currencies} onChange={(e) => setCurrency(e.target.value)} />
                </Col>
            </Hidden>
        </Row>
        </Container>
        </div>
    )
}
