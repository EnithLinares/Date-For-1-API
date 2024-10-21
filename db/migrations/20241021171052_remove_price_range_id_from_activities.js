export function up(knex) {
    return knex.schema.table("activities", (table) => {
        table.dropForeign("price_range_id");
        table.dropColumn("price_range_id");
    });
}

export function down(knex) {
    return knex.schema.table("activities", (table) => {
        table.integer("price_range_id").unsigned();
        table
            .foreign("price_range_id")
            .references("id")
            .inTable("price_ranges");
    });
}
