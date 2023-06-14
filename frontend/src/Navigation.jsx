import React from 'react'

export const Navigation = ({ isLoadingComics, page, setPage }) => {

    const nextPage = () => setPage( page++ )
    const previousPage = () => {
        if ( page === 0 ) return;
        setPage( page-- )
    }

    return (
        <div className={`${ isLoadingComics ? 'hidden' : 'sticky' } bottom-0 h-[50px] w-full flex gap-3 justify-center items-center bg-darkGrey border-[#8b8b8b] border-t-[1px] z-50`}>
            <button onClick={ nextPage }><img src="left.svg" alt="" /></button>
            <span>1</span>
            <button onClick={ previousPage }><img src="right.svg" alt="" /></button>
        </div>
    )
}
