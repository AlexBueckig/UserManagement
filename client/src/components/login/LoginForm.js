/**
 * Created by Alex on 04.11.2016.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


import TextFieldGroup from '../common/TextFieldGroup';

function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.identifier)) {
        errors.identifier = 'This field is required'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if(!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
                (res) => this.context.router.transitionTo('/'),
                (err) => this.setState({errors: err.response.data.errors, isLoading: false})
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { identifier, errors, password, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <TextFieldGroup
                    field="identifier"
                    value={identifier}
                    label="Username / Email"
                    error={errors.identifier}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="password"
                    value={password}
                    label="Password"
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {};
LoginForm.defaultProps = {
    login: PropTypes.func.isRequired
};
LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginForm;
