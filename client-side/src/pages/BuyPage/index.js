import React, { useState, useEffect } from 'react'
import { Col, Container, Row, useScreenClass } from 'react-grid-system'
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useGetAndSet } from 'react-context-hook'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import languages from '../../lang/languages.json'
import CreditCard from '../../components/CreditCard';
import './style.css'

const staticValues = [10,25,50,100,200]
const data = [
    {name: 'Page A', uv: 400},
    {name: 'Page A', uv: 500},
    {name: 'Page A', uv: 200},
    {name: 'Page A', uv: 600},
    {name: 'Page A', uv: 700},
    {name: 'Page A', uv: 200},
    {name: 'Page A', uv: 300},
    {name: 'Page A', uv: 500},
    {name: 'Page A', uv: 100},
    {name: 'Page A', uv: 200},
    {name: 'Page A', uv: 300},
    {name: 'Page A', uv: 500},
    {name: 'Page A', uv: 600},
    {name: 'Page A', uv: 100},
    {name: 'Page A', uv: 600},
    {name: 'Page A', uv: 900},
];

export default function BuyPage() {
    const [voucherVal, setVoucherVal] = useState('50')
    const [cryptoVal, setCryptoVal] = useState('')
    const [cryptoOptions, setCryptoOptions] = useState([
        {text:"BTC",value:"BTC"},
        {text:"ETH",value:"ETH"}
    ])
    const [cryptoState,setCryptoState] = useState([])
    const [selected,setSelected] = useState('BTC')
    const [modalShow,setModalShow] = useState(false)
    const [creditCardInfo,setCreditCardInfo] = useState({number: "", name: "", expiry: "", cvc: "", issuer: ""})

    const [currency, setCurrency] = useGetAndSet('currency')
    const [currencies, setCurrencies] = useGetAndSet('currencies')
    const [crypto_currencys, setCrypto_currencys] = useGetAndSet('crypto_currencys')

    const screenClass = useScreenClass();
    const selectedCurrency = currencies.filter(c => c.value === currency)[0]

    let { lang } = useParams();
    const selectLang = languages.hasOwnProperty(lang) ? languages[lang] : languages["en"]
    
    useEffect(() => {
        async function getCrypto(){
            var res = await axios.get(`http://localhost:3000/24h`)
            
            var crypto_data = []
            var keys = Object.keys(res.data).map((key) => key);

            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                var crypto_ = res.data[key]
                crypto_.code = key
                crypto_.data = []
                var prices_res = crypto_.prices.filter(cp => cp.currency === currency)[0].result
                var result = Object.keys(prices_res).map((x) => prices_res[x]);
                for (let b = 0; b < result.length; b++) {
                    const element = result[b];
                    crypto_.data.push({name:key,uv:element})
                }
                crypto_data.push(crypto_)
            }
            setCryptoState(crypto_data)
            console.log(crypto_data)
        }
        getCrypto()
    },[currency,setCryptoState])
    
    function moneyformat(number) {
        return new Intl.NumberFormat().format(number)
    }
    function handleChangeVoucherVal(value){
        value = value.toString().replace(",",".")
        value = value === "" ? 0 : value 
        var selectedPrice = cryptoState.filter(cs => cs.code === selected)[0]
        var toCrypto = parseFloat(value)/selectedPrice.prices.filter(c => c.currency === currency)[0].result.lastPrice
        setVoucherVal(value)
        setCryptoVal(toCrypto.toFixed(8))
    }
    function handleChangeSelect(value){
        setSelected(value)
        var selectedPrice = cryptoState.filter(cs => cs.code === value)[0]
        var toCrypto = parseFloat(voucherVal)/selectedPrice.prices.filter(c => c.currency === currency)[0].result.lastPrice
        setCryptoVal(toCrypto.toFixed(8))
    }
    useEffect(() => {
        if(cryptoState.length > 0){
            var selectedPrice = cryptoState.filter(cs => cs.code === selected)[0]
            var toCrypto = parseFloat(voucherVal)/selectedPrice.prices.filter(c => c.currency === currency)[0].result.lastPrice
            setCryptoVal(toCrypto.toFixed(8))
        }
    }, [cryptoState,currency])
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    return (
        <>
            <Container>
                <Row justify="between">
                    <Col md={6} lg={4} style={{ 
                                paddingLeft: ['sm'].includes(screenClass) ? '15px' : '5px', 
                                paddingRight: ['sm'].includes(screenClass) ? '15px' : '5px'
                                }}
                            >
                        <div className="buying-card">
                            <div className="buying-card-header">
                                <h3>{selectLang.buy_instantly}</h3>
                            </div>
                            <div className="buying-card-body">
                                <div className="buying-card-body-subtitle">{selectLang.voucher_value}</div>
                                <div className="currency-input"><div>{selectedCurrency.text}</div><input type="tel" value={voucherVal} onChange={({target}) => handleChangeVoucherVal(target.value)} /></div>
                                <div className="static-values">
                                    {
                                        staticValues.map(sv => <div key={sv} onClick={() => handleChangeVoucherVal(sv)}>{selectedCurrency.text}{sv}</div>)
                                    }
                                </div>
                                <div className="buying-card-body-subtitle">{selectLang.currently_worth}</div>
                                <div className="input-select-together">
                                    <input type="tel" value={cryptoVal} onChange={({target}) => setCryptoVal(target.value)} />
                                    <select defaultChecked={selected} onChange={(e) => handleChangeSelect(e.target.value)}>
                                        {
                                            cryptoOptions.map(cc => <option key={cc.value} value={cc.value}>{cc.text}</option>)
                                        }
                                    </select>
                                </div>
                                <button className="btn-buy" onClick={() => setModalShow(!modalShow)}>{selectLang.buy_now}</button>
                                <small>{selectLang.payment_control}</small>
                            </div>
                            <div className="buying-card-footer"><img src="/assets/icons/visa.svg" alt=""/><img src="/assets/icons/mastercard.svg" alt=""/></div>
                        </div>
                    </Col>
                    <Col md={6} lg={8}>
                        <Row>
                            {
                                cryptoState.length > 0 &&
                                cryptoState.map((crypto,index) => 
                                    <Col xs={6} lg={4} key={index} style={{ 
                                        paddingLeft: ['sm'].includes(screenClass) ? '15px' : '5px', 
                                        paddingRight: ['sm'].includes(screenClass) ? '15px' : '5px'
                                        }}
                                    >
                                        <div className="crypto-card">
                                            <div className="crypto-card-header">
                                                {crypto_currencys.filter(cc => cc.code === crypto.code)[0].name} <span>{crypto.code}</span></div>
                                            <div className="crypto-card-body">
                                                <div className="rt-price">{selectedCurrency.text} {moneyformat(crypto.prices.filter(c => c.currency === currency)[0].result.lastPrice)}</div> 
                                                <div><span className="crypto-status">{parseFloat(crypto.priceChangePercent).toFixed(2)}%</span> {selectLang.for_last_24_hours}</div>
                                            </div>
                                            <div className="crypto-card-footer">
                                                <div style={{ width: '100%', height: 50 }}>
                                                    <ResponsiveContainer>
                                                        <LineChart data={shuffle(crypto.data)}>
                                                            <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={""}/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
                
            </Container>
            <div className="information-row">
                <Container>
                    <Row justify="center">
                        <Col sm={6} lg={3}>
                            <div className="information-card">
                                <img src="/assets/icons/gift-card-1.png" alt="" />
                                <h3>Exchange a gift card</h3>
                                <small>
                                Get a Crypto Voucher with gift cards. The easiest way to exchange other gift cards to Bitcoin
                                </small>

                            </div>
                        </Col>
                        <Col sm={6} lg={3}>
                            <div className="information-card">
                                <img src="/assets/icons/24-hours-icon-12-1.png" alt="" />
                                <h3>7/24 Buy</h3>
                                <small>
                                Get a Crypto Voucher with gift cards. The easiest way to exchange other gift cards to Bitcoin
                                </small>
                            </div>
                        </Col>
                        <Col sm={6} lg={3}>
                            <div className="information-card">
                                <img src="/assets/icons/checked-1.png" alt="" />
                                <h3>Secure Shopping</h3>
                                <small>
                                Get a Crypto Voucher with gift cards. The easiest way to exchange other gift cards to Bitcoin
                                </small>
                            </div>
                        </Col>
                        <Col sm={6} lg={3}>
                            <div className="information-card">
                                <img src="/assets/icons/clock-1.png" alt="" />
                                <h3>Fast Processing</h3>
                                <small>
                                Get a Crypto Voucher with gift cards. The easiest way to exchange other gift cards to Bitcoin
                                </small>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="modal-area" style={{display:modalShow ? "block" : "none"}} onClick={() => setModalShow(!modalShow)} />
            <div className="modal" style={{width:"350px",display:modalShow ? "block" : "none"}}>
                <CreditCard 
                    handleClickPay={(e) => setCreditCardInfo(e)}
                    cc_card_number={selectLang.card_number} 
                    cc_name={selectLang.name} 
                    cc_valid_thru={selectLang.valid_thru} 
                    cc_cvc={selectLang.cvc} 
                    cc_pay={selectLang.pay} 
                    cc_payment={selectLang.payment}
                    />
            </div>
        </>
    )
}
