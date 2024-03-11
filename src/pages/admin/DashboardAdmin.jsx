import { Table, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const DashboardAdmin = () => {
  return (
    <div className="col-10 offset-1 mt-4">
      <div className="d-flex mb-2">
        <h5 className="mt-2 fw-bold text-black col-4">Status Pembayaran</h5>
        <div className="col-8 text-end">
          <Button className="tambah me-2 fw-semibold">
            <FaPlus className="me-2" />
            Tambah Hospitals
          </Button>
          <Button className="filter me-2 ms-2 fw-semibold">
            <FaFilter className="me-2" />
            Filter
          </Button>
          <FaSearch className="logo-search fs-3 ms-2" />
        </div>
      </div>
      <div className="table-admin overflow-auto">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dokter</th>
              <th>Rumah Sakit</th>
              <th>Status</th>
              <th>Metode Pembayaran</th>
              <th>Tanggal Bayar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
            <tr>
              <td>kevinarsn12_</td>
              <td>Dr. Siska Nindia Sari</td>
              <td>RS. Aminah Blitar</td>
              <td>Sudah Bayar</td>
              <td>Credit Card</td>
              <td>2 Sep 2023, at 2:00 AM</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardAdmin;
