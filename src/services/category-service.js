import { CATEGORY_URL, PRODUCTS_URL } from "../constants/api-constants";

/**
 * Function to fetch category data
 */
export const categoryData = await fetch(CATEGORY_URL)
.then(response => response.json())
.then(data => {
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));

/**
 * Function to fetch products by category
 * @param {*} category 
 * @returns 
 */
export const fetchProductsByCategory = async (category) => {
    const apiUrl = `${PRODUCTS_URL}${category}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}
