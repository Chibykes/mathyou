import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { BiMath } from 'react-icons/bi'
import { GiUpgrade } from 'react-icons/gi'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { MdVideoLibrary } from 'react-icons/md'
import { useEffect } from 'react'
import { read_database } from '../hooks/firebase'

export default function Home({ topics }) {

  return (
    <>
      <Head>
        <title>Learn Math bit by bit</title>
      </Head>

      <main className='
        h-screen divide-y
      '>

        <Navbar logo="blue" />

        <div className='
          lg:grid grid-cols-12 items-center gap-12 w-full overflow-hidden 
           from-sky-600 to-sky-600
          lg:px-20 px-10 py-12
        '>

          <div className='col-span-5 space-y-8'>
            <p className='lg:text-left text-center text-5xl font-extrabold text-black'>
              Learning math doesnt have to be&nbsp;
              <span className="
                relative
                after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-sky-600
              ">
                difficult
              </span>
            </p>

            <div className='lg:block flex justify-center'>
              <Link className='
                inline-flex justify-center items-center gap-3
                bg-black px-8 py-4 rounded-md
                ring-2 ring-transparent ring-offset-1
                text-white lg:text-lg text-sm font-bold uppercase
                hover:bg-amber-600
                duration-200
              ' href="/topics">
                <BiMath className='text-xl text-white font-bold' />
                Start Learning
              </Link>
            </div>
          </div>

          <div className='col-span-7 relative w-full h-96'>
            <Image 
              className='object-contain'
              src="/bg.svg"
              alt=""
              fill
            />
          </div>

        </div>

        <div className='px-8 py-5 lg:px-20 lg:py-12 space-y-5'>
          <p className='text-2xl font-bold text-center'>Recent Topics</p>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {topics.map(topic => (
              <Card
                key={topic.id}
                {...topic}
                link={`/${topic.id}`}
              />
            ))}

            <div className='lg:col-span-4 flex justify-center items-center'>
              <Link 
                href="/topics"
                className="inline-flex justify-start items-center bg-black rounded-sm px-6 py-2 gap-1">
                  <p className="text-white">
                      <strong>More Topics</strong>
                  </p>
              </Link> 
            </div>
          </div>
        </div>

        <div className='px-8 py-5 lg:px-20 lg:py-12 space-y-5'>
          <p className='text-4xl font-bold text-center text-sky-600'>Maths simplified very easy</p>

          <div className='grid grid-cols-3 gap-8'>
            <div className='flex flex-col justify-center items-center gap-8'>
              <MdVideoLibrary className="text-5xl" />
              <p className='text-center text-lg font-bold'>Watch</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-8'>
              <BiMath className="text-5xl" />
              <p className='text-center text-lg font-bold'>Practice</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-8'>
              <GiUpgrade className="text-5xl" />
              <p className='text-center text-lg font-bold'>Learn</p>
            </div>
          </div>
        </div>

        <footer className='bg-black text-white font-bold text-sm p-10 flex justify-center items-center'>
          &copy; 2023
        </footer>

      </main>
    </>
  )
}


export async function getServerSideProps(context){
  return {
    props: {
      topics: await read_database("topics")
    }
  }
}
