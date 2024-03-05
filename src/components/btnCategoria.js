"use client";

import Link from "next/link";

import {useState} from "react"

import useInterval from 'use-interval'

export const BtnCategoria = ({categories}) => {

    const [activeCategory, setActiveCategory] = useState("Vestidos");

    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    
    const [activeRoute, setActiveRoute] = useState("/categories/Todas/Vestidos");
    


    const categoryRoutes =  []
    for (let i = 0; i < categories.length; i++) {
      categoryRoutes.push({"ruta":"/categories/Todas/"+categories[i]['nombre'], "nombre":categories[i]['nombre']})
    }


    const changeCategory = () =>{
       if(activeCategoryIndex < (categoryRoutes.length) - 1){
        setActiveCategoryIndex(activeCategoryIndex + 1);
        setActiveRoute(categoryRoutes[activeCategoryIndex + 1]['ruta'])
        setActiveCategory(categoryRoutes[activeCategoryIndex + 1]['nombre'])
       }else{
        setActiveCategoryIndex(0);
        setActiveRoute(categoryRoutes[0]['ruta'])
        setActiveCategory(categoryRoutes[0]['nombre'])
       }
        
    }

    useInterval(() => {
        changeCategory()
      }, 5000);

    /*OJO el key del boton sirve para volver renderizar despues de cambiar el contenido*/

  return (
    <Link
      key={activeRoute}
      className="btn btn_primary btn_rounded"
      href={activeRoute}
      style={{ fontSize: "1.2rem", marginTop: "25px", minWidth:"20vw" }}
    >
      <span className="fadeInUp">{activeCategory}
        <i className="fas fa-angle-right" style={{ marginLeft: "20px" }}></i>
      </span>  
    </Link>
  );
};


