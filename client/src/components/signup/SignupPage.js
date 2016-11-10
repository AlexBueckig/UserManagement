/**
 * Created by Alex on 01.11.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupForm from './SignupForm';
import { userSignupRequest, userExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends Component {
    render() {
        const { userSignupRequest, addFlashMessage, userExists } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm addFlashMessage={addFlashMessage} userExists={userExists} userSignupRequest={userSignupRequest} />
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {

};

SignupPage.defaultProps = {};

export default connect(null, { userSignupRequest, addFlashMessage, userExists })(SignupPage);
