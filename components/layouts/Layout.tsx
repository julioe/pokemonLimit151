import  { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';
import { Footer } from '../ui/Footer';

type Props = {
    children?: React.ReactNode;
    title?: string;
  };

  const origin = (typeof window === 'undefined') ? '' : window.location.origin 

export const Layout: FC<Props> = ({children, title} ) => {
            
  
  return (
    <>
        <Head >
            <title>{  title ||   'Pokemon App solution'}</title>
            <meta name='author' content='DonJulioDev' />
            <meta  name='description' content={  ` Informacion sobre el pokemon ${ title } `}/>
            <meta name='keywords' content={ ` ${ title }, pokemon, pokedex `  } />

            <meta property="og:title" content={`Información sobre ${ title }`} />
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${origin}/_next/image?url=%2Fimg%2Fbanner.png&w=640&q=75`}/>
        </Head>
        <Navbar />
        <main style={{
          padding: '0px 20px'
        }}   >
             { children }
        </main>
           <Footer />
    </>
  )
}
