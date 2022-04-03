import { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const TableT = ({columns, data, caption, handleShowUpdate, handleShowDelete , handleShowCreate }) => {
  const [tableData, setTableData] = useState(data);
  
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  return (
    <div>
      <table className="table">
        <caption>
            {caption}s Table
        </caption>
        <TableHead {...{ columns, handleSorting, handleShowCreate , caption }} />
        <TableBody {...{ columns, tableData, handleShowDelete, handleShowUpdate }} />
      </table>
    </div>
  );
};

export default TableT;