import React from 'react'
import { Col, Row } from 'react-grid-system'

export default function Sales() {
    return (
        <div className="card">
            <Row>
                <Col xs={12}>
                <div className="card-title">
                    <i className="fi fi-rr-book" /> Sales
                </div>
                </Col>
                <Col xs={12}>
                    <table>
                        <caption></caption>
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Payment Total</th>
                            <th scope="col">Rate of Exchange</th>
                            <th scope="col">Crypto Name</th>
                            <th scope="col">Crypto Voucher Total</th>
                            <th scope="col">Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Name">
                                    Batuhan Bekir
                                </td>
                                <td data-label="Payment Total">
                                    200
                                </td>
                                <td data-label="Rate of Exchange">
                                    € (Euro)
                                </td>
                                <td data-label="Crypto Name">
                                    BTC (Bitcoin)
                                </td>
                                <td data-label="Crypto Voucher Total">
                                    0.00539717
                                </td>
                                <td data-label="Key">
                                    a489sc15a6s5a1sa98c1zx51c568as4c89a1c3s21d23as1d6as8d4
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}
