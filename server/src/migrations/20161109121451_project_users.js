exports.up = function (knex) {
    return knex.schema.createTable('project_users', table => {
        table.increments().primary();
        table.integer('project_id').notNullable().references('id').inTable('projects');
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('project_users');
};