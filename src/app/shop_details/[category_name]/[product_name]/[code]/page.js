
import Link from "next/link";

import clienteAxios from "../../../../../config/axios";

import { ProductCard } from "./productCard";
import { RelatedProducts } from "./relatedProducts";




export const generateMetadata = ({params}) =>{



return  {
    openGraph: {
        title: params.product_name,
        description: params.category_name,
        url: `https://juanchoelreydelrancho.com/shop_details/${params.category_name}/${params.product_name}/${params.code}`,
        siteName: 'Juancho el rey del rancho',
        images: [
          {
            url: `http://agencianuba.com/juancho_front_images/productos/${params.code}.jpg`, 
            width: 400,
            height: 600,
          },
        ],
        locale: 'es_MX',
        type: 'website',
      },
    }
  };

const Shop_details = async ({params}) => {

  let foto_principal;
  let nombre_original;
  let marca;
  let categoria;
  let subcategoria;
  let producto;
  let precio;
  let allSizes;
  let fotos_carrusel;
  let productosRelacionados;
  let stockTotal;

  const getProduct = async () => {
    try {
      const res = await clienteAxios.get(`/producto/single-codigo/` + params.code);
      //console.log(res.data.single[0]);

      foto_principal = res.data.single[0].foto_principal
      nombre_original = res.data.single[0].nombre
      marca = res.data.single[0].marca
      categoria = res.data.single[0].categoria
      subcategoria = res.data.single[0].subcategoria
      producto = res.data.single[0];
      
      precio = res.data.single[0].precio
    
      allSizes = res.data.single[0].talla

      fotos_carrusel = res.data.single[0].fotos_carrusel
          
      productosRelacionados = res.data.related_products
      
      
    } catch (error) {
      console.log(error);
    }


    try {
      //getStock
      const res2 = await clienteAxios.get(`/almacen/stock-codigo/` + producto.codigo +`-`+ producto.talla[0].value  +`-`+ producto.color[0].value);
            
      //console.log(res2.data.stock[0].stockTotal);

      stockTotal = res2.data.stock[0].stockTotal;

    } catch (error) {
      console.log(error);
    }
     
  };

   

  
  await getProduct();
  


  return (
    <>
    
    <main>
      {/*
      <SideMenu></SideMenu>
      */}

      <section className="breadcrumb_section" >
        <div className="container width_tablet">
          <div className="row">
            <div className="col col-lg-6">
              <div className="breadcrumb_content">
                <ul className="breadcrumb_nav ul_li_center">
                  <li>
                    <Link className="home_btn" href="/">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link className="home_btn" href= {`/categories/Todas/${params.category_name.replace("-", ' ')}`}>
                      {params.category_name.replace("-", ' ')}
                    </Link>  
                   </li>
                  <li>{nombre_original}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductCard stockTotal={stockTotal} fotos_carrusel={fotos_carrusel} producto={producto} allSizes={allSizes}/>

      <RelatedProducts productosRelacionados={productosRelacionados} codigo={params.code}/>

    </main>
    </>
  );
};

export default Shop_details;


