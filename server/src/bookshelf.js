/**
 * Created by Alex on 03.11.2016.
 */

import knex from 'knex';
import bookshelf from 'bookshelf';
import cascadeDelete from 'bookshelf-cascade-delete';

import knexConfig from './knexfile';

export default bookshelf(knex(knexConfig.development)).plugin(cascadeDelete);