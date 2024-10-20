export function up(knex) {
    return knex.schema.createTable("price_ranges", (table) => {
        table.increments("id").primary();
        table.string("range").notNullable();
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("price_ranges");
}
