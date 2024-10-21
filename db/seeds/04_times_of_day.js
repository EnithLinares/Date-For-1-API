export async function seed(knex) {
    await knex("times_of_day").del();
    await knex("times_of_day").insert([
        { id: 1, name: "Early Bird (7 am to 9 am)" },
        { id: 2, name: "Anytime after 10 am" },
        { id: 3, name: "After work outing (5 pm+)" },
        { id: 4, name: "Night owl (9 pm to 2 am)" },
    ]);
}
