import React, { ReactNode } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

interface Props {
    role: 'software' | 'hardware' | 'general';
    children: ReactNode;
}

/**
 * Renders content only if the user matches the role.
 */
const RoleBasedContent: React.FC<Props> = ({ role, children }) => {
    const { userBackground } = useGlobalContext();

    if (userBackground === role || role === 'general') {
        return <>{children}</>;
    }

    // Optional: You could render a "Hidden content" placeholder
    return null;
};

export default RoleBasedContent;
