import { useState } from "react"
import { Header } from "../Header"
import { MainComic } from "../MainComic"

function Comic() {

  const [isLoadingComic, setIsLoadingComic] = useState(false)
  const [comic, setComic] = useState()

  return (
    <div className="relative w-full min-h-screen bg-darkGrey text-white">
      <Header />
      <MainComic isLoadingComic={isLoadingComic} setIsLoadingComic={setIsLoadingComic} comic={comic} setComic={setComic} />
    </div>
  )
}

export default Comic
