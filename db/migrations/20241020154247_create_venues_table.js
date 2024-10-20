export function up(knex) {
    return knex.schema.createTable("venues", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("address").notNullable();
        table.string("website_url");
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("venues");
}
