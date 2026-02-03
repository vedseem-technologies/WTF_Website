export const occasions = [
  { id: 1, name: "Birthday", slug: "birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop" },
  { id: 2, name: "Wedding", slug: "wedding", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop" },
  { id: 3, name: "Corporate", slug: "corporate", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop" },
  { id: 4, name: "Anniversary", slug: "anniversary", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" },
  { id: 6, name: "Festival", slug: "festival", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" },
  { id: 7, name: "Other", slug: "other", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop" },
];

export const services = [
  { id: 1, name: "Full Service", slug: "full-service", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop" },
  { id: 2, name: "Buffet", slug: "buffet", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop" },
  { id: 3, name: "Plated", slug: "plated", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop" },
  { id: 4, name: "Cocktail Menu", slug: "cocktail-menu", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop" },
  { id: 5, name: "BBQ", slug: "bbq", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop" },
  { id: 6, name: "Dessert", slug: "dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
  { id: 7, name: "Beverages", slug: "beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop" },
];

export const categories = [
  { id: 1, name: "Delivery Only", slug: "delivery-only", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop" },
  { id: 2, name: "Delivery + Services", slug: "delivery-services", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop" },
  { id: 3, name: "Live Service", slug: "live-service", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop" },
  { id: 4, name: "Snack Box", slug: "snack-box", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop" },
  { id: 5, name: "Meal Box", slug: "meal-box", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
];

export const packages = [
  { id: 1, name: "Multiplex", image: "/block-1.png", stat: "12+", label: "Years Of Excellence" },
  { id: 2, name: "Premium", image: "/block-2.png", stat: "100+", label: "Menu Options" },
  { id: 3, name: "Standard", image: "/block-3.png", stat: "200+", label: "Staff" },
  { id: 4, name: "Basic", image: "/block-4.png", stat: "10K+", label: "Happy Foodies" },
];

export const cateringMenuItems = [
  {
    id: 1,
    name: "Cocktail Menu",
    slug: "cocktail-menu",
    price: "₹759",
    image: "https://i.pinimg.com/736x/19/24/4b/19244bd34528e1b9ba3874248a7c3df0.jpg",
    type: "nonveg",
    servingSize: "8+",
    occasions: [1, 2, 3, 4, 5, 6, 7],
    categories: [1, 2, 3],
    services: [1, 2, 4],
    items: [
      { name: "Bhuttayan De Kebab", image: "/block-1.png", category: "Starters", price: 150 },
      { name: "Paneer Chilgoza", image: "/block-3.png", category: "Starters", price: 180 },
      { name: "Hara mutter ki tikki", image: "/block-1.png", category: "Starters", price: 120 },
      { name: "Lasooni Khumb Peshawari", image: "/block-3.png", category: "Starters", price: 160 },
      { name: "Tawa Veg Masala", image: "/block-1.png", category: "Mains", price: 220 },
      { name: "Dal Moradabadi", image: "/block-3.png", category: "Mains", price: 190 },
    ],
  },
  {
    id: 2,
    name: "Indian DeGustibus",
    slug: "indian-degustibus",
    price: "₹689",
    image: "https://i.pinimg.com/1200x/70/cd/b3/70cdb3687d057f8d45ba91edce1cfe99.jpg",
    type: "veg",
    servingSize: "8+",
    occasions: [1, 2, 4, 6],
    categories: [1, 2, 3],
    services: [1, 2, 3],
    items: [
      { name: "Bhuttayan De Kebab", image: "/block-1.png", category: "Starters", price: 150 },
      { name: "Paneer Chilgoza", image: "/block-3.png", category: "Starters", price: 180 },
      { name: "Hara mutter ki tikki", image: "/block-1.png", category: "Starters", price: 120 },
      { name: "Lasooni Khumb Peshawari", image: "/block-3.png", category: "Starters", price: 160 },
      { name: "Tawa Veg Masala", image: "/block-1.png", category: "Mains", price: 220 },
      { name: "Dal Moradabadi", image: "/block-3.png", category: "Mains", price: 190 },
    ],
  },
  {
    id: 3,
    name: "Wedding Feast",
    slug: "wedding-feast",
    price: "₹899",
    image: "https://i.pinimg.com/736x/eb/a7/6a/eba76a5f52850b3dc33206ac3bd88363.jpg",
    type: "nonveg",
    servingSize: "10+",
    occasions: [2],
    categories: [2, 3],
    services: [1, 2],
    items: [
      { name: "Chicken Tikka", image: "/block-1.png", category: "Starters", price: 250 },
      { name: "Fish Amritsari", image: "/block-3.png", category: "Starters", price: 280 },
      { name: "Mutton Seekh Kebab", image: "/block-1.png", category: "Starters", price: 300 },
      { name: "Butter Chicken", image: "/block-3.png", category: "Mains", price: 320 },
      { name: "Mutton Rogan Josh", image: "/block-1.png", category: "Mains", price: 350 },
      { name: "Biryani", image: "/block-3.png", category: "Mains", price: 280 },
    ],
  },
];
