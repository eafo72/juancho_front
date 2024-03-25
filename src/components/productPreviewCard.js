"use client";

import { useState } from "react";

import Link from "next/link";

import clienteAxios from "../config/axios";

import Modal from "react-modal";

import Select from "react-select";

import { useCartStore } from "../store/cart";

import { FacebookShareButton, FacebookIcon } from "react-share";

import { toast } from "sonner";

export const ProductPreviewCard = ({ item }) => {
  
  const addCartItem = useCartStore((state) => state.add_cart_item);
  const { cart } = useCartStore();

  const [showContinueModal, setContinueModal] = useState(false);
  const [showQuickViewModal, setQuickViewModal] = useState(false);

  const [stockTotal, setStockTotal] = useState(1000);

  const allSizes = item.talla;

  const [talla, setTalla] = useState();
  const [color, setColor] = useState();
  const [cantidad, setCantidad] = useState(1);

  const currentPageUrl =
    "https://juanchoelreydelrancho.com/shop_details/" +
    item.categoria +
    "/" +
    item.nombre.trim().replace(/\s/g, "-") +
    "/" +
    item.codigo;

  const handleColorChange = (codigo, label) => {
    setColor({ value: codigo, label: label });
  };

  /*
  const getStock = async (size, colour) => {
    try {
      //getStock
      const res2 = await clienteAxios.get(
        `/almacen/stock-codigo/` + item.codigo + `-` + size + `-` + colour
      );

      //console.log(res2.data.stock[0].stockTotal);

      setStockTotal(res2.data.stock[0].stockTotal);
    } catch (error) {
      console.log(error);
    }
  };
 */

  const mostrarMensaje = (mensaje) => {
    toast.error(mensaje);
  };

  const mostrarAviso = (mensaje) => {
    toast.success(mensaje);
  };

  const addToCart = async (event) => {
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
      //vemos cuanto hay en stock  OJO NO PUDIMOS SABER STOCK PQ ESTAMOS EN MODO CLIENT
      // await getStock(talla.value, color.value);

      //buscamos si ya tiene el mismo producto en el carrito
      for (let i = 0; i < cart.length; i++) {
        if (
          cart[i]["codigo"] ==
          item.codigo + "-" + talla.value + "-" + color.value
        ) {
          onCart = onCart + parseInt(cart[i]["cantidad"]);
          //console.log(onCart);
        }
      }

      if (cantidad + onCart > stockTotal) {
        if (onCart > 0) {
          mostrarMensaje(
            "La existencia es de " +
              stockTotal +
              " y tienes " +
              onCart +
              " en el carrito de compras"
          );
        } else {
          mostrarMensaje("La existencia es de " + stockTotal);
        }
      } else {
        addCartItem({
          foto_principal: item.foto_principal,
          nombre_original: item.nombre_original,
          marca: item.marca,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          codigo: item.codigo + "-" + talla.value + "-" + color.value,
          codigo_producto: item.codigo,
          nombre_producto: item.nombre,
          codigo_talla: talla.value,
          nombre_talla: talla.label,
          codigo_color: color.value,
          nombre_color: color.label,
          cantidad: parseInt(cantidad),
          precio: item.precio,
          total: parseInt(cantidad) * item.precio,
        });

        document.body.style.overflow = "unset";
        document.body.style.pointerEvents = "auto";

        setQuickViewModal(false);
        mostrarAviso("Producto Agregado");
        setContinueModal(true);
      }
    }
  };

  function closeModal() {
    setContinueModal(false);
  }

  function closeQuickViewModal() {
    setQuickViewModal(false);
    document.body.style.overflow = "unset";
    document.body.style.pointerEvents = "auto";
  }

  function openQuickViewModal() {
    setQuickViewModal(true);
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
  }

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      animation: "fadeIn 1s",
    },
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      textTransform: "none",
      paddingLeft: "10px",
      borderColor: state.isFocused ? "#344493" : "#cccccc",
      boxShadow: "0",
      "&:hover": {
        ...base,
        boxShadow: "0",
        borderColor: "#344493 !important",
      },
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
        background: state.isSelected
          ? "#344493"
          : state.isFocused
          ? "#34449350"
          : "transparent",
        color: state.isSelected ? "white" : "grey",
      };
    },
  };

  return (
    <>
      <div className="shop_layout_1">
        <div className="shop_image_wrap">
          <div className="tab-content">
            {/*foto 1*/}
            <div
              className="tab-pane fade show active"
              id={item.codigo}
              role="tabpanel"
            >
              <Link
                className="shop_image"
                href={`/shop_details/${item.categoria
                  .trim()
                  .replace(/\s/g, "-")}/${item.nombre
                  .trim()
                  .replace(/\s/g, "-")}/${item.codigo}`}
              >
                <img
                  src={`${item.foto_principal}`}
                  alt={`${item.foto_principal}`}
                  className="img-fluid"
                />
              </Link>
            </div>
            {/*fotos carrusel*/}        
            {item.fotos_carrusel.map((item2, index) => {
              return index < 4 ? 
            (
              <div
                key={index}
                className="tab-pane fade"
                id={item.codigo + index}
                role="tabpanel"
              >
                <Link
                  className="shop_image"
                  href={`/shop_details/${item.categoria
                    .trim()
                    .replace(/\s/g, "-")}/${item.nombre
                    .trim()
                    .replace(/\s/g, "-")}/${item.codigo}`}
                >
                  <img
                    src={`${item2.image}`}
                    alt={`${item2.image}`}
                    className="img-fluid"
                  />
                </Link>
              </div>
            ):(<></>)
            })}
          </div>

          {/*hover links*/}
          <ul className="action_btns_group ul_li_block">
            <li>
              <a
                onClick={() => openQuickViewModal()}
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Vista rápida"
              >
                <i className="fal fa-eye"></i>
              </a>
            </li>
          </ul>
        </div>

        {/*tabs buttons*/}
        <ul className="nav child_image" role="tablist">
          <li role="presentation">
            <button
              className="active"
              data-bs-toggle="tab"
              data-bs-target={"#" + item.codigo}
              type="button"
              role="tab"
              aria-selected="true"
            >
              <img
                src={`${item.foto_principal}`}
                alt={`${item.foto_principal}`}
                className="img-fluid"
              />
            </button>
          </li>
          {item.fotos_carrusel.map((item2, index) => {
            return index < 4 ? 
          (
            <li key={index} role="presentation">
              <button
                data-bs-toggle="tab"
                data-bs-target={"#" + item.codigo + index}
                type="button"
                role="tab"
                aria-selected="false"
              >
                <img
                  src={`${item2.image}`}
                  alt={`${item2.image}`}
                  className="img-fluid"
                />
              </button>
            </li>
          ):(<></>)
          })}
          
        </ul>

        {/*info producto*/}
        <div className="shop_content">
          <h3 className="shop_title">
            <Link
              href={`/shop_details/${item.categoria
                .trim()
                .replace(/\s/g, "-")}/${item.nombre
                .trim()
                .replace(/\s/g, "-")}/${item.codigo}`}
            >
              {item.nombre}
            </Link>
          </h3>
          <div className="shop_price">
            <span className="sale_price">$ {item.precio}</span>
          </div>
          <ul className="shop_category ul_li">
            <li>{item.marca}</li>
          </ul>
        </div>
      </div>
      <Modal
        isOpen={showContinueModal}
        style={modalCustomStyles}
        ariaHideApp={false}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            padding: "0px",
            margin: "0px",
          }}
        >
          <li>
            <button
              className="btn btn_primary btn_rounded text-uppercase"
              style={{ padding: "15px", margin: "10px" }}
              onClick={closeModal}
            >
              Continuar comprando
            </button>
          </li>
          <li>
            <Link href="/cart">
              <button
                className="btn btn_secondary btn_rounded text-uppercase"
                style={{ padding: "15px", margin: "10px" }}
              >
                Ir al carrito
              </button>
            </Link>
          </li>
        </ul>
      </Modal>
      <Modal
        isOpen={showQuickViewModal}
        style={modalCustomStyles}
        ariaHideApp={false}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{ maxHeight: "70vh", zIndex: "999999" }}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                style={{ marginBottom: "15px" }}
                onClick={() => closeQuickViewModal()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="shop_details bg_gray sec_space_small">
                <div className="container">
                  <div className="row align-items-center justify-content-center">
                    <div className="col col-lg-6 col-md-8">
                      <div className="sd_image_carousel p-0">
                        <img
                          src={`${item.foto_principal}`}
                          alt={`${item.foto_principal}`}
                          className="img-fluid"
                        />
                      </div>
                    </div>

                    <div className="col col-lg-6 col-md-8">
                      <div className="shop_details_content">
                        <h2 className="item_subtitle">{item.categoria}</h2>
                        <h3 className="item_title">
                          {item.nombre}
                        </h3>
                        <h4>{item.marca}</h4>
                        <div className="item_price">
                          <span className="sale_price">$ {item.precio}</span>
                        </div>
                        <p className="mb-0">{item.descripcion}</p>
                        <hr />
                        <div className="sd_info_layout">
                          <h4 className="title_text">Color:</h4>

                          <ul className="sd_color_list ul_li">
                            {item.color.map((item, index) => (
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
                                onClick={() =>
                                  setCantidad(cantidad > 1 ? cantidad - 1 : 1)
                                }
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
                                  <FacebookShareButton url={currentPageUrl}>
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
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
