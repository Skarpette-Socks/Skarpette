import ActionButtons from "../../Components/ActionButtons/ActionButtons";
import Sidebar from "../../Components/Aside/Aside";
import Header from "../../Components/Header/Header";
import ProductTable from "../../Components/Table/ProductTable";

const MainPage = () => {
  return (
    <>
      <Header />
      <ActionButtons/>
      <Sidebar />
      <ProductTable />
    </>
  );
};

export default MainPage;
