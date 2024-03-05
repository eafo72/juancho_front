"use client";

//el show y hide esta en js/main.js

const goTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}

export function BackToTopButton() {
  return (
    <div className="backtotop">
        <button className="scroll" onClick={() => goTop()}>
            <i className="far fa-arrow-up"></i>
        </button>
    </div>
  )
}


