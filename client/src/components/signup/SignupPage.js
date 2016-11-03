/**
 * Created by Alex on 01.11.2016.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { userSignupRequest } from '../../actions/signupActions';

import SignupForm from './SignupForm';

class SignupPage extends Component {
    render() {
        const { userSignupRequest } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userSignupRequest={userSignupRequest}/>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};

SignupPage.defaultProps = {};

export default connect(null, { userSignupRequest })(SignupPage);
