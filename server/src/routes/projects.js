/**
 * Created by Alex on 07.11.2016.
 */
import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import Project from '../models/project';
import ProjectUser from '../models/projectUser';
import authenticate from '../middleware/authenticate';
import authenticateAdmin from '../middleware/authenticateAdmin';

let router = express.Router();

router.get('/:identifier', authenticate, (req, res) => {
    Project.query({
        where: {
            name: req.params.identifier
        }
    }).fetch()
        .then(project => {
            res.json({project});
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
    }).fetch({
        withRelated: [{
            'users': (qb) => {
                qb.select(['users.username', 'users.email', 'users.id']);
            }
        }]
    })
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
    Project.query({select: ['id', 'name', 'github']}).fetchAll()
        .then(projects => {
            res.send({projects});
        })
        .catch(err =>
            res.status(500).json({error: err})
        );
});

function validateProject(data) {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }
    if (Validator.isEmpty(data.github)) {
        errors.github = 'This field is required';
    }

    return Project.query({
        where: {name: data.name},
    }).fetchAll().then(projects => {
        projects.map(project => {
            if (project) {
                if (project.get('name') === data.name) {
                    errors.name = 'Name already exists';
                }
            }
        });

        return {
            errors,
            isValid: isEmpty(errors)
        };
    })
}

router.post('/', authenticateAdmin, (req, res) => {
    validateProject(req.body).then(({errors, isValid}) => {
        if (isValid) {
            const {name, github} = req.body;

            Project.forge({name, github}).save()
                .then(project => res.status(201).json({id: project.id}))
                .catch(err => res.status(500).json({error: err}));
        } else {
            res.status(400).json(errors);
        }
    });
});

router.post('/:identifier/users', authenticateAdmin, (req, res) => {
    const {user_id} = req.body;
    ProjectUser.forge({user_id, project_id: req.params.identifier}).save()
        .then(user => res.status(201).json({success: true}))
        .catch(err => res.status(500).json({error: err}));
});

router.delete('/:identifier', (req, res) => {
    Project.forge({id: req.params.identifier}).destroy()
        .then(success => res.json({success: true}))
        .catch(err => res.status(500).json({error: err}));
});

router.delete('/:project/users/:user', (req, res) => {
    ProjectUser.query({
        where: {
            project_id: req.params.project
        },
        andWhere: {
            user_id: req.params.user
        }
    }).fetch().then(projectUser =>
        ProjectUser.forge({id: projectUser.id}).destroy()
            .then(success => res.json({success: true}))
            .catch(err => res.status(500).json({error: err}))
    )
    .catch(err => res.status(500).json({error: err}));
});

export default router;