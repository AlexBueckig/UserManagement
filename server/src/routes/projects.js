/**
 * Created by Alex on 07.11.2016.
 */
import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import Project from '../models/project';
import authenticate from '../middleware/authenticate';
import authenticateAdmin from '../middleware/authenticateAdmin';

let router = express.Router();

function commonValidations(data) {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }
    if (Validator.isEmpty(data.github)) {
        errors.github = 'This field is required';
    }
    return errors;

}

function validateInput(data, otherValidations) {
    let errors = otherValidations(data);

    return Project.query({
        where: {name: data.name}
    }).fetch().then(project => {
        console.log(project);
        if (project) {
            errors.name = 'Project already exists';
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    })
}

router.get('/:identifier', authenticate, (req, res) => {
    Project.query({
        where: {
            id: req.params.identifier
        }
    }).fetch()
        .then(project => {
            if (project !== null)
                res.send({project});
            else
                res.status(404).json({error: 'Project not found'});
        })
        .catch(err =>
            res.status(500).json({error: err})
        );
});

router.get('/:identifier/users', authenticate, (req, res) => {
    Project.query({
        where: {
            id: req.params.identifier
        }
    }).fetch({withRelated: ['users']})
        .then(project => {
            if (project !== null)
                res.send({project});
            else
                res.status(404).json({error: 'Project not found'});
        })
        .catch(err =>
            res.status(500).json({error: err})
        );
});

router.get('/', authenticateAdmin, (req, res) => {
    Project.query({}).fetchAll()
        .then(projects => {
            if (projects.length !== 0)
                res.send({projects});
            else
                res.status(404).json({error: 'No projects available'});
        })
        .catch(err =>
            res.status(500).json({error: err})
        );
});

router.post('/', authenticateAdmin, (req, res) => {
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
        if (isValid) {
            const {name, github} = req.body;

            Project.forge({name, github}).save()
                .then(project => res.json({success: true}))
                .catch(err => res.status(500).json({error: err}));
        } else {
            res.status(400).json(errors);
        }
    });
});

router.post('/:identifier/users', authenticateAdmin, (req, res) => {
    const {user_id} = req.body;
    Project.forge({user_id, project_id: req.params.identifier}).save()
        .then(user => res.json({success: true}))
        .catch(err => res.status(500).json({error: err}));
});

export default router;