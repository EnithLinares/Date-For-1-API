export async function seed(knex) {
    await knex("price_ranges").del();
    await knex("price_ranges").insert([
        { id: 1, range: "$ (Free to $20)" },
        { id: 2, range: "$$ ($21 to $59)" },
        { id: 3, range: "$$$ ($60 to $150)" },
        { id: 4, range: "$$$$ ($150+)" },
    ]);
}
