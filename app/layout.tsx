import { ReactNode } from 'react';
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@context/Provider';
import ToasterContext from '@context/ToasterContext';
interface metaData {
  title: string;
  description: string;
}

export const metadata: metaData = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en' className='h-full bg-white'>
      <body className='h-full'>
        <Provider>
          <ToasterContext />
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
