import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './_providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Task management app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className='h-screen flex flex-col'>
            <Navbar />
            <div className='mt-[60px]'>{children}</div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
