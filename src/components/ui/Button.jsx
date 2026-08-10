const Button = ({ fn, elementIcon, content, className }) => {
    return ( 
        <div className="Btn">
            <button
              onClick={fn}
              className={ `cursor-pointer ` + className}
            >
               {content}
               {elementIcon}
            </button>
        </div>
     );
}
 
export default Button;