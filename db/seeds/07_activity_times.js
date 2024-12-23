export async function seed(knex) {
    await knex("activity_times").del();
    await knex("activity_times").insert([
        { activity_id: 1, time_of_day_id: 1 },
        { activity_id: 1, time_of_day_id: 2 },
        { activity_id: 1, time_of_day_id: 3 },
        { activity_id: 2, time_of_day_id: 2 },
        { activity_id: 2, time_of_day_id: 3 },
        { activity_id: 2, time_of_day_id: 4 },
        { activity_id: 3, time_of_day_id: 2 },
        { activity_id: 4, time_of_day_id: 1 },
        { activity_id: 4, time_of_day_id: 2 },
        { activity_id: 4, time_of_day_id: 3 },
        { activity_id: 5, time_of_day_id: 3 },
        { activity_id: 5, time_of_day_id: 4 },
        { activity_id: 6, time_of_day_id: 3 },
        { activity_id: 7, time_of_day_id: 1 },
        { activity_id: 7, time_of_day_id: 2 },
        { activity_id: 7, time_of_day_id: 3 },
        { activity_id: 8, time_of_day_id: 1 },
        { activity_id: 8, time_of_day_id: 2 },
        { activity_id: 8, time_of_day_id: 3 },
        { activity_id: 9, time_of_day_id: 1 },
        { activity_id: 9, time_of_day_id: 2 },
        { activity_id: 9, time_of_day_id: 3 },
        { activity_id: 10, time_of_day_id: 3 },
        { activity_id: 10, time_of_day_id: 4 },
        { activity_id: 11, time_of_day_id: 3 },
        { activity_id: 11, time_of_day_id: 4 },
        { activity_id: 12, time_of_day_id: 1 },
        { activity_id: 12, time_of_day_id: 2 },
        { activity_id: 12, time_of_day_id: 3 },
    ]);
}
