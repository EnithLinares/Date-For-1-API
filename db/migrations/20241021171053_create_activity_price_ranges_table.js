export function up(knex) {
    return knex.schema.createTable("activity_price_ranges", (table) => {
        table.increments("id").primary();
        table
            .integer("activity_id")
            .unsigned()
            .references("id")
            .inTable("activities")
            .onDelete("CASCADE");
        table
            .integer("price_range_id")
            .unsigned()
            .references("id")
            .inTable("price_ranges")
            .onDelete("CASCADE");
        table.unique(["activity_id", "price_range_id"]);
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("activity_price_ranges");
}
