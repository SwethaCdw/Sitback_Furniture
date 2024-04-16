import { CATEGORY_URL, PRODUCTS_URL } from "../constants/api-constants";

export const categoryData = await fetch(CATEGORY_URL)
.then(response => response.json())
.then(data => {
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));


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
