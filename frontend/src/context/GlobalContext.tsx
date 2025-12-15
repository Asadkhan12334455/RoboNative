import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserBackground = 'general' | 'software' | 'hardware';

interface GlobalContextProps {
    language: 'en' | 'ur';
    setLanguage: (lang: 'en' | 'ur') => void;
    userBackground: UserBackground;
    setUserBackground: (bg: UserBackground) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'en' | 'ur'>('en');
    const [userBackground, setUserBackground] = useState<UserBackground>('general');

    return (
        <GlobalContext.Provider value={{ language, setLanguage, userBackground, setUserBackground }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
