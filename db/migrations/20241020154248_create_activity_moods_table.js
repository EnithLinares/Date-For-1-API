export function up(knex) {
    return knex.schema.createTable("activity_moods", (table) => {
        table.increments("id").primary();
        table
            .integer("activity_id")
            .unsigned()
            .references("id")
            .inTable("activities")
            .onDelete("CASCADE");
        table
            .integer("mood_id")
            .unsigned()
            .references("id")
            .inTable("moods")
            .onDelete("CASCADE");
        table.unique(["activity_id", "mood_id"]);
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("activity_moods");
}
