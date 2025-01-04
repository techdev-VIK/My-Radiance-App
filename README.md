# Radiance

Radiance is an e-commerce application that has product listings for various beauty products like Skin Care, Hair Care, Perfumes.

## Technology Stack

* React - Reducer + Context
* Styling using Bootstrap
* React Router v6 (beta) for routes
* Express & Node for API Repo Link
* MongoDB using mongoose for data storage
* Jest test cases for reducer 


## Functionalities

### 1. Products listing and detail
* List of products - fetched via ExpressAPI
* Product detail page
* Search for products
* Wishlist buttons from across the app pages
* Add to cart button from across the app pages
* Increment/decrement quantity for products added to cart. (Go to cart)


#### Filters as follows:
- _Price range of products_
- _Category_
- _Rating_
- _Sort by Price_


### 2. Cart
* Cart item list
* Remove item from cart
* Increment/decrement item quantity on cart from across the app pages
* Move from cart to wishlist
* Total items present in the cart with the overall cost
* Checkout to address data management


### 3. Wishlist
* Wishlist item list
* Remove from wishlist
* Move from wishlist to cart


### 4. Authentication using JWT

* Login form - existing users
* Private route - login, wishlist and checkout
* Create New Account - New Users
* Data stored on MongoDB


### Test User Credentials

- Username: jane.smith
- Password: Jane@67890*



## Deployed Link

https://my-radiance-app.vercel.app/


