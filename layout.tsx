import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <body>
        <nav>My navbar</nav>
        {children}
    </body>
  );
}