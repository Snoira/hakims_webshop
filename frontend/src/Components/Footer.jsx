import { IoIosCall, IoIosBusiness } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { FaInstagram, FaFacebook } from "react-icons/fa";

import "../Styles/footer.css";





const Footer = () => {
  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          {/* <a
            href="/"
            className="d-flex align-items-center mb-3 link-dark text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a> */}
          <p className="text-muted mt-2">© 2024 Hakim Livs</p>
        </div>

        <div className="col mb-3">
          <h5 className="text-start">Om oss</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2 ">
              <a
                href="#"
                className="nav-link p-0 text-muted text-start custom-hover"
              >
                Vår historia
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="#"
                className="nav-link p-0 text-muted text-start custom-hover"
              >
                Vår affärsidé
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="#"
                className="nav-link p-0 text-muted text-start custom-hover"
              >
                Nyheter & press
              </a>
            </li>

            <li className="nav-item mb-2">
              <a
                href="#"
                className="nav-link p-0 text-muted text-start custom-hover"
              >
                Lediga tjänster
              </a>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          <h5 className="text-start">Kundservice</h5>
          <div className="block-23 mb-3">
            <ul className="nav flex-column">
              <li className="nav-link p-0 text-muted text-start">
                <span className="text-start">
                  <IoIosBusiness />
                </span>
                <span className="p-3 text-start">Hakim Livs AB</span>
              </li>
              <li>
                <a href="#" className="nav-link p-0 text-muted text-start">
                  <span>
                    <IoIosCall />
                  </span>
                  <span className="p-3 text-start custom-hover">
                    010-553 66 12
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link p-0 text-muted text-start ">
                  <span>
                    <MdEmail />
                  </span>
                  <span className="text-start p-3 custom-hover">
                    info@hakimlivs.se
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col mb-3">
          <h5 className="text-start">Hitta butik</h5>
          <div className="block-23 mb-3">
            <ul className="nav flex-column">
              <li className="nav-link p-0 text-muted text-start">
                <span className="text-start">
                  <FaLocationDot />
                </span>
                <span className="p-3 text-start">Hakim Livs AB</span>
              </li>
              <li>
                <a href="#" className="nav-link p-0 text-muted text-start">
                  <span className="p-2"></span>
                  <span className="p-3 text-start">Fejkgatan 15</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link p-0 text-muted text-start">
                  <span className="p-2"></span>
                  <span className="text-start p-3">116 25 Stockholm</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col mb-3">
          <div className="block-23 mb-3">
            <ul className="nav flex-column">
              <li className="nav-link p-0 text-muted text-start">
                <span className=" p-3 text-start custom-hover">
                  <FaXTwitter size={25} />
                </span>
              </li>
              <li>
                <a href="#" className="nav-link p-0 text-muted text-start">
                  <span className="p-3 text-start custom-hover">
                    <FaInstagram size={25} />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link p-0 text-muted text-start">
                  <span className="text-start p-3 custom-hover">
                    <FaFacebook size={25} />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;


/*
  <div className="col mb-3">
   
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <a href="#" className="nav-link p-0 text-muted">
          <FaXTwitter size={25} />
        </a>
      </li>
      <li className="nav-item mb-2">
        <a href="#" className="nav-link p-0 text-muted">
          <FaInstagram size={25} />
        </a>
      </li>
      <li className="nav-item mb-2">
        <a href="#" className="nav-link p-0 text-muted">
          <FaFacebook size={25} />
        </a>
      </li>
    </ul>
  </div>;
*/
