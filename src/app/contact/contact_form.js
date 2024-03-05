"use client";

import { useState } from "react";

import clienteAxios from "../../config/axios";

import { toast } from 'sonner';

export const ContactForm = () => {
  const [nombre, setNombre] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [mensaje, setMensaje] = useState();

  const mostrarMensaje = (mensaje) => {
    toast.error(mensaje);
  };

  const mostrarAviso = (mensaje) => {
    toast.success(mensaje);
  };

  async function goSendMail(event) {
    event.preventDefault();

    if (nombre === "" || nombre === undefined) {
      mostrarMensaje("Debes escribir tu nombre");
    } else if (telefono === "" || telefono === undefined) {
      mostrarMensaje("Debes escribir tu teléfono");
    } else if (correo === "" || correo === undefined) {
      mostrarMensaje("Debes escribir tu correo");
    } else if (mensaje === "" || mensaje === undefined) {
      mostrarMensaje("Debes escribir un mensaje");
    } else {
      const sendMail = async (dataForm) => {
        try {
          await clienteAxios.post("/usuario/contacto", dataForm);

          mostrarAviso(
            "Gracias, hemos recibido tu mensaje, pronto estarémos en contacto."
          );

          setNombre(null);
          setTelefono(null);
          setCorreo(null);
          setMensaje(null);

          document.getElementById("nombre").value = "";
          document.getElementById("telefono").value = "";
          document.getElementById("correo").value = "";
          document.getElementById("mensaje").value = "";
        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };

      sendMail({
        nombre,
        telefono,
        correo,
        mensaje,
      });
    }
  }

  return (
    <>
      <form onSubmit={(e) => goSendMail(e)}>
        <h2>Contacto</h2>
        <div className="form_item">
          <h3 className="input_title">Nombre</h3>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            name="nombre"
            placeholder="Nombre"
            id="nombre"
          />
        </div>
        <div className="form_item">
          <h3 className="input_title">Teléfono</h3>
          <input
            onChange={(e) => setTelefono(e.target.value)}
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            id="telefono"
          />
        </div>
        <div className="form_item">
          <h3 className="input_title">Correo</h3>
          <input
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            name="correo"
            placeholder="Correo"
            id="correo"
          />
        </div>
        <div className="form_item">
          <h3 className="input_title">Mensaje</h3>
          <textarea
            onChange={(e) => setMensaje(e.target.value)}
            name="mensaje"
            placeholder="Escribe tu mensaje, si es relacionado con una compra no olvides escribir tu id de compra"
            id="mensaje"
          ></textarea>
        </div>
        <button className="btn btn_primary btn_rounded" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};
