"use client";

import Link from "next/link";

export const CategoryItemMain = ({item1, index}) => {

  return (
    <div 
    key={index} 
    className="grid-item w_50">
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
  </div>
  )
}

