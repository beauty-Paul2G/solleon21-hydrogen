export function BannerNavButtons({imagesList, setFocusedSlide}) {
  return (
    <div className={`flex flex-row justify-center w-full relative z-50 h-0 bottom-8 text-white`}> 
      { 
        imagesList.map((image, i) => 
          <div key={i} />
        )
      }
    </div>
  )
}
