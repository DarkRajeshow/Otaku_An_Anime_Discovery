import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Contexts } from '../App'

export default function NavBar() {

    const { NavigateHome } = useContext(Contexts);
    return (
        <motion.div className="h-24 md:h-32 p-5 w-full border-b-2 border-[white]"
            transition={{
                type: 'tween', duration: 1
            }}
            initial={{
                y: -150
            }}
            animate={{
                y: 0
            }}
        >
            <div className="logo flex text-2xl text-white font-bold border-r-2 border-[white] align-middle w-52" onClick={NavigateHome}>
                <motion.img className='w-14 md:w-20 rounded-md cursor-pointer' src="https://image.lexica.art/full_jpg/330dbad7-fcc6-4211-92d4-7bb72d99572b" alt=""
                    initial={{ opacity: 0.6 }}
                    whileInView={{ opacity: [0, 1] }}
                    whileHover={{
                        scale: 1.2,
                        transition: {
                            duration: 2
                        }
                    }}
                    whileTap={{
                        scale: 0.8,
                        borderRadius: "100%",
                    }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <motion.div className='m-auto overflow-hidden'
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{
                        opacity: [0, 1],
                        width: "50%",
                        transition: { duration: 2 },
                    }}
                    whileHover={{
                        scale: 1.1
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <h3 className='text-center'>OTAKU</h3>
                </motion.div>
            </div>
        </motion.div>
    )
}
