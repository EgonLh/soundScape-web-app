import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Custom Page',
    description: 'This page uses a custom layout.',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}