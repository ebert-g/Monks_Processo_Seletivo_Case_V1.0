import React, { useState, useEffect } from "react";

function MetricsDashboard({ user }) {
  const [metrics, setMetrics] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });
  const [filters, setFilters] = useState({ start_date: "", end_date: "" });
  const [sorting, setSorting] = useState({ sort_by: "date", order: "desc" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMetrics();
  }, [pagination.current_page, sorting]);

  const fetchMetrics = async (resetPage = false) => {
    setLoading(true);
    setError("");

    const currentPage = resetPage ? 1 : pagination.current_page;

    const params = new URLSearchParams({
      role: user.role,
      page: currentPage,
      size: 50,
      sort_by: sorting.sort_by,
      order: sorting.order,
    });

    if (filters.start_date) params.append("start_date", filters.start_date);
    if (filters.end_date) params.append("end_date", filters.end_date);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/metrics?${params.toString()}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Falha ao buscar dados");
      }
      const data = await response.json();
      setMetrics(data.data);
      setPagination({
        current_page: data.current_page,
        total_pages: data.total_pages,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleApplyFilters = () => {
    fetchMetrics(true);
  };

  const handleSort = (column) => {
    const newOrder =
      sorting.sort_by === column && sorting.order === "asc" ? "desc" : "asc";
    setSorting({ sort_by: column, order: newOrder });
  };

  const goToPage = (page) => {
    if (page > 0 && page <= pagination.total_pages) {
      setPagination({ ...pagination, current_page: page });
    }
  };

  const tableHeaders = metrics.length > 0 ? Object.keys(metrics[0]) : [];

  return (
    <div>
      <h2 className="mb-4">Dashboard de Métricas</h2>
      <p>
        &#128100; {user.username} (Permissão: {user.role})
      </p>

      <div className="card p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-auto">
            <label className="form-label">Data Início:</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              value={filters.start_date}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-auto">
            <label className="form-label">Data Fim:</label>
            <input
              type="date"
              name="end_date"
              className="form-control"
              value={filters.end_date}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-auto">
            <button onClick={handleApplyFilters} className="btn btn-primary">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="alert alert-danger">Erro: {error}</p>}

      {!loading && !error && (
        <>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header)}
                    style={{ cursor: "pointer" }}
                  >
                    {header.replace(/_/g, " ")}{" "}
                    {sorting.sort_by === header
                      ? sorting.order === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((row, index) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td key={header}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center align-items-center">
            <button
              onClick={() => goToPage(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="btn btn-secondary"
            >
              Anterior
            </button>
            <span className="mx-3">
              Página {pagination.current_page} de {pagination.total_pages}
            </span>
            <button
              onClick={() => goToPage(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.total_pages}
              className="btn btn-secondary"
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MetricsDashboard;
