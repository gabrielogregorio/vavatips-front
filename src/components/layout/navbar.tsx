import Link from 'next/link';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import React from 'react';
import Button from '@/base/button';
import NavbarLink from '@/base/navbarLink';
import { useTheme } from '@/contexts/theme';
import { modelNavbarType } from '@/schemas/navbar';
import navbarEnum from '@/interfaces/navbar';

type NavbarPropsNavbarBasicType = {
  selected: navbarEnum;
  modelNavbar: modelNavbarType[];
};

export default function NavbarComponent({ selected, modelNavbar }: NavbarPropsNavbarBasicType) {
  const { theme, setTheme } = useTheme();

  const handleNavbar = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    }
  };

  function renderMenuItems() {
    return modelNavbar.map((model) => (
      <div key={model.text}>
        <NavbarLink
          href={model.url}
          selected={selected}
          whoIs={model.url}
          textContent={model.text}
        />
      </div>
    ));
  }

  return (
    <nav className="flex justify-between items-center w-full p-5 pl-10 pr-10 bg-skin-primary text-skin-textColorINVERSE">
      <Link href="/" passHref>
        <a href="#/" className="flex-1 text-left text-4xl border-none font-bold">
          VAVATIPS
        </a>
      </Link>

      {renderMenuItems()}

      <Button onClick={() => handleNavbar()} className="border-b-2 border-transparent ml-5 text-xl">
        {theme === 'dark' ? <MdOutlineLightMode /> : null}
        {theme === 'light' ? <MdOutlineNightlight /> : null}
      </Button>
    </nav>
  );
}
