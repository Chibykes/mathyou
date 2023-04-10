import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { BiMath } from 'react-icons/bi'
import { GiUpgrade } from 'react-icons/gi'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { MdPublish, MdVideoLibrary } from 'react-icons/md'
import { useEffect, useState } from 'react'
import "jodit/build/jodit.css"

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { publish_topic, uploadFile } from '../hooks/firebase'

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation, 
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileMetadata,
  FilePondPluginFileValidateType
)





export default function Home({  }) {

  let string = "abcdefghijklmnopqrstuvwxyz0123456789";
  function gen(length) {
      let str = "";
      for(let i = 0; i < length; i++){
          str += string[Math.floor(Math.random() * string.length)];
          if(i === length-1) continue;
          if(((i+1) % 4) === 0) str += "-";
      }

      return str;
  }

  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [details_jodit, setDetails] = useState("");
  const [practice_jodit, setPractice] = useState("");
  const [form, setForm] = useState({
    id: gen(16),
    heading: "",
    details: "",
    practice: "",
    image: "",
    video: ""
  });

  const handlePublish = async () => {

    let imageURL = image.length > 0 ? await uploadFile(image[0].filename, "image", image[0].getFileEncodeDataURL()) : "";
    let videoURL = video.length > 0 ? await uploadFile(video[0].filename, "video", video[0].getFileEncodeDataURL()) : "";

    publish_topic({
      ...form,
      details: details_jodit.value,
      practice: practice_jodit.value,
      image: imageURL,
      video: videoURL
    });

  }

  useEffect(() => {
    const { Jodit } = require('jodit');
    setDetails(Jodit.make('#details'));
    setPractice(Jodit.make('#practice'));
  }, [])


  return (
    <>
      <Head>
        <title>Learn Math bit by bit</title>
      </Head>

      <main className='
        divide-y
      '>

        <Navbar logo="blue" />

        <div className='py-12 px-5'>
          <div className='grid grid-cols-3 gap-8 max-w-6xl mx-auto py-12 px-5'>

            <div className='col-span-2 space-y-8'>
              <input 
                className='block w-full p-3 text-2xl font-bold border'
                placeholder='Topic Title'
                name='heading'
                onChange={(e) => setForm({ ...form, heading: e.target.value })}
                />

              <textarea 
                id="details"
                className='block w-full p-3 text-sm border'
                placeholder='Main Content Section'
                name='details'
                rows={20}
                // onChange={(e) => setForm({ ...form, details: e.target.value })}
                />

              <textarea 
                id="practice"
                className='block w-full p-3 text-sm border'
                placeholder='Practice Section'
                name='practice'
                rows={20}
                // onChange={(e) => setForm({ ...form, practice: e.target.value })}
              />
            </div>

            <div className='col-span-1 space-y-8'>
              <div className="space-y-2">
                <p className='font-bold text-xs'> Upload Images </p>
                <FilePond
                  className='text-xs'
                  files={image}
                  onupdatefiles={setImage}
                  maxFiles={1}
                  name="files_image" /* sets the file input name, it's filepond by default */
                  labelIdle='<span class="!text-xs">Drag & Drop your files or <span class="filepond--label-action">Browse</span></span>'
                  acceptedFileTypes={['image/*']}
                  allowFileMetadata
                  allowImageExifOrientation
                  allowFileEncode       
                  />
              </div>
              <div className="space-y-2">
                <p className='font-bold text-xs'> Upload Videos </p>
                <FilePond
                  className='text-xs'
                  files={video}
                  onupdatefiles={setVideo}
                  allowMultiple={true}
                  maxFiles={1}
                  acceptedFileTypes={['video/*']}
                  name="files_video" /* sets the file input name, it's filepond by default */
                  labelIdle='<span class="!text-xs">Drag & Drop your files or <span class="filepond--label-action">Browse</span></span>'
                  allowFileMetadata
                  allowFileEncode       
                />
              </div>

              <div 
                className='
                  flex justify-center gap-2 font-bold text-sm 
                  border border-black hover:bg-black hover:text-white 
                  p-3 rounded-sm
                '
                onClick={handlePublish}
                >
                <MdPublish className='text-lg' />
                Publish
              </div>

            </div>

          </div>
        </div>

        <footer className='text-neutral-800 font-bold text-sm p-10 flex justify-center items-center'>
          &copy; 2023
        </footer>

      </main>
    </>
  )
}
