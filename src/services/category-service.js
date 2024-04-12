export const categoryData = await fetch('https://jsonmockserver.vercel.app/api/shopping/furniture/categories')
.then(response => response.json())
.then(data => {
    console.log(data);
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));


export const fetchProductsByCategory = async (category) => {
    const apiUrl = `https://jsonmockserver.vercel.app/api/shopping/furniture/products?category=${category}`;
    
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
