"use client";

import Link from "next/link";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CategoryItemSmall = ({item1, index}) => {

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    })

    const scaleProgress =  useTransform(scrollYProgress,[0, 1], [0.8,1]);
    const opacityProgress = useTransform(scrollYProgress,[0, 1], [0.6,1]);

  return (
    <motion.div 
    ref={ref}
    style={{
        scale: scaleProgress,
        opacity: opacityProgress
    }}
    key={index} 
    className="grid-item">
    <Link
      className="category_item_1"
      href={`/categories/Todas/${item1.nombre.trim().replace(/\s/g,"-")}`}
    >
      <img
        src={`${item1.imagen}`}
        alt={`${item1.imagen}`}
      />
      <span className="item_title">
        {item1.nombre}{" "}
        <i
          className="fas fa-angle-right"
          style={{
            position: "absolute",
            bottom: "20px",
            right: "30px",
          }}
        ></i>
      </span>
    </Link>
  </motion.div>
  )
}

