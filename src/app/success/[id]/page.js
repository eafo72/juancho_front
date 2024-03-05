

const Success = ({ params }) => {
  return (
    <>
      <main>
        <section className="breadcrumb_section" >
          <div className="container">
            <div className="row">
              <div className="col col-lg-6">
                <div className="breadcrumb_content">
                  <ul className="breadcrumb_nav ul_li_center">
                    <li>
                      <a className="home_btn" href="/">
                        Inicio
                      </a>
                    </li>
                    <li>Carrito de Compras</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq_section sec_space_small">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div style={{padding:"30px 0px"}}>
                  <h2 className="faq_title text-center">
                    Hemos recibido su pago, gracias por su compra.
                  </h2>
                  <p className="text-center">
                    Para rastrear su compra utilice la referencia : {params.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Success;
