import React from 'react'
import PropTypes from 'prop-types';

import './style.css'

export default function HeaderMiniSelect(props) {
    return (
        <div className="lang-curr-select">
            <select name="slct" id="slct" defaultValue={props.defaultValue} onChange={props.onChange}>
                {
                    props.options.map(option => <option value={option.value} key={option.value}>{option.text}</option>)
                }
            </select>
        </div>
    )
}
HeaderMiniSelect.propTypes = {
    options: PropTypes.array,
    defaultValue:PropTypes.string,
    onChange:PropTypes.func
};
