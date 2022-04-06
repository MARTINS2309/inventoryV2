import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TableBody = ({ tableData, columns , handleShowUpdate, handleShowDelete }) => {
  return (
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? data[accessor] : "——";
                return <td key={accessor}>{tData}</td>;
              })}
              <td>
                <button className="btn btn-primary" onClick={() => handleShowUpdate(data)} ><FontAwesomeIcon icon={faEdit}/></button>
                <button className="btn btn-danger" onClick={() => handleShowDelete(data)}><FontAwesomeIcon icon={faTrashAlt}/></button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

export default TableBody