/**
 * Created by Alex on 03.11.2016.
 */

import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidations) {
    let {errors, isValid} = otherValidations(data);

    return User.query({
        where: {email: data.email},
        orWhere: {username: data.username}
    }).fetchAll().then(users => {
        users.map(user => {
            if (user) {
                if (user.get('username') === data.username) {
                    errors.username = 'Username already exists';
                }
                if (user.get('email') === data.email) {
                    errors.email = 'Email already exists';
                }
            }
        });

        return {
            errors,
            isValid: isEmpty(errors)
        };
    })
}

function commonValidations(data) {
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
    };
}

router.get('/:identifier', (req, res) => {
    User.query({
        select: ['id', 'username', 'email'],
        where: {email: req.params.identifier},
        orWhere: {username: req.params.identifier}
    }).fetch()
        .then(user => res.json({user}))
        .catch(err => res.status(500).json({error: err}));
});

router.get('/:identifier/projects', (req, res) => {
    User.query({
        select: ['id', 'username', 'email'],
        where: {email: req.params.identifier},
        orWhere: {username: req.params.identifier}
    }).fetch({withRelated: ['projects']})
        .then(user => res.json({user}))
        .catch(err => res.status(500).json({error: err}));
});

router.get('/', (req, res) => {
    User.query({
        select: ['id', 'username', 'email']
    }).fetchAll()
        .then(users => res.json({users}))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/', (req, res) => {
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
        if (isValid) {
            const {username, password, email} = req.body;
            const password_digest = bcrypt.hashSync(password, 10);

            User.forge({
                username, email, password_digest
            }).save()
                .then(user => res.status(201).json({success: true}))
                .catch(err => res.status(500).json({error: err}));

        } else {
            res.status(400).json(errors);
        }
    });
});

router.delete('/:identifier', (req, res) => {
    User.forge({id: req.params.identifier}).destroy()
        .then(success => res.json({success:true}))
        .catch(err => res.status(500).json({error: err}));
});

export default router;