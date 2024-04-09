

const HeroSection = () => {

    return (
        <div className="container col-xxl-8 px-4 py-5"> 
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5 hero-section-container"> 
        <div className="col-10 col-sm-8 col-lg-6">
        <img src="../Styles/img/heroPicture.jpg" className="d-block mx-lg-auto img-fluid" alt="Hero-Picture" width="700" height="500" loading="lazy">
      </img>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Smakfullt urval, livfulla upplevelser, matglädje</h1>
        <p className="lead">Utforska vårt smakrika sortiment online! Skapa och anpassa din matupplevelse smidigt med vårt breda utbud av färska råvaror och delikatesser. Välkommen till din nya digitala matdestination!</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        </div>
      </div>
        </div>
        </div>
    )
}

export default HeroSection;