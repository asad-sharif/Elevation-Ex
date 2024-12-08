import { createServer, Model } from 'miragejs';

createServer({
    models: {
        product: Model,
    },

    seeds(server) {
        server.create("product", {
            id: 1,
            name: "Motorbike Riding Gloves",
            headline: "Ultimate Comfort and Grip",
            description: `These gloves are crafted to offer the perfect blend of comfort and grip for bikers. 
            Built with premium materials, they ensure maximum durability and protection in harsh conditions.
            Featuring advanced shock absorption, they reduce strain on long rides, making them ideal for professionals and enthusiasts alike.`,
            image: "/images/motorbike-gloves.jpg",
            category: "Gloves",
            isPopular: true,
            rating: 4.8,
            price: 25.99,
            customerReview: "Excellent gloves, very comfortable and durable."
        });

        server.create("product", {
            id: 2,
            name: "Boxing Gloves Pro",
            headline: "Knockout Performance",
            description: `Our Boxing Gloves Pro are engineered for champions. The dense padding provides superior protection for your knuckles.
            Ergonomic design ensures a snug fit, while breathable fabric keeps your hands cool even in intense training sessions.
            Whether you're sparring or competing, these gloves deliver unmatched performance.`,
            image: "/images/boxing-gloves.jpg",
            category: "Gloves",
            isPopular: false,
            rating: 4.5,
            price: 35.49,
            customerReview: "Great gloves for training, very comfortable."
        });

        server.create("product", {
            id: 3,
            name: "Leather Riding Jacket",
            headline: "Ride with Style and Safety",
            description: `Our Leather Riding Jacket combines premium aesthetics with unmatched safety.
            Made with abrasion-resistant leather, it offers excellent protection during rides.
            The jacket features ventilation panels and a sleek design, making it perfect for long rides and casual wear.`,
            image: "/images/leather-jacket.jpg",
            category: "Jackets",
            isPopular: true,
            rating: 4.9,
            price: 149.99,
            customerReview: "Stylish and protective, perfect for long rides."
        });

        server.create("product", {
            id: 4,
            name: "Rainproof Adventure Jacket",
            headline: "Conquer Every Terrain",
            description: `Designed for adventurers, this jacket is completely rainproof and wind-resistant.
            Its multi-layered design keeps you warm and dry, even in the harshest climates.
            Multiple utility pockets make it convenient to carry all your essentials on the go.`,
            image: "/images/adventure-jacket.jpg",
            category: "Jackets",
            isPopular: false,
            rating: 4.7,
            price: 119.99,
            customerReview: "Great jacket for all weather conditions."
        });

        server.create("product", {
            id: 5,
            name: "Bavarian Dress Shoes",
            headline: "Classic Elegance, Modern Comfort",
            description: `Bavarian Dress Shoes are the epitome of timeless style. Handcrafted with premium leather, they exude elegance.
            A cushioned insole and slip-resistant sole make them as comfortable as they are stylish.
            Perfect for formal occasions or a professional look at the office.`,
            image: "/images/bavarian-shoes.jpg",
            category: "Shoes",
            isPopular: true,
            rating: 4.6,
            price: 89.99,
            customerReview: "Elegant and comfortable, perfect for formal events."
        });

        server.create("product", {
            id: 6,
            name: "Motorbike Racing Boots",
            headline: "High-Speed Protection",
            description: `Motorbike Racing Boots are crafted for high-speed enthusiasts. Reinforced armor ensures safety during races.
            The aerodynamic design enhances performance, while padded interiors provide comfort.
            Built to last, these boots are ideal for both professionals and casual riders.`,
            image: "/images/motorbike-boots.jpg",
            category: "Shoes",
            isPopular: false,
            rating: 4.5,
            price: 139.99,
            customerReview: "Durable and comfortable, great for racing."
        });

        server.create("product", {
            id: 7,
            name: "Horse Riding Gloves",
            headline: "Comfortable and Durable",
            description: `Horse Riding Gloves are designed for equestrians. Made from flexible and durable material, they ensure optimal grip on the reins.
            The breathable fabric keeps hands sweat-free, even during long rides.
            A perfect companion for both professional riders and hobbyists.`,
            image: "/images/horse-riding-gloves.jpg",
            category: "Gloves",
            isPopular: true,
            rating: 4.7,
            price: 29.99,
            customerReview: "Perfect gloves for horse riding, very comfortable."
        });

        server.create("product", {
            id: 8,
            name: "Leather Motorbike Suit",
            headline: "Full-Body Protection",
            description: `Our Leather Motorbike Suit is built to offer complete protection and unparalleled style.
            With impact-resistant padding and a snug fit, this suit ensures safety and comfort.
            It's designed for riders who demand the best in protection and performance.`,
            image: "/images/motorbike-suit.jpg",
            category: "Suits",
            isPopular: true,
            rating: 4.8,
            price: 349.99,
            customerReview: "Excellent suit, provides great protection."
        });

        server.create("product", {
            id: 9,
            name: "Trekking Backpack",
            headline: "Adventure Ready",
            description: `This Trekking Backpack is lightweight yet durable, with ample storage for all your essentials. 
            Featuring adjustable straps and a waterproof design, it's ideal for outdoor adventures.`,
            image: "/images/trekking-backpack.jpg",
            category: "Bags",
            isPopular: true,
            rating: 4.8,
            price: 59.99,
            customerReview: "Lightweight and spacious, perfect for trekking."
        });

        server.create("product", {
            id: 10,
            name: "Camping Tent",
            headline: "Shelter for Every Adventure",
            description: `A compact and easy-to-set-up tent designed for adventurers. 
            With waterproof fabric and sturdy poles, it keeps you protected against the elements.`,
            image: "/images/camping-tent.jpg",
            category: "Outdoor",
            isPopular: true,
            rating: 4.9,
            price: 129.99,
            customerReview: "Easy to set up and very durable."
        });

        server.create("product", {
            id: 11,
            name: "Hiking Shoes",
            headline: "Durable and Comfortable",
            description: `Built for rugged trails, these hiking shoes provide excellent grip and long-lasting comfort. 
            Waterproof and breathable, they're perfect for all terrains.`,
            image: "/images/hiking-shoes.jpg",
            category: "Shoes",
            isPopular: true,
            rating: 4.7,
            price: 99.99,
            customerReview: "Great shoes for hiking, very comfortable."
        });

        server.create("product", {
            id: 12,
            name: "Fitness Tracker Watch",
            headline: "Track Your Progress",
            description: `A sleek fitness tracker that monitors your steps, heart rate, and sleep patterns. 
            Stay motivated with its smart alerts and intuitive interface.`,
            image: "/images/fitness-tracker.jpg",
            category: "Electronics",
            isPopular: true,
            rating: 4.6,
            price: 79.99,
            customerReview: "Very useful for tracking fitness activities."
        });

        server.create("product", {
            id: 13,
            name: "Running Shoes",
            headline: "Run with Confidence",
            description: `Designed for performance and comfort, these running shoes feature advanced cushioning and lightweight materials. 
            Perfect for athletes and casual joggers alike.`,
            image: "/images/running-shoes.jpg",
            category: "Shoes",
            isPopular: true,
            rating: 4.8,
            price: 89.99,
            customerReview: "Comfortable and lightweight, great for running."
        });

        server.create("product", {
            id: 14,
            name: "Yoga Mat Pro",
            headline: "Ultimate Comfort and Grip",
            description: `A premium yoga mat with non-slip surface and optimal cushioning. 
            Perfect for yoga, Pilates, or any floor exercise.`,
            image: "/images/yoga-mat.jpg",
            category: "Fitness",
            isPopular: false,
            rating: 4.5,
            price: 29.99,
            customerReview: "Great mat for yoga, very comfortable."
        });

        server.create("product", {
            id: 15,
            name: "Smart Water Bottle",
            headline: "Stay Hydrated Smartly",
            description: `This smart water bottle tracks your daily hydration and reminds you to drink water. 
            Made from BPA-free materials, it’s both safe and practical.`,
            image: "/images/smart-water-bottle.jpg",
            category: "Accessories",
            isPopular: true,
            rating: 4.7,
            price: 49.99,
            customerReview: "Very useful for tracking water intake."
        });

        server.create("product", {
            id: 16,
            name: "Rock Climbing Harness",
            headline: "Safety First",
            description: `A durable and adjustable climbing harness designed for safety and comfort. 
            Ideal for both beginners and professionals.`,
            image: "/images/climbing-harness.jpg",
            category: "Climbing",
            isPopular: true,
            rating: 4.9,
            price: 89.99,
            customerReview: "Very safe and comfortable harness."
        });

        server.create("product", {
            id: 17,
            name: "Polarized Sunglasses",
            headline: "Protect Your Eyes",
            description: `Stylish and functional, these sunglasses reduce glare and offer UV protection. 
            Perfect for outdoor sports or casual wear.`,
            image: "/images/polarized-sunglasses.jpg",
            category: "Accessories",
            isPopular: true,
            rating: 4.6,
            price: 19.99,
            customerReview: "Stylish and effective at reducing glare."
        });

        server.create("product", {
            id: 18,
            name: "Cycling Helmet",
            headline: "Ride Safely",
            description: `A lightweight and aerodynamic helmet designed for maximum protection. 
            Ventilation ensures comfort even during long rides.`,
            image: "/images/cycling-helmet.jpg",
            category: "Helmets",
            isPopular: true,
            rating: 4.8,
            price: 49.99,
            customerReview: "Very comfortable and protective helmet."
        });

        server.create("product", {
            id: 19,
            name: "Outdoor Grill Set",
            headline: "Perfect BBQ Companion",
            description: `A portable and durable grill set for outdoor cooking. 
            Comes with all essential tools for a perfect barbecue experience.`,
            image: "/images/grill-set.jpg",
            category: "Outdoor",
            isPopular: true,
            rating: 4.7,
            price: 99.99,
            customerReview: "Great set for outdoor grilling."
        });

        server.create("product", {
            id: 20,
            name: "Travel Organizer Bag",
            headline: "Organize with Ease",
            description: `A compact and multi-compartment organizer for all your travel essentials. 
            Keeps everything tidy and within easy reach.`,
            image: "/images/travel-organizer.jpg",
            category: "Bags",
            isPopular: false,
            rating: 4.5,
            price: 24.99,
            customerReview: "Very useful for organizing travel items."
        });
    },

    routes() {
        this.namespace = "api";

        this.get("/products", (schema) => {
            return schema.products.all();
        });

        this.get("/products/:id", (schema, request) => {
            let id = request.params.id;
            return schema.products.find(id);
        });
    },
});