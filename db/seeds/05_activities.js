export async function seed(knex) {
    await knex("activities").del();
    await knex("activities").insert([
        {
            id: 1,
            name: "Enjoy The Scenery And Take A Long Walk In The Park",
            description:
                "Take yourself out and take the scenic path for a well-deserved walk at the Thames Valley Parkway - Springbang Branch. This branch of the  42km multi-use path is the perfect place to enjoy nature, and it makes for a cozy date when you grab your favourite hot drink and take in the sunlight filtering through the tree leaves. We recommend this date, especially in fall when the trees start changing for a breathtaking view.",
            image_url: "/images/Springbang_park.JPG",
            venue_id: 1,
        },
        {
            id: 2,
            name: "Watch A Movie At A Local Cinema",
            description:
                "Visit a historical arthouse cinema showcasing first-run indie and international films, as well as classic blockbusters on one screen. There's just something breathtaking about the iconic building from the 1930s, housing movie buffs and the community alike at a completely independent cinema.",
            image_url: "/images/hylandcinema.jpg",
            venue_id: 2,
        },
        {
            id: 3,
            name: "Take a Museum Tour",
            description:
                "Museums are the perfect place to admire the extent of human creativity. Entrance to the museum is by donation, and you can explore the exhibitions, or every Sunday at 2 pm, you can join the free tour. This date goes perfectly paired with a short walk through Ivey Park and a coffee at the nearest cafe.",
            image_url: "/images/museum_tour.jpeg",
            venue_id: 3,
        },
        {
            id: 4,
            name: "Hike Through A Conservation Area",
            description:
                "Explore the trails at any of the conservation areas in the city! I recommend Fanshawe because the trails are so well-kept, and the Lake trail is a day-long adventure with its 23km to walk or bike ",
            image_url: "/images/fanshawe_conservation.jpeg",
            venue_id: 4,
        },
        {
            id: 5,
            name: "Go To The Community Art Crawl.",
            description:
                "The first Friday of the month is reserved for Community Art Crawl. Explore the art, music, food and unique gifts by local creators and businesses. There are no fees or registration to reserve a spot to share your creativity with others! 5 pm to 9 pm.",
            image_url: "/images/community_crawl.jpg",
            venue_id: 5,
        },
        {
            id: 6,
            name: "Take a Cooking Class",
            description:
                "Learn to cook your next favourite meal. Experience a 3-hour, high energy and hands-on class led by an amazing Chef team, and enjoy a sit-down meal prepared entirely by you!",
            image_url: "/images/cooking.jpg",
            venue_id: 6,
        },
        {
            id: 7,
            name: "Go On A Coffee Date And People Watch",
            description:
                "Grab your caffeinated drink, bring a book, and treat yourself to a little snack. This cafe brings the vintage vibe to its prime location in historic Woodfield and lots of character. Soak in the coolness of one of the artistic hubs in the city. Make sure to check out their events for everything from live music to special pop-up vendors.",
            image_url: "/images/variety_cafe.jpg",
            venue_id: 7,
        },
        {
            id: 8,
            name: "Do The 'Crisp Days & Cozy Nights' Trail.",
            description:
                "Explore Downtown London's hidden gems - Charming cafes, vintage stores, scenic parks, and art studios bring vibrancy and character to the city's center, and you can make the trail a whole day experience or just visit some locations. The 'Crisp Days & Cozy Nights' trail has a digital passport where you can win points with every check-in and win Downtown London gift cards.",
            image_url: "/images/dt_trail.png",
            venue_id: 8,
        },
        {
            id: 9,
            name: "Visit A Flower Farm",
            description:
                "Get yourself a bouquet. Wortley Flower Farm is a working micro-farm in the backyard of Filthy Rebena Vintage, right in the heart of Wortley Village. Be part of regenerative farming, focusing on topsoil regeneration, increasing our backyard’s biodiversity and reducing carbon dioxide emissions with our chemical-free, holistic growing practices. The space is beautiful, and bonus points if you visit the vintage store, their curated products and excellent taste are outstanding. ",
            image_url: "/images/flower_farm.jpg",
            venue_id: 9,
        },
        {
            id: 10,
            name: "Get A Drink At An Iconic Bar",
            description:
                "Soak in the incredible decorations and enjoy a cold one. Joe Kool's is a London institution with incredible food and music. For over a third of a century, Joe Kool’s has hosted London’s longest continuous party. That’s the way it was when they opened in 1983, and that’s how it still is now. Let’s face it: the reason we all go out to a classic bar and grill is to have fun, and they have fun making that happen for you. Joe Kool’s is open 365 days a year, and their goal is to entertain you, whether you’re by yourself or with a group of 100 friends.  ",
            image_url: "/images/joe_kools.jpg",
            venue_id: 10,
        },
        {
            id: 11,
            name: "Treat Yourself To A Fancy Cocktail",
            description:
                "Step into a world of timeless elegance at The Mockingbird Cocktail Bar & Lounge. This 130-year-old gem in London's Old East Village offers a sophisticated escape with its classic ambiance and expertly crafted cocktails. Immerse yourself in the carefully preserved architecture and elegant decor as you sip on artfully prepared drinks. Whether you're in the mood for quiet contemplation or a lively atmosphere, The Mockingbird provides the perfect setting for a memorable solo evening out. Treat yourself to a taste of history and mixology mastery in this hidden treasure.",
            image_url: "/images/mocking_bird.jpg",
            venue_id: 11,
        },
        {
            id: 12,
            name: "Learn about active transportation and grab yourself a traditional Dutch pastry",
            description:
                "Explore top-quality bicycles and learn about modern mobility solutions while indulging in traditional Dutch pastries. The London Bicycle Cafe combines a passion for cycling with locally sourced cuisine, offering a welcoming atmosphere for both cycling enthusiasts and curious visitors. Immerse yourself in the world of active transportation and satisfy your taste buds with authentic Dutch flavours, all under one roof. Grab yourself a butter cake and thank me later",
            image_url: "/images/lbc.png",
            venue_id: 12,
        },
    ]);
}
