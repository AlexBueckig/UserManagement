/**
 * Created by Alex on 03.11.2016.
 */

import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();

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

router.post('/', (req, res) => {
    const {errors, isValid} = validateInput(req.body);

    if (isValid) {
        const {username, password, email} = req.body;
        const password_digest = bcrypt.hashSync(password, 10);

        User.forge({
            username, email, password_digest
        }, {hasTimestamps: true}).save()
            .then(user => res.json({success: true}))
            .catch(err => res.status(500).json({error: err}));
    } else {
        res.status(400).json(errors);
    }
});

export default router;