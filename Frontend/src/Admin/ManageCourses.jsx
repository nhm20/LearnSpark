import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "./Components/FilterBar";
import UnitsTable from "./Components/UnitsTable";
import UnitForm from "./UnitForm";

const ManageCourses = () => {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    classLevel: "",
    subject: "",
    price: 0,
    timeLimit: 0,
    image: "",
  });
  const [editUnitId, setEditUnitId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalUnits, setTotalUnits] = useState(0);

  const fetchUnits = async (page = 1) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER_URL
        }/api/units?page=${page}&limit=${itemsPerPage}`
      );
      const unitsData = Array.isArray(res.data.units) ? res.data.units : [];
      setUnits(unitsData);
      setFilteredUnits(unitsData);
      setTotalUnits(res.data.pagination?.totalUnits || 0);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    setFilteredUnits(sortUnits(units));
  }, [units, sortConfig]);

  const sortUnits = (unitsToSort) => {
    if (!sortConfig.key) return unitsToSort;

    return [...unitsToSort].sort((a, b) => {
      if (["price", "timeLimit"].includes(sortConfig.key)) {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      }

      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const saveUnit = async (data) => {
    try {
      setSaving(true);
      if (editUnitId) {
        await axios.put(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${editUnitId}`,
          data
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units`,
          data
        );
      }

      await fetchUnits(currentPage);
      setShowForm(false);
    } catch (error) {
      return;
    } finally {
      setSaving(false);
    }
  };

  const deleteUnit = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${id}`
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchUnits(currentPage);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentPage]);

  const handleRowClick = (unit) => {
    setFormData(unit);
    setEditUnitId(unit._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUnit(id);
      if (filteredUnits.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchUnits(currentPage);
      }
    } catch (error) {
      return;
    }
  };

  const handleSearch = (query) => {
    if (!query) {
      fetchUnits(currentPage);
      return;
    }
    const filtered = units.filter(
      (unit) =>
        unit.name.toLowerCase().includes(query.toLowerCase()) ||
        unit.classLevel.toLowerCase().includes(query.toLowerCase()) ||
        unit.subject.toLowerCase().includes(query.toLowerCase()) ||
        unit.price.toString().includes(query) ||
        unit.timeLimit.toString().includes(query)
    );
    setFilteredUnits(sortUnits(filtered));
  };

  const handleSortChange = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUnit(formData);
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      classLevel: "",
      subject: "",
      price: 0,
      timeLimit: 0,
      image: "",
    });
    setEditUnitId(null);
    setShowForm(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5">
      <div className="max-w-6xl mx-auto bg-black p-6">
        <h2 className="text-2xl font-medium mb-4 text-white">Manage Courses</h2>

        <FilterBar
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          sortConfig={sortConfig}
          onAddNew={handleAddNew}
        />

        {showForm && (
          <div className="p-6 mb-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_#000000_50%,_#0C014D_99%)]">
            <UnitForm
              headingName={editUnitId ? "Edit Unit" : "Add New Unit"}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              editUnitId={editUnitId}
              setFormData={setFormData}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <UnitsTable
          units={filteredUnits}
          onRowClick={handleRowClick}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={Math.ceil(totalUnits / itemsPerPage)}
          onPageChange={handlePageChange}
          totalItems={totalUnits}
          itemsPerPage={itemsPerPage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ManageCourses;
