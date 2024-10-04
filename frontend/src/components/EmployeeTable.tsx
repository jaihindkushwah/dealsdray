import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useEmployee, { IEmployeeTypeProps } from "../hooks/useEmployee";
import { useEffect, useState } from "react";
import ImageComponent from "./EmployeeImage";

function EmployeeTable() {
  const [employees, setEmployees] = useState<IEmployeeTypeProps[]>([]);
  const [searchedItems, setSearchedItems] = useState<IEmployeeTypeProps[]>([]);
  const { getAllEmployee, deleteEmployeeById } = useEmployee();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const editHandler = (id: string) => {
    navigate("/create?id=" + id);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const newProfile = employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.mobile.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.designation
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        employee.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.course.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setSearchedItems(newProfile);
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const deleteHandler = (id: string) => {
    deleteEmployeeById(id)
      .then(() => {
        alert("Successfully deleted");
        const newProfile = employees.filter((employee) => employee._id !== id);
        setEmployees(newProfile);
        setSearchedItems(newProfile);
      })
      .catch(() => {
        alert("failed to delete");
      });
  };
  useEffect(() => {
    getAllEmployee().then((data) => {
      setEmployees(data);
      setSearchedItems(data);
    });
  }, [getAllEmployee]);

  return (
    <table className="w-full h-fit border-collapse border-gray-300">
      <thead className="bg-blue-200 text-sm font-light text-gray-700">
        <tr className="bg-white">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>
            <span className="text-sm font-normal">
              Total Count: {searchedItems.length}
            </span>
          </th>
          <th></th>
          <th
            colSpan={1}
            className="text-xs font-normal  text-gray-900 text-left border-none border-blue-200"
          >
            <Link
              to={"/create"}
              className="flex h-full font-normal text-sm p-0.5 justify-center items-center  bg-[#1ebd39] hover:bg-[#0dcb06] text-white dark:bg-[#23bd1e] dark:hover:bg-[#0bb805]"
            >
              Create Employee
            </Link>
          </th>
        </tr>
        <tr className="border border-gray-300">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>
            <span className="text-sm font-normal">Search</span>
          </th>
          <th
            colSpan={3}
            className="text-sm font-normal  text-gray-900 text-left border border-gray-300"
          >
            <input
              type="text"
              placeholder="Enter Search Keyword"
              className="w-full text-center"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </th>
        </tr>
        <tr>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Unique Id
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Image
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Name
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Email
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Mobile No
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Designation
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Gender
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Course
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-left border border-gray-300">
            Create Date
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-center border border-gray-300">
            Action
          </th>
          <th className="text-sm font-normal px-1 text-gray-900 text-center border border-gray-300 w-14"></th>
        </tr>
      </thead>
      <tbody>
        {searchedItems
          ?.slice((currentPage - 1) * 5, currentPage * 5)
          .map((item, i) => (
            <tr key={item._id} className="text-[14px]">
              <td className="border border-gray-300 align-center px-1 text-right">
                {item.uuid}
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                <ImageComponent employeeId={item.imageId} />
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                {item.name}
              </td>
              <td className="border border-gray-300 text-ellipsis min-w-[30px] align-center px-1 text-left">
                {item.email}
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                {item.mobile}
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                {item.designation}
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                {item.gender}
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                {item.course}
              </td>
              <td className="border border-gray-300 align-center px-1 text-left">
                {new Date(item.createDate).getDate() +
                  "-" +
                  (new Date(item.createDate).getMonth() + 1) +
                  "-" +
                  new Date(item.createDate).getFullYear()}
              </td>
              <td className="border border-gray-300 align-center px-1 text-right">
                <div className="flex space-x-2 justify-end gap-2 py-2 pr-3 text-sm">
                  <Button
                    onClick={() => {
                      editHandler(item._id + "");
                    }}
                    variant={"outline"}
                    className="w-[60px] h-full font-normal text-xs  mt-2 py-1 bg-[#1ebd39] hover:bg-[#0dcb06] text-white dark:bg-[#23bd1e] dark:hover:bg-[#0bb805]"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteHandler(item._id + "");
                    }}
                    variant={"outline"}
                    className="w-[60px] h-full font-normal text-xs mt-2 py-1  bg-red-600/80 hover:bg-red-600
                  text-white
                  "
                  >
                    Delete
                  </Button>
                </div>
              </td>
              <td className="border border-gray-300 align-center px-1 text-left"></td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={10} className="text-center">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={searchedItems?.length}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default EmployeeTable;

const Pagination = ({
  currentPage,
  setCurrentPage,
  total,
}: {
  currentPage: number;
  setCurrentPage: any;
  total: number;
}) => {
  return (
    <div className="flex justify-end gap-1 items-center mt-5">
      <Button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
        className="bg-gray-300 h-7 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (currentPage < total) {
            setCurrentPage(currentPage + 1);
          }
        }}
        className="bg-gray-300 h-7 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Next
      </Button>
    </div>
  );
};
