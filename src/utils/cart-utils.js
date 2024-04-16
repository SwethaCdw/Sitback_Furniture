import { getItemFromLocalStorage, setItemInLocalStorage } from "./local-storage-utils";

export const calculateTotalCartPrice = () => {
    const existingCartItems = JSON.parse(getItemFromLocalStorage('cartItems')) || [];
    const updatedPrice = existingCartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0).toFixed(2);
    setItemInLocalStorage('totalCartPrice', updatedPrice);
    return updatedPrice;
}


export const addItemToCartOrWishlist = (productItem, destination) => {
  const existingItems = JSON.parse(getItemFromLocalStorage(destination)) || [];
      
  if (productItem) {
    // Check if the cart item already exists in the existing cart items
    const existingItemIndex = existingItems.findIndex((item) => item.name === productItem.name);
    
    if (existingItemIndex !== -1) {
      // If the cart item exists, update its quantity and total price
      existingItems[existingItemIndex].quantity += 1;
      existingItems[existingItemIndex].totalPrice = (existingItems[existingItemIndex].price * existingItems[existingItemIndex].quantity).toFixed(2);

    } else {
      // If the cart item doesn't exist, add it to the existing cart items
      productItem.quantity = 1;
      productItem.totalPrice = productItem.price;
      existingItems.push(productItem);
    }

    // Save the updated cart items back to local storage
    setItemInLocalStorage(destination, JSON.stringify(existingItems));
    return existingItems;
  }
}

export const removeItemFromWishlist = (productItem) => {
  const existingItems = JSON.parse(getItemFromLocalStorage('wishlist')) || [];
  const updatedWishlistItems = existingItems.filter(item => item.id !== productItem.id);
  setItemInLocalStorage('wishlist', JSON.stringify(updatedWishlistItems));
  return updatedWishlistItems;

}

export const removeItemFromCart = (itemId) => {
  const existingCartItems = JSON.parse(getItemFromLocalStorage('cartItems')) || [];
  const updatedCartItems = existingCartItems.filter(item => item.id !== itemId);
  setItemInLocalStorage('cartItems', JSON.stringify(updatedCartItems));
  return updatedCartItems;
}