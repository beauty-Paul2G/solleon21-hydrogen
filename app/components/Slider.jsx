import { useEffect, useState } from "react"

export function Slider({imageList, type}){
    const [focusedSlide, setFocusedSlide] = useState(0)
    const prevSlide = () => { return focusedSlide !== 0 ?  focusedSlide - 1 : imageList.length - 1 }
    const nextSlide = () => { return focusedSlide !== imageList.length - 1 ? focusedSlide + 1 : 0 }

    function handleChangeSlide(e){
        if(`slide${prevSlide()}` === e.target.id){
            setFocusedSlide( prevSlide )
        } else {
            setFocusedSlide( nextSlide )
        }
    }

    useEffect(() => {
        const slides = Array.from(document.getElementsByClassName(`${type}-slide`));

        slides.map((slide, i) => {
            slide.classList.remove(`${type}-focused-slide`, `${type}-previous-slide`, `${type}-next-slide`, `${type}-non-visible-slide`)
            if( i === focusedSlide ){
                slide.classList.add(`${type}-focused-slide`)
            } else if ( i === prevSlide() ){
                slide.classList.add(`${type}-previous-slide`)
            } else if ( i === nextSlide() ){
                slide.classList.add(`${type}-next-slide`)
            } else {
                slide.classList.add(`${type}-non-visible-slide`)
            }
        })
    })

    return (
        <div className={`flex w-full ${type}-slider`} style={{perspective: "1800px"}}>
            {imageList.map((image, i) => 
                <img src={image} id={`slide${i}`} onClick={handleChangeSlide} className={`${type}-slide`} key={i}/>
            )}
        </div>
    )
}