import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EVSE OCPP test tool',
  description: 'A simple OCPP 1.6-J test tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
