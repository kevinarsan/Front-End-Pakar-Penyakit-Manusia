<Modal show={show} onHide={handleClose} size="lg">
  <Modal.Header closeButton> </Modal.Header>{" "}
  <Modal.Title className="fw-semibold text-center">
    Tambah {dataType}{" "}
  </Modal.Title>{" "}
  <Modal.Body>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-9">
          <Form onSubmit={handleFormSubmit}>
            {" "}
            {renderFormFields()}{" "}
            <Button className="save mb-4 fw-bold" type="submit">
              Simpan{" "}
            </Button>{" "}
          </Form>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
  </Modal.Body>{" "}
</Modal>;
