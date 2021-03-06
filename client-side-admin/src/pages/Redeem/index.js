import React from 'react'
import { Col, Row } from 'react-grid-system'

export default function Redeem() {
    return (
        <div className="card">
            <Row>
                <Col xs={12}>
                <div className="card-title">
                    <i className="fi fi-rr-receipt" /> Redeem
                </div>
                </Col>
                <Col xs={12}>
                    <table>
                        <caption></caption>
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Crypto Name</th>
                            <th scope="col">Crypto Voucher Total</th>
                            <th scope="col">Key</th>
                            <th scope="col">Days Left</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Name">
                                    Batuhan Bekir
                                </td>
                                <td data-label="E-mail">
                                    batuhanbekir@gmail.com
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
                                <td data-label="Days Left">
                                    90
                                </td>
                                <td data-label="Status">
                                    <i className="fi fi-rr-check" /> Sent
                                    <br />
                                    <i className="fi fi-rr-user-time" /> Waiting...
                                    <br />
                                    <i className="fi fi-rr-time-delete" /> Canceled
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}
