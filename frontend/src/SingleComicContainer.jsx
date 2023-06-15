
export const SingleComicContainer = ({ comic }) => {

    let c = false;
    if ( comic ) {
        c = comic[0];
    }

    return (
        <article
            className='w-full max-w-[400px] mx-auto flex gap-3 cursor-pointer'
        >
            <figure className=" min-w-[130px] md:min-w-[160px]">
                <img
                    className={`${ c?.image === '' ? 'hidden' : 'block' } h-[200px] md:h-[250px]`}
                    alt=""
                    src={ c?.image }
                />
                <img
                    className={`${ c?.image === '' ? 'block' : 'hidden' } max-h-[200px] md:max-h-[250px] p-3 bg-[#5a5a5a]`}
                    alt=""
                    src="no-image.png"
                />
            </figure>
            <div className='mt-3 w-full flex flex-col [&>label]:font-bold [&>label]:cursor-pointer'>
                <label>Title</label>
                <span>{c?.title}</span>
                <label>Series</label>
                <span>{c?.series}</span>
                <label>Creators</label>
                <span>{c.creators?.toString()}</span>
                <label>Year of creation</label>
                <span>{c?.date}</span>
            </div>
        </article>
    )
}
