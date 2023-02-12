import { Link } from "react-router-dom";
import Logo from "../assets/img/log.jpg";
export default function Footer() {
  return (
    <>
      <footer id="footer" className="footer container-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-3 footer-col">
              <div className="footer-contact">
                <h5 className="text-uppercase" style={{color:"#0079B2", fontWeight : "bold"}}>
                <img
                    src={Logo}
                    alt="logo"
                    className="footer-logo mx-2"
                    height="30"
                    width="30"
                    style={{ borderRadius: 5 }}
                  />
                  QUANTUM LEAP Incorporation
                </h5>
                <p>
                114 Lavender Street CT Hub 2<br />
                09-50 Lobby, #3, 338729
                  <br />
                  Singapore <br />
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a className="contact-hov" href="callto:+65 6741 6680">
                    +65 6741 6680
                  </a>
                  <br />
                  <strong>Email:</strong>{" "}
                  <a
                    className="contact-hov"
                    href="mailto:service.quantumleap@gmail.com"
                  >
                    quantumleap@gmail.com
                  </a>
                  <br />
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-3 footer-col">
              <div className="links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/home">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/about">
                      About us
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/features">
                      Services
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/terms">
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/privacy">
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-3 footer-col">
              <div className="services">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/">
                      a
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/">
                      b
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/">
                      c
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/">
                      d
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link className="alink" to="/">
                      e
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-3 footer-col">
              <div className="our-social-link">
                <h4>Our Social Networks</h4>
                <p>You can connect us through this social media. </p>
                <div className="social-links mt-3">
                  <a className="alink" href="#twitter">
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a className="alink" href="#facebook">
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a className="alink" href="#instagram">
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a className="alink" href="#skype">
                    <i className="bx bxl-skype"></i>
                  </a>
                  <a className="alink" href="#linkedin">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section className="copyright container-fluid">
        <div className="copy">
          <p>
            &copy; Copyright <span>QUANTUM LEAP INCORPORATION</span>. All Rights Reserved.
          </p>

        </div>
      </section>
    </>
  );
}
