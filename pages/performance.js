import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { BiMath } from 'react-icons/bi'
import { GiUpgrade } from 'react-icons/gi'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { MdVideoLibrary } from 'react-icons/md';

const performance_data = [
  {
    value:  "4",
    details: "Total Topics Studied",
    icon: "",
  },
  {
    value:  "1000",
    details: "Watch Time (in hour)",
    icon: "",
  },
  {
    value:  "4",
    details: "Topics Rated",
    icon: "",
  }
]

export default function Topics({  }) {
  return (
    <>
      <Head>
        <title>Performance Analysis</title>
      </Head>

      <main className='divide-y'>

        <Navbar logo="blue" />

        <div className='px-20 py-12 space-y-5'>
          <p className='text-2xl font-bold'>Performance</p>

          <div className='grid grid-cols-3 gap-5'>

            {performance_data.map(({ value, details, icon }, index) => (
              <div key={index} className='divide-y min-h-[140px] p-3 bg-white hover:bg-gradient-to-t from-sky-500 to-sky-400 hover:text-white border rounded-md'>
                <p className='min-h-[120px] text-6xl font-bold'>{value}</p>
                <div className='flex items-center gap-2 pt-2'>
                  <p className='text-xs'>
                    {details}
                  </p>
                </div>
              </div>
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