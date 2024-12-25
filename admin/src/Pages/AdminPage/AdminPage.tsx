import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Aside/Aside';
import Header from '../../Components/Header/Header';
import './AdminPage.scss';

const AdminPage = () => {
  return (
    <div className='container'>
      <div className="header">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage