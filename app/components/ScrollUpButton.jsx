export function ScrollUpButton() {
    function handleScrollUp(){
        window.scrollTo(0, 0);
    }

    return (
        <div className={`fixed bottom-4 right-4 z-101 flex justify-center items-center w-16 h-16 bg-black rounded-full drop-shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1`} onClick={handleScrollUp}>
            <i className={`bi bi-caret-up`} style={{fontSize: "2rem", color: "white", paddingBottom: "0.25rem"}}></i>
        </div>
    )
}