
export const ComicContainer = ({ comics }) => {

    // console.log(comics);

  return (
    <div className='w-full grid gap-4 mt-10 p-5 text-[12px] md:grid-cols-2 md:max-w-[900px] md:mx-auto xl:grid-cols-3 xl:max-w-[1250px]'>
        {
            comics.map( comic => (
                <article key={comic.id} className='w-full max-w-[400px] mx-auto flex gap-3'>
                    <figure className=" min-w-[130px] md:min-w-[160px]">
                        <img 
                            className={`${ comic.image === '' ? 'hidden' : 'block' } h-[200px] md:h-[250px]`} 
                            alt="" 
                            src={ comic.image } 
                        />
                        <img 
                            className={`${ comic.image === '' ? 'block' : 'hidden' } max-h-[200px] md:max-h-[250px] p-3 bg-[#5a5a5a]`} 
                            alt="" 
                            src="no-image.png"
                        />
                    </figure>
                    <div className='mt-3 w-full flex flex-col [&>label]:font-bold'>
                        <label>Title</label>
                        <span>{comic.title}</span>
                        <label>Series</label>
                        <span>{comic.series}</span>
                        <label>Creators</label>
                        <span>{comic.creators.toString()}</span>
                        <label>Year of creation</label>
                        <span>{comic.date}</span>
                    </div>
                </article>
            ))
        }
    </div>
  )
}
