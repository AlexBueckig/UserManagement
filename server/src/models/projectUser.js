/**
 * Created by Alex on 09.11.2016.
 */
import bookshelf from '../bookshelf';
import User from '../models/user';

export default bookshelf.Model.extend({
    tableName: 'projects_users'
});