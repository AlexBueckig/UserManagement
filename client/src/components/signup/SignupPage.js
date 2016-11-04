/**
 * Created by Alex on 01.11.2016.
 */
import React, { Component } from 'react';

import SignupForm from './SignupForm';

class SignupPage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm />
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
};

SignupPage.defaultProps = {};

export default SignupPage;
