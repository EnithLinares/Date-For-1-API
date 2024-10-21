export async function seed(knex) {
    await knex("venues").del();

    await knex("venues").insert([
        {
            id: 1,
            name: "Thames Valley Parkway, Springbank Branch",
            address: "1085 Commissioners Rd W, London, ON N6K 4Y6",
            website_url:
                "https://london.ca/living-london/parks-facilities/parks/thames-valley-parkway-tvp",
        },
        {
            id: 2,
            name: "Hyland Cinema",
            address: "421 Ridout Street North,London, ON N6A 5H4",
            website_url: "https://www.hylandcinema.com/",
        },
        {
            id: 3,
            name: "Museum London",
            address: "421 Ridout Street North London, ON Canada N6A 5H4",
            website_url: "https://museumlondon.ca/",
        },
        {
            id: 4,
            name: "Fanshawe Conservation Area",
            address: "1424 Clarke Road,London, ON N5V 5B9",
            website_url: "https://www.fanshaweconservationarea.ca/",
        },
        {
            id: 5,
            name: "TAP Centre For Creativity",
            address: "203 Dundas Street, London ON N6A 1G4",
            website_url: "https://www.tapcreativity.org/",
        },
        {
            id: 6,
            name: "Growing Chefs",
            address: "460 King St.London, ON N6B 1S9 ",
            website_url: "https://growingchefsontario.ca/",
        },
        {
            id: 7,
            name: "Variety Cafe",
            address: "466 Dufferin Ave, London, ON N6B 1Z7",
            website_url:
                "https://www.instagram.com/variety.cafe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        },
        {
            id: 8,
            name: "Downtown London",
            address: "114 Dundas Street, Suite #400, London, ON N6A 1G1",
            website_url: "https://www.downtownlondon.ca/",
        },
        {
            id: 9,
            name: "Wortley Flower Farm",
            address: "144 Wortley Road, London, ON N6C 3P5",
            website_url: "https://wortleyflowerfarm.com/",
        },
        {
            id: 10,
            name: "Joe Kool's",
            address: "595 Richmond Street, London, ON, N6A 3G2",
            website_url: "https://joekools.ca/",
        },
        {
            id: 11,
            name: "The Mocking Bird Cocktail Bar",
            address: "760 Dundas Street East, London, ON, N5W 2Z7",
            website_url: "https://www.themockingbird.ca/",
        },
        {
            id: 12,
            name: "London Bicycle Cafe",
            address: "320 Thames St, London, ON N6A 0E1",
            website_url: "https://www.londonbicyclecafe.com/",
        },
    ]);
}
