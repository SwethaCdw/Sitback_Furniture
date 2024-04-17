import { FALLBACK_IMAGE } from "../constants/constants";

  
/**
 * Add a fallback picture if picture is not available
 * @param {*} event 
 */
export const handleImageError = (event) => {
    event.target.src = FALLBACK_IMAGE;
};


export const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };