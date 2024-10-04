import EmployeeTable from "./EmployeeTable";
import PageTitle from "./PageTitle";

function EmployeeList() {
  return (
    <div className="flex flex-col">
      <PageTitle title="EmployeeList" />
      <div className="px-2 md:px-6 lg:px-10 ">
        <EmployeeTable />
      </div>
    </div>
  );
}

export default EmployeeList;
