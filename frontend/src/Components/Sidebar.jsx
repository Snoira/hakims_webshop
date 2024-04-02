import React from "react";
// import { useState } from React;

const Sidebar = () => {
  // const [categories, setCategories] = useState([]);


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100%",
        overflow: "auto",

      
      }}
    >
      <nav>
        <ul>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <a href="/nyinkommet">Nyinkommet</a>
            </li>
            <li>
              <a href="/sistachansen">Sista chansen</a>
            </li>
            <li>
              <a href="/populart">Populärt just nu</a>
            </li>
            <li>
              <a href="/rabatter">Gigantiska rabatter</a>
            </li>
            <li>
              <a href="/deal">Dagens deal</a>
            </li>
            <li>
              <a href="/aktuellt">Aktuellt just nu</a>
            </li>
          </ul>
        </ul>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <h3>KATEGORIER</h3>
          <li>
            <a href="/skafferi">Skafferi</a>
          </li>
          <li>
            <a href="/storpack">Storpack</a>
          </li>
          <li>
            <a href="/drycker">Drycker</a>
          </li>
          <li>
            <a href="/snacks-godis">Snacks & godis</a>
          </li>
          <li>
            <a href="/traning-vikt">Träning & vikt</a>
          </li>
          <li>
            <a href="/hygien-apotek">Hygien & apotek</a>
          </li>
          <li>
            <a href="/brod-kex-kakor">Bröd, kex & kakor</a>
          </li>
          <li>
            <a href="/barn-baby">barn & baby</a>
          </li>
          <li>
            <a href="/hem-stad">hem & städ</a>
          </li>
          <li>
            <a href="/husdjur">Husdjur</a>
          </li>
          <li>
            <a href="/eko">Eko</a>
          </li>
          <li>
            <a href="/veganskt">Veganskt</a>
          </li>
          <li>
            <a href="/glutenfri-mat">Glutenfri mat</a>
          </li>
          <li>
            <a href="/fyndhorna">Fyndhörna</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
