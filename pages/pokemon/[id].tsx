import {  useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti'

import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { localFavorites } from '../../utils';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon
 
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {

  // if (typeof window !== 'undefined') {
  //   console.log('You are on the browser')
  //   // 👉️ can use localStorage here
  // } else {
  //   console.log('You are on the server')
  //   // 👉️ can't use localStorage
  // }


  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));
  //const router = useRouter();
  //console.log(router.query);
  //console.log(pokemon);
  const onToggleFavorite  = () => {
          localFavorites.toggleFavorites( pokemon.id );
          setIsInFavorites(!isInFavorites);
         
          if(isInFavorites)return

          confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
              x: 1,
              y: 0,
            }
          })
      }
    
  return (
 <Layout title={ pokemon.name}>
  <Grid.Container  css={{marginTop: '5px'}} gap={0}   >
   <Grid xs={12} sm={4}>
<Card  isHoverable css={{padding: '30px'}} >
  <Card.Body>
   <Card.Image
     src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
     alt={ pokemon.name }
     width="100%"
     height={ 200 }
               />
   </Card.Body>

</Card>
  </Grid>
  <Grid xs={ 12 } sm={ 8 }>
  <Card>
    <Card.Header css={{diplay: 'flex', justifyContent: 'space-between'}} >
      <Text h1 transform='capitalize'>No. {pokemon.id} - {pokemon.name} </Text>
      <Button 
      color="gradient" 
      ghost={ !isInFavorites }
      onPress={onToggleFavorite}
      >
       { isInFavorites? 'En favoritos' :  'Guardar en favoritos'}
      </Button>
    </Card.Header>
      <Card.Body>
        <Text size={30}>Sprites:</Text>
        <Container direction='row' display='flex' gap={0}>
          <Image 
          src={  pokemon.sprites.front_default } 
          alt={ pokemon.name }
          width={ 100 }
          height={ 100 } 
          />
          
          <Image 
          src={  pokemon.sprites.back_default } 
          alt={ pokemon.name }
          width={ 100 }
          height={ 100 } 
          />
          
          <Image 
          src={  pokemon.sprites.front_shiny } 
          alt={ pokemon.name }
          width={ 100 }
          height={ 100 } 
          />
          
          <Image 
          src={  pokemon.sprites.back_shiny } 
          alt={ pokemon.name }
          width={ 100 }
          height={ 100 } 
          />
          
        </Container>
      </Card.Body>
</Card>
 </Grid>
  </Grid.Container>    
 </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemons151 = [...Array(151)].map( (value, index) => `${index + 1 }`);
       //      console.log({pokemons151});
      
      const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?/limit=151')
       //'https://pokeapi.co/api/v2/pokemon?limit=151'
       //'https://pokeapi.co/api/v2'
       const {results} = data;
       console.log({results});
       
  //todo const { data } = await  // your fetch function here 

  return {
    paths: pokemons151.map( id => ({
      params: {id}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
//   console.log(ctx.params)
  const { id } = params as {id: string};
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ id }`);

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg
  return {
    props: {
      pokemon: data
     //pokemon: await getPokemonInfo( id )
    }
  }
}

export default PokemonPage;
