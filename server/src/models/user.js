/**
 * Created by Alex on 03.11.2016.
 */

import bookshelf from '../bookshelf';

import Project from './project';

export default bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    projects: function () {
        return this.belongsToMany(Project);
    }
});