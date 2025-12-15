import React, { ReactNode } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

interface Props {
    lang: 'en' | 'ur';
    children: ReactNode;
}

const LangContent: React.FC<Props> = ({ lang, children }) => {
    const { language } = useGlobalContext();

    if (language === lang) {
        return <>{children}</>;
    }
    return null;
};

export default LangContent;
