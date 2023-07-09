import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddLeaveForm from "./pages/AddLeaveForm"
import ViewReport from "./pages/ViewReport"

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddLeaveForm />} />
          <Route path='/report' element={<ViewReport />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
