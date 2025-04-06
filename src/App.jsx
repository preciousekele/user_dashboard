import { Route, Routes } from "react-router-dom"
import OverviewPage from "./pages/Overview"
import ProductsPage from "./pages/RecordsPage"
import Sidebar  from './components/common/Sidebar'
import UsersPage from "./pages/UsersPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import SettingsPages from "./pages/SettingsPages"
import AddRecordForm from "./components/cases/AddRecordForm"
import EditRecordForm from "./components/cases/EditRecordForm"
function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
  
    {/* bg1 */}
    <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br"/>
    <div className="absolute inset-0" />
    </div>
  
    {/* above the route because it should be seen on all pages */}

    <Sidebar />
    <Routes>
      <Route index element={<OverviewPage />} />
      <Route path="/records" element={<ProductsPage />} />
      <Route path="/users" element={<UsersPage />} />
      {/* <Route path="/orders" element={<OrdersPage />} /> */}
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPages />} />
      <Route path="/add-record" element={<AddRecordForm />} />
      <Route path="/edit-record/:id" element={<EditRecordForm />} />
    </Routes>
    </div>
  )
}

export default App
