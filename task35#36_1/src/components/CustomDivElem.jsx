const CustomDivElem  = ({style, onClick, id}) => {
    return (
        <div onClick={onClick} className="CustomDivElem" style={style} data-id={id}></div>
    )
}

export default CustomDivElem;