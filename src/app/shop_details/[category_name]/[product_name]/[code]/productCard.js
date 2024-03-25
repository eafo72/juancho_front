"use client";

import { useState } from "react";

import Link from "next/link";

import Modal from 'react-modal';

import Select from "react-select";

import { useCartStore } from '../../../../../store/cart';

import { toast } from 'sonner';

import ImageGallery from "react-image-gallery";

import { FacebookShareButton, FacebookIcon } from "react-share";

export const ProductCard = ({ stockTotal, fotos_carrusel, producto, allSizes }) => {

  const addCartItem = useCartStore((state) => state.add_cart_item)
  const { cart } = useCartStore()

  const [showContinueModal, setContinueModal] = useState(false);
  const [talla, setTalla] = useState();
  const [color, setColor] = useState();
  const [cantidad, setCantidad] = useState(1);

  let images = []; 
 
  for (let i = 0; i < fotos_carrusel.length; i++) {
      images.push(
      {
        original: fotos_carrusel[i]["image"],
        thumbnail: fotos_carrusel[i]["image"],
        originalClass: "img-fluid",
      },
      );
  }

  const currentPageUrl =
    "https://juanchoelreydelrancho.com/shop_details/" +
    producto.categoria +
    "/" +
    producto.nombre.trim().replace(/\s/g, "-") +
    "/" +
    producto.codigo;

  const handleColorChange = (codigo, label) => {
    setColor({ value: codigo, label: label });
  };

  const mostrarMensaje = (mensaje) => {
    toast.error(mensaje);
  };

  const mostrarAviso = (mensaje) => {
    toast.success(mensaje);
  };

  const addToCart = (event) => {
    event.preventDefault();

    let onCart = 0;

    //validamos campos
    if (color === "" || color === undefined) {
      mostrarMensaje("Debes seleccionar un color");
    } else if (talla === "" || talla === undefined) {
      mostrarMensaje("Debes seleccionar una talla");
    } else if (cantidad === "" || cantidad === undefined) {
      mostrarMensaje("Debes escribir una cantidad");
    } else {

      //buscamos si ya tiene el mismo producto en el carrito
      for(let i=0; i < cart.length; i++){
        if(cart[i]['codigo'] == producto.codigo + "-" + talla.value + "-" + color.value){
          onCart = onCart + parseInt(cart[i]['cantidad']);
          //console.log(onCart);
        }
      }

      if ((cantidad + onCart) > stockTotal) {
        if(onCart > 0){
          mostrarMensaje("La existencia es de " + stockTotal + " y tienes " + onCart + " en el carrito de compras");
        }else{
          mostrarMensaje("La existencia es de " + stockTotal );
        }
      }else{
        addCartItem({
          foto_principal: producto.foto_principal,
          nombre_original: producto.nombre_original,
          marca: producto.marca,
          categoria: producto.categoria,
          subcategoria: producto.subcategoria,
          codigo: producto.codigo + "-" + talla.value + "-" + color.value,
          codigo_producto: producto.codigo,
          nombre_producto: producto.nombre,
          codigo_talla: talla.value,
          nombre_talla: talla.label,
          codigo_color: color.value,
          nombre_color: color.label,
          cantidad: parseInt(cantidad),
          precio: producto.precio,
          total: parseInt(cantidad) * producto.precio,
        })

      mostrarAviso("Producto Agregado");
      setContinueModal(true)  

      }


    }
  };

  function closeModal() {
    setContinueModal(false);
  }

  const modalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      animation: 'fadeIn 1s'
    },
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      textTransform:"none",
      paddingLeft:"10px",
      borderColor: state.isFocused ? "#344493":"#cccccc",
      boxShadow: "0",
      "&:hover": {
        ...base,
        boxShadow: "0",
        borderColor: "#344493 !important",
      }
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "rgb(15 23 42 / var(--tw-text-opacity))",
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      color: "red",
    }),
    option: (base, state) => {
      return {
        ...base,
        background: state.isSelected ? "#344493" : state.isFocused ? "#34449350": "transparent",
        color: state.isSelected ? "white" : "grey",
      };
    },
  };

  return (
    <>
    <section className="shop_details bg_gray sec_space_small" style={{marginTop:"30px"}}>
      <div className="container">
        <div className="row ">
          <div className="col col-lg-7 col-md-8">
            <div style={{paddingTop:"20px"}}>
              <ImageGallery items={images} />
            </div> 
          </div>

          <div className="col col-lg-5 col-md-8">
            <div className="shop_details_content" style={{paddingBottom:"20px"}}>
              {/*
                <div className="item_badge">Sale</div>
                */}
              <h2 className="item_subtitle">
                {producto && producto.categoria}
              </h2>
              <h3 className="item_title">{producto && producto.nombre}</h3>
              <h4>{producto && producto.marca}</h4>
              <div className="item_price">
                <span className="sale_price">
                  $ {producto && producto.precio}
                </span>
                {/*
                  <del>$130.00</del>
                   */}
              </div>
              <p className="mb-0">{producto && producto.descripcion}</p>
              <hr />
              <div className="sd_info_layout">
                <h4 className="title_text">Color:</h4>

                <ul className="sd_color_list ul_li">
                  {producto &&
                    producto.color.map((item, index) => (
                      <li key={index}>
                        <input
                          style={{ backgroundColor: item.colorhexa }}
                          onChange={() =>
                            handleColorChange(item.value, item.label)
                          }
                          type="radio"
                          name="sd_item_color"
                        />
                      </li>
                    ))}
                </ul>
              </div>

              <div className="sd_info_layout">
                <h4 className="title_text">Talla:</h4>

                <div className="sd_item_size_input">
                  <Select
                    styles={customStyles}
                    placeholder="Seleccione"
                    options={allSizes}
                    value={talla}
                    onChange={setTalla}
                    isSearchable={true}
                  ></Select>
                </div>
              </div>

              <ul className="sd_btns_group ul_li">
                <li>
                  <div className="quantity_form">
                    <button
                      type="button"
                      className="input_number_decrement"
                      onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
                    >
                      <i className="fal fa-minus"></i>
                    </button>
                    <input
                      className="input_number"
                      type="number"
                      onChange={(e) => setCantidad(e.target.value)}
                      value={cantidad}
                      min="1"
                    />
                    <button
                      type="button"
                      className="input_number_increment"
                      onClick={() => setCantidad(cantidad + 1)}
                    >
                      <i className="fal fa-plus"></i>
                    </button>
                  </div>
                </li>
                <li>
                  <button
                    className="btn btn_primary btn_rounded text-uppercase"
                    onClick={(e) => addToCart(e)}
                  >
                    Agregar al carrito
                  </button>
                </li>
              </ul>

              <hr />

              <div className="row align-items-center justify-content-between">
                <div className="col col-lg-7 col-md-6">
                  <div className="sd_info_layout mb-0">
                    <h4 className="title_text">Compartir:</h4>
                    <ul className="social_primary ul_li">
                      <li>
                          <FacebookShareButton
                          url={currentPageUrl}
                          >
                            <i className="fab fa-facebook-f"></i>
                            
                          </FacebookShareButton>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal
        isOpen={showContinueModal}
        style={modalCustomStyles}
        ariaHideApp={false}
      >
        <ul style={{listStyle:"none",display:"flex",padding:"0px",margin:"0px"}}>
          <li>
            <button className="btn btn_primary btn_rounded text-uppercase" style={{padding:"15px",margin:"10px"}} onClick={closeModal}>Continuar comprando</button>
          </li>
          <li>
            <Link href="/cart"><button className="btn btn_secondary btn_rounded text-uppercase" style={{padding:"15px",margin:"10px"}}>Ir al carrito</button></Link>
          </li>
        </ul>
      </Modal>
    </>
  );
};


