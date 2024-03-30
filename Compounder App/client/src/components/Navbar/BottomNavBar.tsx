"use client"
import Link from 'next/link'
import navigationLinks from '../../utils/navigationLinks'
import { icons } from '../icons'
import useActiveLink from '@/hook/useActiveLink';

const BottomNavBar = () => {
  const { activeLink, setActive } = useActiveLink('dashboard');

  return (
    <nav>
      <ul className="fixed bottom-0 left-0 w-full  py-4 flex items-center justify-between lg:hidden px-8">
        {navigationLinks.map((link) => (
          <Link href={link.url} key={link.label}>
            <li
              className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${activeLink === link.key ? 'text-gray-900' : 'text-gray-400'}`}
              onClick={() => setActive(link.key)}>
              <div>{icons[link.key]}</div>
              <div className="text-[12px]">{link.label}</div>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNavBar