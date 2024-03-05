"use client";

import Link from "next/link";

import {ProductPreviewCard} from "../../../../../components/productPreviewCard"

export const RelatedProducts = ({ productosRelacionados, codigo }) => {
  return (
    <section className="popular_product_section" style={{paddingTop:"70px", paddingBottom:"70px"}}>
      <div className="container width_tablet">
        <h2 className="title_text">Productos Relacionados</h2>

        <div className="row">
          {productosRelacionados &&
            productosRelacionados
              .filter(
                (element) =>
                  element.codigo !== codigo &&
                  element.fotos_carrusel.length > 0
              )
              .map((item, index) => (
                <div key={index} className="col col-lg-3 col-md-4 col-sm-6">
                  <ProductPreviewCard item={item}/>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};


