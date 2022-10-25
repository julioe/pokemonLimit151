import  { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

type Props = {
    children?: React.ReactNode;
    title?: string;
  };


export const Layout: FC<Props> = ({children, title} ) => {
  return (
    <>
        <Head >
            <title>{  title ||   'Pokemon App solution'}</title>
            <meta name='author' content='DonJulioDev' />
            <meta  name='description' content={  ` Informacion sobre el pokemon ${ title } `}/>
            <meta name='keywords' content={ ` ${ title }, pokemon, pokedex `  } />
        </Head>
        <Navbar />
        <main style={{
          padding: '0px 20px'
        }}   >
             { children }
        </main>
    </>
  )
}
