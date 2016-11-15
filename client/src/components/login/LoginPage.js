import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import {login} from '../../actions/authActions';

class LoginPage extends Component {
    render() {
        const {login} = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm login={login} />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
