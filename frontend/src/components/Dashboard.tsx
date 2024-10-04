import PageTitle from "./PageTitle";

function Dashboard() {
  return (
    <div className="">
      <PageTitle title="Dashboard" />
      <div className="w-full h-full flex justify-center items-center">
        <span className="mt-10">Welcome Admin Panel</span>
      </div>
    </div>
  );
}

export default Dashboard;
