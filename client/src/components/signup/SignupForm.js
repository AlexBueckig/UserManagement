/**
 * Created by Alex on 01.11.2016.
 */

import React, {Component, PropTypes} from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import TextFieldGroup from '../common/TextFieldGroup';


function validateInput(data) {
    let errors = {};

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'This field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords must match'
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false,
            invalid: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome!'
                    });
                    this.context.router.transitionTo('/');
                },
                (err) => this.setState({errors: err.response.data, isLoading: false})
            );
        }
    }

    checkUserExists(e) {
        const field = e.target.name;
        const value = e.target.value;
        if (value !== '') {
            this.props.userExists(value).then(
                res => {
                    let errors = this.state.errors;
                    if (res.data.user) {
                        errors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' already exists';
                    } else {
                        delete errors[field];
                    }
                    this.setState({errors, invalid: !isEmpty(errors)});
                }
            );
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>
                <TextFieldGroup
                    field="username"
                    value={this.state.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    error={errors.username}
                />
                <TextFieldGroup
                    field="email"
                    value={this.state.email}
                    label="Email"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    error={errors.email}
                />
                <TextFieldGroup
                    field="password"
                    value={this.state.password}
                    label="Password"
                    type="password"
                    onChange={this.onChange}
                    error={errors.password}
                />
                <TextFieldGroup
                    field="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                    label="Repeat Password"
                    type="password"
                    onChange={this.onChange}
                    error={errors.passwordConfirmation}
                />
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={this.state.isLoading || this.state.invalid}>Sign up</button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    userExists: PropTypes.func.isRequired
};
SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignupForm;
