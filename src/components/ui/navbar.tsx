import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown, faCircleArrowUp, faMessage, faBell, faPlus, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link';
import SelectSubreddit from '../SelectSubreddit';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [subreddit, setSubreddit] = useState('');

  const commonOptions = [faCircleArrowUp, faReddit];

  const actions = [faMessage, faBell, faPlus];

  return (
    <div className="bg-white w-full py-2 px-2 flex items-center justify-evenly shadow z-10">
      <Link href={'/'}>
        <div className="flex text-3xl space-x-2 items-center">
          <FontAwesomeIcon
            icon={faReddit}
            style={{ color: '#FF5700' }}
            className="bg-white text-4xl"
          />
          <div className="font-medium hidden lg:block">reddit</div>
        </div>
      </Link>
      <div className="w-1/6 pt-1">
        <SelectSubreddit setSubreddit={setSubreddit} optionValue='title'/>
      </div>

      <div className="flex items-center bg-gray-100 rounded w-60 lg:w-80">
        <div className="pl-4 pr-2">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-100 py-2 rounded outline-none"
        />
      </div>

      <div className="flex divide-x divide-gray-200 xl:divide-x xl:divide-gray-200">
        <div className="hidden xl:block pr-2">
          <div className="flex space-x-2">
            {commonOptions.map((option) => (
              <div
                key={option.iconName}
                className="p-2 rounded hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={option} className="text-2xl" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 pl-2">
          {actions.map((action) => (
            <div
              key={action.iconName}
              className="p-2 rounded hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={action} className="text-2xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-1">
        <div className="flex items-center rounded-full border border-solid px-4 py-2 space-x-2">
          <div className="rounded-full px-2 border-2 border-solid border-white font-black">
            <FontAwesomeIcon
              icon={faBullhorn}
              className="bg-white text-2xl"
            />
          </div>
          <div>Advertise</div>
        </div>

        <div className="flex space-x-2 items-center rounded px-2 hover:bg-gray-200">
          <div className="text-xs">
          {session ? (
            <div className='flex space-x-1'>
              <Avatar style={{width: 20, height: 20}}>
                  <AvatarImage src={session.user.image ?? '/images/placeholder-avatar.png'}/>
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>@{session.user?.name}</div>
              {/* <div className="flex items-center space-x-1">
                <div>
                  <FontAwesomeIcon icon={faReddit} className="text-red-600" />
                </div>
                <div>1.8k karma</div>
              </div> */}
            </div>
            ) : (
              
              <button
                type="button"
                className="mx-auto"
                onClick={() => {
                  signIn("discord").catch(console.log);
                }}
              >
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </button>
          )}
          </div>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
    </div>
    
  );
};

export default Navbar;
