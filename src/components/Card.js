import React from 'react'
import { motion } from 'framer-motion'

export default function Card(props) {

    return (
        <>
            <motion.div className="custom-shadow card gap-8 text-white rounded-md overflow-hidden cursor-pointer lg:h-auto md:h-[750px]"
                initial={{
                    opacity: 0,
                    y: "50vh"
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 200,
                        duration: 0.7,
                        delay: 0.3 * props.index,
                    }
                }}
                whileTap={{
                    scale: 0.95,
                }}
            >
                <div className="image h-[530px] overflow-hidden bg-black m-auto">
                    <motion.img
                        className='rounded-md h-full w-full'
                        src={props.card.attributes.posterImage.original} alt=""
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        transition={{
                            type: "spring",
                            duration: 1,
                        }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                    />
                </div>
                <div className="text py-4 px-5">
                    <h2 className='text-2xl font-bold text-center pb-3 border-b-2 border-white mb-3'>{props.card.attributes.titles.en ? props.card.attributes.titles.en : props.card.attributes.titles.en_us ? props.card.attributes.titles.en_us : props.card.attributes.titles.en_jp ? props.card.attributes.titles.ja_jp1 : "Unkown"}</h2>
                    <p className='font-semibold text-xl text-[#baffcf]'><span className='text-white'>Status</span> : {props.card.attributes.status.charAt(0).toUpperCase() + props.card.attributes.status.slice(1)}</p>
                    <p className='font-semibold text-xl text-[#baffcf]'><span className='text-white'>No. Of Episodes</span> : {props.card.attributes.episodeCount}</p>
                    <p className='font-semibold text-xl text-[#baffcf]'><span className='text-white'>Rating</span> : {(Number(props.card.attributes.averageRating) / 10).toFixed(1)} <i className="fa-solid fa-star text-yellow-300"></i></p>
                </div>
            </motion.div >
        </>
    )
}
