export async function seed(knex) {
    await knex("venues").del();

    await knex("venues").insert([
        {
            id: 1,
            name: "Enjoy the scenery and take a long walk through Thames Valley Parkway",
            address: "123 Park Ave",
            website_url: "http://citypark.com",
        },
        {
            id: 2,
            name: "Local Museum",
            address: "456 Museum St",
            website_url: "http://localmuseum.com",
        },
    ]);
}
