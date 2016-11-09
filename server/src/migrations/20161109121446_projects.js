exports.up = function (knex) {
    return knex.schema.createTable('projects', table => {
        table.increments();
        table.string('name').notNullable().unique();
        table.string('github').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};