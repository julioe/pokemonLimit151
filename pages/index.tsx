// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps, NextPage } from 'next';
import {  Grid,  } from "@nextui-org/react";

import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';
import Image from 'next/image';

interface Props {
  pokemons: SmallPokemon[ ];
}

const HomePage: NextPage<Props> = ({ pokemons }  ) => {

  return (
    <Layout title= 'Listado de Pokemons'>
     
      <Grid.Container gap={ 2 } justify='flex-start' >
    
         {
           pokemons.map( ( pokemon ) => ( 
                <PokemonCard key={pokemon.id}  pokemon={pokemon} />

          //     <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={1} key={ id } >
          //       <Card isHoverable isPressable >
          //       <Card.Body css={{p: 1}}>
          //       </Card.Body>
          //       <Card.Image 
          //         src={img} 
          //         width='100%'
          //         height={ 140 }
          //         />
          //         <Card.Footer>
          //           <Row justify='space-between' >
          //             <Text transform='capitalize'>
          //             {name} 
          //             </Text>
          //             <Text>
          //             #{id} 
          //             </Text>

          //           </Row>
          //         </Card.Footer>
          //       </Card>
                  
          //  </Grid>
          ))
          }
      
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse> ('/pokemon?limit=151');

  const pokemons: SmallPokemon[ ] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  })    )
   
  
  
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg



  return {
    props: {
      pokemons
    }
  }
}
export default HomePage;
