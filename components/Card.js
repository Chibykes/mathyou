import Image from "next/image";
import Link from "next/link";
import { BsFillPlayFill } from 'react-icons/bs'
import { RiPlayFill } from 'react-icons/ri'
import { MdStarRate } from 'react-icons/md'

export default function Card ({ id, link, image, heading, description, details, video, rating, watch }) {

    return(
        <Link href={link || "/class"} className="group shadow-xl space-y-2 overflow-hidden">

            <div className="relative h-40 inset-0 overflow-hidden">
                <Image 
                    className="object-cover"
                    src={image}
                    alt={heading}
                    fill
                />

                <div className="
                    absolute top-0 left-0 h-full w-full bg-black opacity-0
                    group-hover:opacity-50"
                ></div>

                <BsFillPlayFill className="
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    text-white text-4xl opacity-0
                    group-hover:opacity-100"
                />
            </div>

            <div className="space-y-2 p-4">
                <p className="font-bold group-hover:text-amber-600">{heading}</p>
                <p className="text-xs">{description.split(" ").slice(0,12).join(" ")}...</p>

                <div className="flex justify-between text-xs gap-2">
                    <div className="flex justify-start items-center gap-1">
                        <RiPlayFill className="text-lg" />
                        <p className="">
                            <strong>{parseInt(watch).toLocaleString()}</strong>
                            <span className="text-neutral-400 text-[.625rem]"> watch</span>
                        </p>
                    </div> 
                    <div className="inline-flex justify-start items-center bg-black rounded-sm px-3 py-1 gap-1">
                        <MdStarRate className="text-amber-500 text-lg" />
                        <p className="text-white">
                            <strong>{rating}</strong>
                        </p>
                    </div> 
                </div>
            </div>

        </Link>
    )

}