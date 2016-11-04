/**
 * Created by Alex on 04.11.2016.
 */
import React, {
    Component,
    PropTypes,
} from 'react';

import LoginForm from './LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {};
LoginPage.defaultProps = {};

export default LoginPage;
