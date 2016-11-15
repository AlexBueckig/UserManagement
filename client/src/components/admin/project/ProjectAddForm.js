/**
 * Created by Alex on 10.11.2016.
 */
import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

import TextFieldGroup from '../../common/TextFieldGroup';

function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required'
    }
    if (Validator.isEmpty(data.github)) {
        errors.github = 'This field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

class ProjectAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            github: '',
            errors: {},
            isLoading: false,
            invalid: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkFieldExists = this.checkFieldExists.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.addProject(this.state).then(
                (res) => {
                    this.setState({isLoading: false});
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Project added successfully!'
                    });
                },
                (err) => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    checkFieldExists(e) {
        const field = e.target.name;
        const value = e.target.value;
        if (value !== '') {
            this.props.fieldExists(value).then(
                res => {
                    let errors = this.state.errors;
                    if (res.data.project) {
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
        const {name, github, errors} = this.state;
        const {formName} = this.props;
        return (
            <form onSubmit={this.onSubmit} id={formName}>
                <TextFieldGroup field="name" value={name} label="Name" error={errors.name} onChange={this.onChange} checkFieldExists={this.checkFieldExists}/>
                <TextFieldGroup field="github" value={github} label="Github-Link" error={errors.github} onChange={this.onChange}/>
                {formName==='' && (<div className="form-group"><button className="btn btn-primary">Add</button></div>)}
            </form>
        );
    }
}

ProjectAddForm.propTypes = {
    formName: PropTypes.string,
    addProject: PropTypes.func.isRequired,
    fieldExists: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};
ProjectAddForm.defaultProps = {
    formName: ''
};

export default ProjectAddForm;