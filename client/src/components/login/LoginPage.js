import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import { login } from '../../actions/authActions';

const LoginPage = (props) => {
    const {login} = props;
    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <LoginForm login={login}/>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
