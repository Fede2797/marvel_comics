import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { SingleComicContainer } from "./SingleComicContainer";
import { CircularProgress } from "./CircularProgress";

export const MainComic = ({ isLoadingComic, setIsLoadingComic, comic, setComic }) => {

    const { id } = useParams();
    console.log(id);

    const setLoading = () => setIsLoadingComic( true );
    const setLoaded  = () => setIsLoadingComic( false );

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("Request begins");
            setLoading();
            const response = await fetch(`http://localhost:3000/api/${id}`);
            const jsonData = await response.json();
            setComic(jsonData);
            console.log({jsonData});
            setLoaded();
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <>
            {
                isLoadingComic 
                    ? <div className="w-10 h-10 mx-auto mt-10"><CircularProgress /></div>
                    : <SingleComicContainer comic={comic} />
            }   
        </>
    )
}
