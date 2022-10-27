import {Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
//import Link from 'next/link'
import NextLink from 'next/link'

export const Footer = () => {

        const { theme } = useTheme()

        //console.log(theme);
        

  return (
    
    
    
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0x 20px',
      backgroundColor: theme?.colors.gray100.value
    }} >
        <Image 
                        src=  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                        alt="icono de la app"
                        width={70}
                        height={70}
                        />
      <NextLink href="/" passHref>
        <Link>
       <Text color='white' h2>P</Text> <Text color='white'  h3>okémon</Text>
        </Link>
      </NextLink>
       <Spacer css={{ flex: 1}} />
       <NextLink href='https://donjulio.dev/' passHref>
        <Link css={{marginRight:'20px'}}>
          <Text  color='white' >by DonJulio.dev </Text>
        </Link>
       </NextLink>
        </div>
  )
}
