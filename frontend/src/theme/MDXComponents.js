import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Quiz from '@site/src/components/Quiz';
import RoleBasedContent from '@site/src/components/RoleBasedContent';
import LangContent from '@site/src/components/LangContent';

export default {
    ...MDXComponents,
    Quiz,
    RoleBasedContent,
    LangContent,
};
