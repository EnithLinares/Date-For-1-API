export function up(knex) {
    return knex.schema.createTable("times_of_day", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("times_of_day");
}
