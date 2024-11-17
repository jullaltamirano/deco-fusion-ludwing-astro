/**
 * Returns a boolean wich indicate if tu value passed has the correct number format with
 * an entire part and a decimal part
 */
export const validateNumberDecimal = ( value: string, limit = 12, decimal = 2 ) => {

   const regex = new RegExp(`^[0-9]{0,${limit}}(\\.[0-9]{0,${decimal}})?$`);
   return regex.test(value) || value === '';

};

/**
 * Returns a boolean wich indicate if tu value passed has the correct number format
 */
export const validateNumber = (value: string) => {

   return /^[0-9]{0,12}$/.test(value) || value == '';

};
