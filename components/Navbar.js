import Link from "next/link";
import { signOut, signIn } from '../hooks/firebase';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc"
import Image from "next/image";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';

import { AiFillBook } from 'react-icons/ai'
import { MdAnalytics } from 'react-icons/md'
import { IoIosExit } from 'react-icons/io'
import { toast } from "react-hot-toast";

export default function Navbar ({ logo, absolute }) {

  const { user } = useContext(UserContext);

    return(
        <nav className={`
          flex justify-between items-center w-full
          ${absolute && "absolute top-0 left-0"} p-5
          text-white
        `}>

          <Link href="/" className='font-secondary font-bold text-2xl'>
            <span className={logo === "blue" ? "text-sky-600" : "text-white"}>math/</span>
            <span className='text-black'>you</span>
          </Link>

          <div className=''>
            {!user 
              ? <div className='
                flex items-center gap-2
                bg-white px-4 py-3 rounded-lg
                text-black text-xs font-bold
                hover:bg-black hover:text-white
                duration-200 border border-black
              '
              onClick={signIn}
              >
                <FcGoogle className="text-sm"/>
                Continue with Google
              </div>
              :
              <div className="group flex relative">
                <div 
                  className="flex items-center gap-3 bg-white p-2 px-3 rounded-md shadow-lg"
                  data-tooltip-id="my-tooltip" 
                  data-tooltip-content="Account" 
                  data-tooltip-place="right"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image 
                      src={user?.photoURL}
                      alt={user?.displayName}
                      fill
                    />
                  </div>
                  <div className="font-bold leading-3">
                    <p className="text-xs text-black">{user?.displayName}</p>
                    <p className="text-[.625rem] text-neutral-400">{user?.email}</p>
                    <p className="text-[.5rem] text-neutral-400">Signed in as</p>
                  </div>
                </div>
                <Tooltip id="my-tooltip" style={{fontSize: "12px"}} />

                <div className="group-hover:opacity-100 opacity-0 duration-200 absolute top-full right-0 w-full z-10 pt-2">
                  <div className="bg-white shadow-2xl p-2 w-full rounded-md divide-y">
                    <Link className="flex items-center gap-2 text-neutral-600 hover:text-sky-600 text-xs p-2" href="/unfinished-topics">
                      <AiFillBook className="text-base" />
                      Unfinished Topics
                    </Link>
                    <Link className="flex items-center gap-2 text-neutral-600 hover:text-sky-600 text-xs p-2" href="/performance">
                      <MdAnalytics className="text-base" />
                      Performance
                    </Link>
                    <div className="flex items-center gap-2 text-neutral-600 hover:text-sky-600 text-xs p-2" 
                      onClick={signOut}
                    >
                      <IoIosExit className="text-base" />
                      Sign Out
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

        </nav>
    )

}