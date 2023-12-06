const Footer = () => {
    return ( 
        <div className="mx-0 pb-5">
          <footer
                  className="text-center text-lg-start text-white bg-dark pb-5 pt-3"
                  
                  >
            <section className="d-flex justify-content-between p-2">
            </section>
            <section className="">
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold">B&G Estates</h6>
                    <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                        
                        />
                    <p>
                      Supplying first class sales services for the real estate value since 2023.
                    </p>
                  </div>
                  
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold">Useful links</h6>
                    <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                       
                        />
                    <p>
                      <a href="#" className="text-white">Properties</a>
                    </p>
                    <p>
                      <a href="#" className="text-white">Our Sellers</a>
                    </p>
                    <p>
                      <a href="#" className="text-white">Help</a>
                    </p>
                  </div>
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold">Contact</h6>
                    <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                        
                        />
                    <p><i className="mr-3"></i> B&G Estates, Perth Road Dundee, DD1 6PJ</p>
                    <p><i className="mr-3"></i> info@bandg.com</p>
                    <p><i className="mr-3"></i> 01382 123456</p>
                    <p><i className="mr-3"></i> 01382 987654</p>
                  </div>
                </div>
              </div>
            </section>
            <div
                 className="text-center p-3"
                
                 >
              2023 B&G Estates &nbsp;
              <a className="text-white" href="https://mdbootstrap.com/"
                 >BGEstates.co.uk</a
                >
            </div>
          </footer>
        
        </div>


     );
}
 
export default Footer;