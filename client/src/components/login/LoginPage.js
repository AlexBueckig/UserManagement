/**
 * Created by Alex on 04.11.2016.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions/login';
import LoginForm from './LoginForm';

class LoginPage extends Component {
    render() {
        const { login } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm login={login}/>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};
LoginPage.defaultProps = {};

export default connect(null, {login})(LoginPage);
