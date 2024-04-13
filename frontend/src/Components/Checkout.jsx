const CheckOut = () => {

   
    return (
        <> 
        <div className="py-5 text-center checkout-container">
           <h2>Kassa</h2>
           <p className="lead"> Fyll i och spara dina kunduppgifter. Därefter kan du lägga din beställning!</p>
        </div>
        <div className="row g-5 form-container">
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center md-3">
                    <span className="text-primary">Varukorg</span>
                </h4>
                <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Produkt namn</h6>
              <small className="text-body-secondary">Kort beskrivning</small>
            </div>
            <span className="text-body-secondary">12kr</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Produkt namn</h6>
              <small className="text-body-secondary">Kort beskrivning</small>
            </div>
            <span className="text-body-secondary">80kr</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Produkt namn</h6>
              <small className="text-body-secondary">Kort beskrivning</small>
            </div>
            <span className="text-body-secondary">5kr</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Totalt (kronor)</span>
            <strong>200kr</strong>
          </li>
        </ul>
        <div>
            <button className="w-100 btn btn-primary btn-lg" type="submit">Lägg order</button>
        </div>
        </div>

        {/* formulär för kundinfo */}
        <div className="col-md-7 col-lg-8">
            <h4 className="md-3">Din adress</h4>
            <form className="needs-validation">
                <div className="row g-3">
                    <div className="col-sm-6">
                    <label for="firstName" className="form-label">First name</label>
                    <input className="form-control" ></input>
                    </div>
                    <div className="col-sm-6">
                    <label for="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" placeholder="you@example.com"/>
                    </div>
                    <div class="col-12">
              <label for="address" className="form-label">Adress</label>
              <input type="text" className="form-control" id="address" placeholder=""  />
            </div>
            <div className="col-md-3">
              <label for="zip" className="form-label">Postnummer</label>
              <input type="text" className="form-control" id="zip" placeholder="" required="" />
              <div className="invalid-feedback">
                Zip code required.
              </div>
            </div>
            <div className="col-sm-9">
              <label for="address2" className="form-label">City</label>
              <input type="text" className="form-control" id="address2"  />
            </div>
            <button className="w-100 btn btn-primary btn-lg" type="submit">Spara kundinfo</button>
                </div>

            </form>

        </div>

           

        </div>
        </>
    )
}

export default CheckOut;