import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { BiMath } from 'react-icons/bi'
import { GiUpgrade } from 'react-icons/gi'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { MdVideoLibrary } from 'react-icons/md'
import { useEffect } from 'react'

export default function Home({ topics }) {

  useEffect(() => {
    
    return;
  }, []);

  return (
    <>
      <Head>
        <title>Learn Math bit by bit</title>
      </Head>

      <main className='
        h-screen
      '>

      <Navbar logo="blue" />

        <div className='
          flex flex-col justify-center items-start gap-12 w-full h-3/4 overflow-hidden 
          bg-[url(/bg.svg)] bg-contain bg-no-repeat bg-right from-sky-600 to-sky-600
          px-20
        '>


          <p className='lg:w-1/3 text-4xl font-bold text-black'>
            Learning math doesnt have to be&nbsp;
            <span className="
              relative
              after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-sky-600
            ">
              difficult
            </span>
          </p>

          <div className=''>
            <Link className='
              flex justify-center items-center gap-3
              bg-black px-8 py-4 rounded-md
              ring-2 ring-transparent ring-offset-1
              text-white text-lg font-bold uppercase
              hover:bg-amber-600
              duration-200
            ' href="/topics">
              <BiMath className='text-xl text-white font-bold' />
              Start Learning
            </Link>
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

  const baseURL = process.env.BASE_URL;
  const res = await fetch(baseURL+"/api/topics");
  const data = await res.json();
  
  return {
    props: {
      topics: data
    }
  }
}
