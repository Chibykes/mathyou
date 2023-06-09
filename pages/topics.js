import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { BiMath } from 'react-icons/bi'
import { GiUpgrade } from 'react-icons/gi'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { MdVideoLibrary } from 'react-icons/md'
import { read_database } from '../hooks/firebase'


export default function Topics({ topics }) {
  return (
    <>
      <Head>
        <title>Topics</title>
      </Head>

      <main className='
        divide-y
      '>

      <Navbar logo="blue" />

        <div className='px-8 py-5 lg:px-20 lg:py-12 space-y-5'>
          <p className='text-2xl font-bold text-center'>Other Topics</p>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {topics.map(topic => (
              <Card
                key={topic.id}
                {...topic}
                link={`/${topic.id}`}
              />
            ))}
          </div>
        </div>

        <footer className='text-neutral-800 font-bold text-sm p-10 flex justify-center items-center'>
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