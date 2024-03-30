<Form.Group className="mb-3" control="days">
  <Form.Label className="fw-semibold">Hari</Form.Label>
  <Form.Control
    size="lg"
    type="text"
    name="days"
    value={formData.days}
    onChange={handleFormChange}
    placeholder="Text..."
    required
  />
</Form.Group>;

<Form.Group className="mb-3" controlId="picture">
  <Form.Label className="fw-semibold">Picture</Form.Label>
  <Form.Control
    size="lg"
    type="file"
    name="picture"
    onChange={handleUpdateFormChange}
  />
</Form.Group>;
