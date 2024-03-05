
import { CartForm } from "./cart_form";

const Cart = async () => {

       
  return (
    <>
    
    <main>
      <section className="breadcrumb_section" >
        <div className="container">
          <div className="row">
            <div className="col col-lg-5">
              <div className="breadcrumb_content">
                <ul className="breadcrumb_nav ul_li_center">
                  <li>
                    <a className="home_btn" href="/">
                      Inicio
                    </a>
                  </li>
                  <li>Carrito de compras</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CartForm/>



    </main>
    </>
  );
};

export default Cart;
