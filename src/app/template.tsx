"use client";

import { motion, AnimatePresence } from "framer-motion";


export default function Template({ children } : {children: React.ReactNode})
 {
  return (
    <AnimatePresence>
      <motion.div
        key={Math.random()}
        initial={{y:20, opacity:0}}
        animate={{y:0, opacity:1}}

        //initial={{x:"100vw"}}
        //animate={{x:0}}
        transition={{
          ease: "easeInOut",
          duration: 1.75
        }}
        exit={{ y:20, opacity:0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}