import { ReactNode } from 'react';
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { getServerSession } from 'next-auth';
import { GET } from './api/auth/[...nextauth]/route';

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
    <html lang='en'>
      <body>
        <Provider>
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
