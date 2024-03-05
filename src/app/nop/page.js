import Link from 'next/link'

import clienteAxios from "../../config/axios";

const Aviso = async () => {
 

  const getAviso = async () => {
    try {
      const res = await clienteAxios.get(`/empresa/single/658c57daea3c61d484acf6fb`);
      //console.log(res.data)
      return res.data.single.aviso;
      
    } catch (error) {
      console.log(error);
    }
  };

  
  const avisoDeP = await getAviso();

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
                    <Link className="home_btn" href="/">
                      Inicio
                    </Link>
                  </li>
                  <li>Aviso de privacidad</li>
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
                  {avisoDeP}                
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      </>

  )
}

export default Aviso