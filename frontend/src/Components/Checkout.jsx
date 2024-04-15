const CheckOut = () => {

   
    return (
        <> 
        <div className="py-5 text-center">
           <h2>checkout form</h2>
           <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
        </div>
        <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center md-3">
                    <span className="text-primary">Varukorg</span>
                </h4>
                <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Produkt namn</h6>
              <small class="text-body-secondary">Kort beskrivning</small>
            </div>
            <span class="text-body-secondary">12kr</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Produkt namn</h6>
              <small class="text-body-secondary">Kort beskrivning</small>
            </div>
            <span class="text-body-secondary">80kr</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Produkt namn</h6>
              <small class="text-body-secondary">Kort beskrivning</small>
            </div>
            <span class="text-body-secondary">5kr</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Totalt (kronor)</span>
            <strong>200kr</strong>
          </li>
        </ul>

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
                        <input type="text" className="form-control"/>
                    </div>
                </div>

            </form>

        </div>

            </div>

        </div>
        </>
    )
}

export default CheckOut;