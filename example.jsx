const renderTable = () => {
  const uniqueDiseases = [...new Set(aturan.map((item) => item.diseasesId))];
  const totalPages = Math.ceil(aturan.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = aturan.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="table-admin overflow-auto">
        <Table>
          <thead>
            <tr>
              <th className="col-5">Nama Penyakit</th>
              <th className="col-5">Nama Gejala</th>
              <th className="col-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {uniqueDiseases.map((diseaseId) =>
              aturan
                .filter((item) => item.diseasesId === diseaseId)
                .map((item, index) => (
                  <tr key={`${diseaseId}-${index}`}>
                    {index === 0 ? (
                      <td
                        rowSpan={
                          aturan.filter((i) => i.diseasesId === diseaseId)
                            .length
                        }
                      >
                        {item.diseases.name}
                      </td>
                    ) : null}
                    <td>{item.symptom.name}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          className="update d-flex justify-content-center align-items-center me-1"
                          onClick={() => handleUpdateClick(item.id)}
                        >
                          Ubah
                        </Button>
                        <Button
                          className="delete d-flex justify-content-center align-items-center ms-1"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </Table>
      </div>
      <div className="pagination mt-3 d-flex justify-content-end">
        <Button
          className="me-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FaAnglesLeft />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className="ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaAnglesRight />
        </Button>
      </div>
    </div>
  );
};
