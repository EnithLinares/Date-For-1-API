export async function seed(knex) {
    await knex("moods").del();
    await knex("moods").insert([
        { id: 1, name: "Creative" },
        { id: 2, name: "Adventurous" },
        { id: 3, name: "Cozy" },
        { id: 4, name: "Chill" },
        { id: 5, name: "Artsy" },
        { id: 6, name: "Hungry" },
        { id: 7, name: "Nature-loving" },
        { id: 8, name: "$19+" },
        { id: 9, name: "Drinking" },
        { id: 10, name: "Dancing" },
    ]);
}
