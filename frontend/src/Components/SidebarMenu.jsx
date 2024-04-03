import React from "react";

const Sidebar = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-flex flex-column  vh-100 top-0 ">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Nyinkommet</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Sista chansen</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Populärt just nu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Gigantiska rabatter</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Dagens deal</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Aktuellt just nu</a>
              </li>
            </ul>
            <ul className="nav flex-column">
              <h5>KATEGORIER</h5>
              <li className="nav-item">
                <a className="nav-link" href="#">Skafferi</a>
              </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Storpack</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Drycker</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Snacks & godis</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Träning & vikt</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Hygien & apotek</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Bröd, kex & kakor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">barn & baby</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">hem & städ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Husdjur</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Eko</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Veganskt</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Glutenfri mat</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Fyndhörna</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;