export function up(knex) {
    return knex.schema.createTable("activity_times", (table) => {
        table.increments("id").primary();
        table
            .integer("activity_id")
            .unsigned()
            .references("id")
            .inTable("activities")
            .onDelete("CASCADE");
        table
            .integer("time_of_day_id")
            .unsigned()
            .references("id")
            .inTable("times_of_day")
            .onDelete("CASCADE");
        table.unique(["activity_id", "time_of_day_id"]);
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("activity_times");
}
