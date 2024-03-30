import { useState } from 'react';

const useActiveLink = (initialKey = 'dashboard') => {
  const [activeLink, setActiveLink] = useState<string>(initialKey);

  const setActive = (key: string) => {
    setActiveLink(key);
  };

  return { activeLink, setActive };
};

export default useActiveLink;
