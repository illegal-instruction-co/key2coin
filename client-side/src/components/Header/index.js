import React, { useEffect, useState } from 'react'
import { Col, Container, Hidden, Row, Visible } from 'react-grid-system'
import { useGetAndSet, useSetStoreValue, useStoreState } from 'react-context-hook'
import { Link,useParams,useHistory } from 'react-router-dom'

import './style.css'
//import logo from './k2c.png'
import menuIcon from './menu.svg'
import HeaderMiniSelect from '../HeaderMiniSelect'
import axios from '../../interceptor'

const initialState = {
    language_id:""
}
export default function Header() {
    const store = useStoreState()
    const [mobileMenu,setMobileMenu] = useState(false)
    const [currency, setCurrency] = useGetAndSet('currency')
    const [currencies,setCurrencies] = useGetAndSet('currencies')
    const [language, setLanguage] = useGetAndSet('language')
    const [langs, setlangs] = useState([])
    const [languages,setLanguages] = useGetAndSet('languages')
    const [selectLang,setselectLang] = useGetAndSet('selectLang')
    const setSelectedLangID = useSetStoreValue('selectedLangID')
    const [state, setstate] = useState(initialState)

    let history = useHistory();
    const { lang } = useParams();

    function handleChangeLang(value) {
        setLanguage(value)
        var selectedLangID = langs.filter( l => l.value === value)[0].id
        var selectLang = store.languages.filter(l => l.language_id === selectedLangID)
        var selectedLang = {}
        for (let i = 0; i < selectLang.length; i++) {
            const element = selectLang[i];
            selectedLang[element.key] = element.value
        }
        setselectLang(selectedLang)
        setSelectedLangID(selectedLangID)
        history.push(`/${value}`)
    }
    useEffect(() => {
        setLanguage(lang)
    }, [lang])

    useEffect(() => {
        function getLanguages(){
            axios.get('/api/languages').then(res => {
                var options = []
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    options.push({id:element.id,value:element.value,text:element.short_name})
                }
                setlangs(options)
            }).catch(err => console.log(err))
        }
        function getCurrencies(){
            axios.get('/api/currencies').then(res => {
                var options = []
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    options.push({id:element.id,value:element.currency_code,text:element.currency_symbol})
                }
                setCurrencies(options)
            }).catch(err => console.log(err))
        }
        getCurrencies()
        getLanguages()
    }, [])

    useEffect(() => {
        function getTranslates(){
            axios.get('/api/translates').then(res => {
                if(langs.length > 0){
                    var selectedLang = {}
                    var language_id = langs.filter(l => l.value === lang)[0].id
                    setSelectedLangID(language_id)
                    var selectLang = res.data.filter(l => l.language_id === language_id)
                    for (let i = 0; i < selectLang.length; i++) {
                        const element = selectLang[i];
                        selectedLang[element.key] = element.value
                    }
                    setselectLang(selectedLang)
                    setstate({language_id})
                    setLanguages(res.data)
                }
                setCurrency("USD")
            }).catch(err => console.log(err))
        }
        getTranslates()
    }, [langs])
    return (
        <div className="header">
        <Container>
        <Row justify="between">
            <Visible xs sm>
                <Col xs={3}>
                    <img src={menuIcon} alt="menu-icon" className="menu-icon" onClick={() => setMobileMenu(!mobileMenu)}  />
                </Col>
                <Col className="logo" xs={3} md={2}>
                    <Link to={`/${lang}/buy`} className="text">key2coin</Link>
                </Col>
                <Col className="menu-action" xs={4} md={2}>
                    <HeaderMiniSelect defaultValue={state.language_id.toString()} options={langs} onChange={(e) => handleChangeLang(e.target.value)} />
                    <HeaderMiniSelect defaultValue={currency} options={currencies} onChange={(e) => setCurrency(e.target.value)} />
                </Col>
                <Visible xs={mobileMenu} sm={mobileMenu}>
                    <Col xs={12}>
                        <Row>
                            <Col className="mobile-menu" xs={12}>
                                <Link to={`/${lang}/buy`}>{selectLang.nav_buy}</Link>
                                <Link to={`/${lang}/redeem`}>{selectLang.nav_redeem}</Link>
                                <Link to={`/${lang}/about`}>{selectLang.nav_about}</Link>
                                <Link to={`/${lang}/whitepaper`}>Whitepaper</Link>
                                <a href={`https://docs.key2coin.com`}>{selectLang.nav_developers}</a>
                            </Col>
                        </Row>
                    </Col>
                </Visible>
            </Visible>
            <Hidden xs sm>
                <Col className="logo" xs={3} md={2}>
                    <Link to={`/${lang}/buy`} className="text">key2coin</Link>
                </Col>
                <Col className="menu" xs={5} md={6}>
                    <Link to={`/${lang}/buy`}>{selectLang.nav_buy}</Link>
                    <Link to={`/${lang}/redeem`}>{selectLang.nav_redeem}</Link>
                    <Link to={`/${lang}/about`}>{selectLang.nav_about}</Link>
                    <Link to={`/${lang}/whitepaper`}>Whitepaper</Link>
                    <a href={`https://docs.key2coin.com`}>{selectLang.nav_developers}</a>
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
