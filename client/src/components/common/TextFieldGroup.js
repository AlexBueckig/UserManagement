/**
 * Created by Alex on 03.11.2016.
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({field, value, label, error, type, onChange, checkUserExists}) => {
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label className="control-label">{label}</label>
            <input
                value={value}
                onChange={onChange}
                onBlur={checkUserExists}
                type={type}
                name={field}
                className="form-control"
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func,
    error: PropTypes.string
};
TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
