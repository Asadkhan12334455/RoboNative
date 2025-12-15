import React, { ReactNode } from 'react';
import Chatbot from '@site/src/components/Chatbot/index';
import ScrollProgress from '@site/src/components/ScrollProgress/index';
import { GlobalProvider } from '@site/src/context/GlobalContext';

// Default implementation, that you can customize
export default function Root({ children }: { children: ReactNode }) {
    return (
        <GlobalProvider>
            <ScrollProgress />
            {children}
            <Chatbot />
        </GlobalProvider>
    );
}

