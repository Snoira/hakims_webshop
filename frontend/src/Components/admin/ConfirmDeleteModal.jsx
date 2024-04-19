

function ConfirmDeleteModal({ deleteProduct, product, setQuestionDelete }) {
    return (
        <div className="modal" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Är du säker på att du vill radera {product}?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Produkten och all dess information kommer försvinna</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={deleteProduct}>Radera Produkt</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal