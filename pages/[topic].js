import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FaCheckDouble } from 'react-icons/fa';
import { get_single_doc, signIn, signOut } from '../hooks/firebase';
import { FcGoogle } from 'react-icons/fc';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { BigPlayButton, Player } from 'video-react';
import "node_modules/video-react/dist/video-react.css";




export default function Class({ topic }) {

  function* range(start, end){
    for(let i = start; i <= end; i++) yield i;
  }

  const [progress, setProgress] = useState(25);
  const [currentChapter, setCurrentChapter] = useState("Main Topic");
  const [finishedChapter, setFinishedChapter] = useState([]);
  const playerRef = useRef(null);
  const videoModalRef = useRef(null);

  const { user } = useContext(UserContext);

  const handleChapterChange = (num) => {
    setCurrentChapter(num);
  }

  const handlePlay = () => {
    videoModalRef.current.classList.add("!hidden");
    playerRef.current.play()
  }

  useEffect(() => {
    window.onscroll = e => {
        let progress = (document.documentElement.scrollTop / ( document.body.scrollHeight - window.innerHeight ) ) * 100;
        setProgress(Math.ceil(progress));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{topic.heading}</title>
      </Head>

      <main className='max-w-7xl mx-auto divide-y'>

        <Navbar logo="blue" />

        <div className='w-full h-full flex lg:flex-row flex-col relative divide-x divide-y divide-neutral-200'>

          <div className='p-5 space-y-5 overflow-auto lg:w-1/5 h-full sticky top-0 z-[9] bg-white'>

            <div className='lg:block flex space-y-1'>
              {["Main Topic","Practise"].map(num => (
                <Link 
                  href="#"
                  key={num}
                  onClick={() => handleChapterChange(num)}
                  className={`
                    flex items-center gap-3 px-3 py-4 
                    text-xs font-bold rounded-md
                    ${num === currentChapter ? "text-white" : "text-black"}
                    ${num === currentChapter ? "bg-sky-600" : "bg-transparent"}
                `}>
                <div className={`
                  shrink-0 w-2 h-2 rounded-full
                  ring-2 ring-offset-2
                  ${finishedChapter.includes(num) ? num === currentChapter ? "bg-white" : "bg-neutral-200" : "bg-transparent"}
                  ${finishedChapter.includes(num) && (num === currentChapter) && "ring-white ring-offset-sky-600"}
                  ${finishedChapter.includes(num) && (num !== currentChapter) && "ring-neutral-200 ring-offset-white"}
                  ${!finishedChapter.includes(num) && (num === currentChapter) && "ring-white ring-offset-sky-600"}
                  ${!finishedChapter.includes(num) && (num !== currentChapter) && "ring-neutral-200 ring-offset-white"}
                `}></div>

                <span className='truncate'>{num}</span>
              </Link>
              ))}
            </div>
          </div>

          <div className='lg:w-3/5 p-5 lg:px-12 space-y-5'>

            {currentChapter === "Main Topic" && 

            <>
              <p className='text-2xl font-bold'>{topic.heading}</p>

              <div className="group relative w-full h-96 inset-0 overflow-hidden rounded-md">
                  <Image 
                      className="object-cover"
                      src={topic.image}
                      alt=""
                      fill
                  />

                  <Player
                    ref={(player) => { playerRef.current = player }}
                    playsInline
                    poster={topic.image}
                    src={topic.video}
                  >
                    <BigPlayButton className='!hidden' position="center" />
                  </Player>

                  <div ref={videoModalRef} className="absolute top-0 left-0 h-full w-full">
                    <div className="
                        absolute top-0 left-0 h-full w-full bg-black opacity-0
                        group-hover:opacity-50 duration-200"
                    ></div>

                    <BsFillPlayFill className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        text-white text-7xl opacity-0
                        group-hover:opacity-100 duration-200"
                        onClick={handlePlay}
                    />
                  </div>
              </div>

              <div className='text-sm py-5'
                dangerouslySetInnerHTML={{
                  __html: topic.details
                }}
              > 
              </div>
            </>
            
            }

            {currentChapter === "Practise" && 
              <>
                <p className='text-2xl font-bold'>Practise</p>
              
                <div className='text-sm py-5'
                  dangerouslySetInnerHTML={{
                    __html: topic.practice
                  }}
                > 
                </div>
              </>
            }

            <div className='flex justify-center'>
              <div className={`
                        inline-flex items-center gap-2 px-6 py-2 
                        text-white font-bold ${finishedChapter.includes(currentChapter)? "bg-black" : "bg-sky-600"} 
                        rounded-md shadow-2xl text-sm
                        active:ring-4 ring-sky-300        
                  `}
                  onClick={() => !finishedChapter.includes(currentChapter) && setFinishedChapter([...finishedChapter, currentChapter])}
              >
                <FaCheckDouble className="text-white" />
                {finishedChapter.includes(currentChapter)? "Already Done" : "I am done"} 
              </div>
            </div>

          </div>

          <div className='lg:w-1/5 h-full p-5 space-y-5 sticky top-0'>

            <div className='rounded-md bg-sky-600 p-4 text-white'>
              <p className='text-3xl text-center font-bold'>
                {progress}%
              </p>
              <p className='text-center text-xs'>Reading Progress..</p>

              <div className='mt-5 relative h-2 bg-sky-400 rounded-full overflow-hidden'>
                <div 
                  style={{width: progress+'%'}} 
                  className='absolute top-0 left-0 h-full bg-white rounded-full'
                ></div>
              </div>
            </div>

            <div className='rounded-md bg-neutral-100 p-4'>
              <p className='text-3xl text-center font-bold'>
                {finishedChapter.length}/2
              </p>
              <p className='text-center text-xs'>Topics Covered</p>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}



export async function getServerSideProps(context){
  return {
    props: {
      topic: await get_single_doc("topics", context.query.topic)
    }
  }
}