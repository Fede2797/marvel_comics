import { useEffect } from "react";

export const MainComic = ({ isLoadingComics, setIsLoadingComics, comic, setComic }) => {

    const setLoading = () => setIsLoadingComics( true );
    const setLoaded  = () => setIsLoadingComics( false );

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading();
            const response = await fetch('http://localhost:3000/api', 
              { 
                method: "GET",
                headers: { "page": page } 
              }
            );
            const jsonData = await response.json();
            setLoaded();
            setComic(jsonData);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <>
            {
                isLoadingComics 
                    ? <div className="w-10 h-10 mx-auto mt-10"><CircularProgress /></div>
                    : <ComicContainer comic={comic} />
            }   
        </>
    )
}
