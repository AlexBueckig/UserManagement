exports.up = function (knex) {
    return knex.schema.createTable('projects_users', table => {
        table.increments().primary();
        table.integer('project_id').notNullable().references('id').inTable('projects');
        table.integer('user_id').notNullable().references('id').inTable('users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects_users');
};