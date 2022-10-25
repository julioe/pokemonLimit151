import { json } from "stream/consumers";
import { useState } from 'react';


const toggleFavorites = (id: number  ) => { 
 console.log('toggleFavorites LLamado');
 let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]'  )
 if ( favorites.includes(id) ){
    favorites = favorites.filter(pokeId => pokeId !== id );
 } else {
    favorites.push( id );
 }
 localStorage.setItem('favorites', JSON.stringify(favorites));
}

const existInFavorites = ( id: number ): boolean => { 

   if( typeof window === 'undefined' )return false; //Aqui sabemos si estamos en el servidor o del lado del usuario

   const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

   return favorites.includes( id );  // si incluye regresa true
}

const pokemons = (  ): number[] => {  //retorna un arreglo de numeros
      return  JSON.parse(localStorage.getItem('favorites') || '[]' )
}

export default {
    toggleFavorites,
    existInFavorites,
    pokemons
    } 