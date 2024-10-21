export async function seed(knex) {
    await knex("activity_price_ranges").del();
    await knex("activity_price_ranges").insert([
        { activity_id: 1, price_range_id: 1 },
        { activity_id: 2, price_range_id: 1 },
        { activity_id: 3, price_range_id: 1 },
        { activity_id: 4, price_range_id: 1 },
        { activity_id: 5, price_range_id: 1 },
        { activity_id: 6, price_range_id: 3 },
        { activity_id: 7, price_range_id: 1 },
        { activity_id: 8, price_range_id: 1 },
        { activity_id: 8, price_range_id: 2 },
        { activity_id: 8, price_range_id: 3 },
        { activity_id: 9, price_range_id: 2 },
        { activity_id: 10, price_range_id: 1 },
        { activity_id: 10, price_range_id: 2 },
        { activity_id: 10, price_range_id: 3 },
        { activity_id: 11, price_range_id: 2 },
        { activity_id: 11, price_range_id: 3 },
        { activity_id: 12, price_range_id: 1 },
        { activity_id: 12, price_range_id: 2 },
    ]);
}
