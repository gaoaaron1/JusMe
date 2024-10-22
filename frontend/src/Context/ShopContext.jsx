import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [products, setProducts] = useState(all_product); // State for dynamic products

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    // Change quantity of the amount of items
    const updateCartItemQuantity = (itemId, quantity) => {
        setCartItems((prev) => ({ ...prev, [itemId]: quantity }));
    };

    const addProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: products.length + 1 }; // Ensure each new product gets a unique ID
        setProducts((prev) => [...prev, productWithId]);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item)); // Use products state instead of all_product
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { 
        getTotalCartItems, 
        getTotalCartAmount, 
        all_product: products, // Use dynamic products
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateCartItemQuantity,
        addProduct // Add the addProduct function to context
    };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
