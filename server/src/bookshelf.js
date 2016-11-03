/**
 * Created by Alex on 03.11.2016.
 */

import knex from 'knex';
import bookshelf from 'bookshelf';

import knexConfig from './knexfile';

export default bookshelf(knex(knexConfig.development));