import React from 'react'
import { Col, Row } from 'react-grid-system'

import './style.css'

export default function Dashboard() {
    return (
        <div className="card">
            <Row>
                <Col xs={12}>
                <div className="card-title">
                    <i className="fi fi-rr-dashboard" /> Dashboard
                </div>
                </Col>
                <Col md={6} lg={3}>
                    <div className="card-total">
                        <div className="card-total-title">
                            This Week
                        </div>
                        <div className="card-total-count">
                            50 pieces
                        </div>
                        <div className="card-total-footer">
                            <span className="positive">7.34% <i className="fi fi-rr-arrow-small-up" /></span> more than last week
                        </div>
                    </div>
                </Col>
                <Col md={6} lg={3}>
                    <div className="card-total">
                        <div className="card-total-title">
                            This Month 
                        </div>
                        <div className="card-total-count">
                            250 pieces
                        </div>
                        <div className="card-total-footer">
                            <span className="positive">20.34% <i className="fi fi-rr-arrow-small-up" /></span> more than last month
                        </div>
                    </div>
                </Col>
                <Col md={6} lg={3}>
                    <div className="card-total">
                        <div className="card-total-title">
                            Total Sales
                        </div>
                        <div className="card-total-count">
                            500 pieces
                        </div>
                        <div className="card-total-footer">
                            <span className="negative">-4.34% <i className="fi fi-rr-arrow-small-down" /></span> more than last month
                        </div>
                    </div>
                </Col>
                <Col md={6} lg={3}>
                    <div className="card-total">
                        <div className="card-total-title">
                            Total Redeem
                        </div>
                        <div className="card-total-count">
                            450 pieces
                        </div>
                        <div className="card-total-footer">
                            <span className="negative">-1.34% <i className="fi fi-rr-arrow-small-down" /></span> more than last month
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
