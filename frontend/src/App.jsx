import { useState } from "react"
import { CircularProgress } from "./CircularProgress"
import { Header } from "./Header"
import { MainContent } from "./MainContent"
import { Navigation } from "./Navigation"

function App() {

  const [isLoadingComics, setIsLoadingComics] = useState(false)
  const [page, setPage] = useState(0)
  const [comics, setComics] = useState([])

  return (
    <div className="relative w-full min-h-screen bg-darkGrey text-white">
      <Header />
      <MainContent isLoadingComics={isLoadingComics} setIsLoadingComics={setIsLoadingComics} comics={comics} setComics={setComics} page={page} />
      <Navigation isLoadingComics={isLoadingComics} page={page} setPage={setPage} />
    </div>
  )
}

export default App
