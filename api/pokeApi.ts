import axios from "axios";


const pokeApi = axios.create({                      // instancia
    baseURL: 'https://pokeapi.co/api/v2'
});


export default pokeApi;