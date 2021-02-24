import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'

import './style.css'

export default function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col sm={6}>
                        <div className="footer-links">
                            <Link to="/en/terms-conditions">Terms and Conditions</Link>
                            <br/>
                            <Link to="/en/cookies-policy">Privacy policy</Link>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <img src="/assets/icons/visa.svg" alt=""/><img src="/assets/icons/mastercard.svg" alt=""/>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
