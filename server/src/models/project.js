/**
 * Created by Alex on 07.11.2016.
 */
import bookshelf from '../bookshelf';
import User from './user';

export default bookshelf.Model.extend({
        tableName: 'projects',
        hasTimestamps: true,
        users: function () {
            return this.belongsToMany(User);
        }
    },
    {
        dependents: ['users']
    }
);