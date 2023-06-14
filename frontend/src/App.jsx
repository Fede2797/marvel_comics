import { Route, Routes } from "react-router-dom"
import Comics from "./pages/Comics"
import Comic from "./pages/Comic"

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Comics /> } />
      <Route path="/:id" element={ <Comic /> } />
    </Routes>
  )
}
