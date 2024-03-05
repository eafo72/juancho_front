
import Image from 'next/image'
import Link from 'next/link'

import clienteAxios from "../config/axios";

import logo from "../images/logo/logo-juancho.png";


import { NavbarOptions } from "./navbarOptions"

export async function Navbar() {

   
  
  const getSlogan = async () => {
    try {
      const res = await clienteAxios.get(`/empresa/single/658c57daea3c61d484acf6fb`);
      //console.log(res.data)
      return res.data.single.slogan;
      
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await clienteAxios.get(`/categoria/obtener`);
      //console.log(res.data.categorias)
      return res.data.categorias;
    } catch (error) {
      console.log(error);
    }
  };
   
  
  const categories = await getCategories();
  const slogan = await getSlogan();
     

  return (
    <>
  
    <header className="header_section header_1">
        <div className="container width_desktop">
          <div className="header_top">
            <p className="welcome_text">{slogan}</p>
            <ul className="header_icons_list ul_li">
              <li>
                <ul className="social_primary ul_li">
                  <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                </ul>
              </li>
              <li>
                <a href="mailto:ecommerce@juanchoelreydelrancho.com"><i className="fas fa-envelope"></i></a>
              </li>
              <li>
                <a href="https://juancho-panel.web.app" target="_blank" rel="noreferrer" className="user_account_btn"><i className="fas fa-user"></i> Login</a>
              </li>
            </ul>
          </div>

          
              <Link className="brand_link" href="/" style={{display:"block"}}>
              <Image className="logo_size logo_m logo_position_float" src={logo} alt={logo} />
              </Link>
          

          <div className="header_bottom">

              {/*este div es solo para que deje el espacio del logo*/}
              <div className="brand_logo"></div>

              <NavbarOptions categories= {categories} />
            
          </div>
        </div>

        <div className="main_search_collapse collapse" id="main_search_collapse">
          <div className="main_search_form card">
            <div className="container width_desktop">
              <form action="#">
                <div className="form_item">
                  <input type="search" name="search" placeholder="Search here..."/>
                  <button type="submit" className="submit_btn"><i className="fal fa-search"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

                
      </>   
  );
}
