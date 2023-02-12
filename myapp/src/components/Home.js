
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Totop from "./Totop";
export default function Home() {
  return (
    <>
      <Navbar />
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
              <div>
                <h1 style={{color:"#64C6CE", fontWeight : "bold"}}>The QUANTUM Portal</h1>
                <h2 className="text-g">
                  Welcome to QUANTUM LEAP Portal.
                </h2>
                <div className="button-container dfc">
                  <a
                    target="_0"
                    href="https://play.google.com/store/apps/details?id=com.wekn.factify"
                    className="btn download-btn"
                  >
                    <i className="bx bxl-play-store"></i> Google Play
                  </a>
                  <Link to="/adminlogin" className="btn download-btn">
                    <i className="bx bx-globe"></i>Go To Admin
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img">
             
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
