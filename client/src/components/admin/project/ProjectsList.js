/**
 * Created by Alex on 12.11.2016.
 */
import React, {
    Component,
    PropTypes
} from 'react';
import _ from 'lodash';

class ProjectsList extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.props.deleteProject(e.target.dataset.id);
    }

    render() {
        const {projects} = this.props;
        return (
            <div className="container-fluid">
                <h2>Projects</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>GitHub</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        _.map(projects, project => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.github}</td>
                                <td className="list-button"><div className="glyphicon glyphicon-pencil" data-id={project.id}> </div></td>
                                <td className="list-button"><div className="glyphicon glyphicon-remove glyphicon-color-red" data-id={project.id} onClick={this.onClick}> </div></td>
                            </tr>))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.object.isRequired,
    deleteProject: PropTypes.func.isRequired
};
ProjectsList.defaultProps = {};

export default ProjectsList;