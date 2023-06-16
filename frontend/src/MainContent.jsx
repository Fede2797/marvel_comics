import { useEffect } from "react"
import { CircularProgress } from "./CircularProgress"
import { ComicContainer } from "./ComicContainer"

export const MainContent = ({ isLoadingComics, setIsLoadingComics, comics, setComics, page }) => {

    const setLoading = () => setIsLoadingComics( true );
    const setLoaded  = () => setIsLoadingComics( false );

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading();
            const response = await fetch( process.env.REQ_URL, 
              { 
                method: "GET",
                headers: { "page": page } 
              }
            );
            const jsonData = await response.json();
            setLoaded();
            setComics(jsonData);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
    }, [ page ]);

    return (
        <>
            {
                isLoadingComics 
                    ? <div className="w-10 h-10 mx-auto mt-10"><CircularProgress /></div>
                    : <ComicContainer comics={comics} />
            }   
        </>
    )
}
