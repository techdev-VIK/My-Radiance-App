# Radiance

Radiance is an e-commerce application that has product listings for various beauty products like Skin Care, Hair Care, Perfumes.

## Technology Stack

* React with Redux Toolkit
* Styling using Bootstrap
* React Router for routes
* Redux Persist: To persist state across browser sessions
* Axios: For making API requests
* Express & Node for API Repo Link
* MongoDB using mongoose for data storage
* React-Toastify to add notifications to app
* Cloudinary: For image management and optimization.


## Functionalities

### 1. Products listing and detail
* List of products - fetched via ExpressAPI
* Product detail page
* Search for products
* Wishlist buttons - Functional across the app pages
* Add to cart buttons - Functional across the app pages
* Increment/decrement quantity for products added to cart. (Go to cart)
* Marks as Favorite for products added.


#### Filters as follows:
- _Price range of products_
- _Category_
- _Rating_
- _Sort by Price_
- _Search Option across all pages_


### 2. Cart
* Cart item list
* Remove item from cart
* Increment/decrement item quantity on cart across the app pages via reducers
* Total items present in the cart with the overall cost
* Checkout to address data management


### 3. Wishlist / Saved for later
* Wishlist item list (via reducers)
* Remove from wishlist
* Move from wishlist to cart


### 4. Authentication using JWT

* Login form - existing users
* Private routes - login, wishlist and checkout
* Create New Account - New Users
* Data stored on MongoDB


### Test User Credentials

- Username: jane.smith
- Password: Jane@67890*



## Deployed Link

https://my-radiance-app.vercel.app/


## Radiance - App Walkthrough - Watch Video

https://www.loom.com/share/b5e151e214624260a114fff93bbf90ba?sid=d8a0a24f-6b3b-4248-97ac-d26f51584492



## Radiance - Beauty Products E-Commerce Website

This project was bootstrapped with Vite.


### Installation Options

You can set up and run this project as below:

#### Clone the Repository

1) Clone this repository to your local machine:

- git clone https://github.com/your-username/radiance.git


2) Navigate into the project directory:

- cd radiance


3) Install dependencies:

- npm install


### Available Scripts

#### npm run dev

- Starts the development server.
- Open http://localhost:5173 to view the app in your browser.
- The page will reload automatically whenever you make edits.

#### npm run build
- Builds the app for production.
- Bundles and optimizes your React app for the best performance.
- Output is placed in the dist folder, ready for deployment.

#### npm run preview
- Serves the production build locally for testing.
- Useful for ensuring the build works as expected.

#### npm run lint
- Runs ESLint to check for code quality and fixable issues.
- Helps maintain clean and consistent code.



##### This README provides clear instructions for users on how to install, run, and understand the project. Let me know if you’d like further customization or additional details!