import axios from "axios";

/**
 * Translates English text to the target language using LibreTranslate API.
 * @param {string} text - The English text to translate.
 * @param {string} targetLanguage - The target language code (e.g., "es" for Spanish).
 * @returns {Promise<string>} - Returns the translated text.
 */
const Translator = async(text, targetLanguage) => {
    const translate = require('google-translate-api-x');

        translate(text, { to: targetLanguage })
        .then(res => {
          console.log(res.text); 
          return res;// Outputs: "¡Hola, mundo!"
        })
        .catch(err => {
          console.error(err);
        });
      
   
}
export default Translator;