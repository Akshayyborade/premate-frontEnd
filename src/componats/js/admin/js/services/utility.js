 export const capitalizeFirstLetter = (string) => {
    // Check if the string is not empty
    if (string.length > 0) {
        // Capitalize the first letter and concatenate it with the rest of the string
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        // If the string is empty, return an empty string
        return '';
    }
};