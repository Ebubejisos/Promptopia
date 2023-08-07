import { ReactNode } from 'react';
import '@styles/globals.css';
import Nav from '@components/Nav';

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
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
