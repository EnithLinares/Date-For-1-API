export function up(knex) {
    return knex.schema.createTable("activities", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.text("description").notNullable();
        table.string("image_url");
        table.integer("venue_id").unsigned().references("id").inTable("venues");
        table
            .integer("price_range_id")
            .unsigned()
            .references("id")
            .inTable("price_ranges");
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("activities");
}
