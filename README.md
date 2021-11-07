# Myntra Clone with Shareable Wardrobe Links

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Checkout process
- Wardrobe Creation Features
- Shareable wardrobe link

### Installation and Env File

Create a .env file in then root consisting of,
```
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

Install the node modules with,
```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seed Database

To populate the products in the database,

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
