import Link from "next/link";

import { ContactForm } from "./contact_form";

const Contact = async () => {
  return (
    <>
      <main>
        <section
          className="breadcrumb_section" >
          <div className="container">
            <div className="row">
              <div className="col col-lg-6">
                <div className="breadcrumb_content">
                  <ul className="breadcrumb_nav ul_li_center">
                    <li>
                      <Link className="home_btn" href="/">
                        Inicio
                      </Link>
                    </li>
                    <li>Contacto</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact_section sec_space_small p-4">
          <div className="container">
            <div className="contact3_wrap">
              <div className="row clearfix pt-3">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3775.0506672214187!2d-99.1756667!3d18.8848333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDUzJzA1LjQiTiA5OcKwMTAnMzIuNCJX!5e0!3m2!1ses!2smx!4v1702410025817!5m2!1ses!2smx"
                  style={{ width: "100%", height: "450px", border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="row">
                <div className="col">
                  <div className="contact_form3">
                    <ContactForm />
                  </div>
                </div>
                <div className="col">
                  <div className="contact_form3">
                    <div className="info_list">
                      <h4>Nuestra ubicación</h4>
                      <ul className="ul_li_block">
                        <li>Lorem Ipsum</li>
                        <li>Ut enim ad minim veniam</li>
                      </ul>
                    </div>
                    <div className="info_list">
                      <h4>Contáctanos</h4>
                      <ul className="ul_li_block">
                        <li>ecommerce@juanchoelreydelrancho.com</li>
                      </ul>
                    </div>
                    <div className="social_wrap">
                      <h4>Síguenos en:</h4>
                      <ul className="social_border ul_li">
                        <li>
                          <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        {/*
                        <li><a href="#!"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#!"><i className="fab fa-skype"></i></a></li>
                        <li><a href="#!"><i className="fas fa-envelope"></i></a></li>
                        <li><a href="#!"><i className="fab fa-whatsapp"></i></a></li>
                        */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
