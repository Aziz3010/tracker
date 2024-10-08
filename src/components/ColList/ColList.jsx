import LinkComponent from '../LinkComponent/LinkComponent'

const ColList = ({ arrayOfData, setShowSideMenu }) => {
    return (
        arrayOfData?.map((ele, _) => (
            <li key={ele?.label} className='w-full text-center' onClick={()=>{ele?.type !== "link" && ele?.label === "track shipment" ? null : setShowSideMenu(false)}}>
                <LinkComponent
                    label={ele?.label}
                    hrefLink={ele?.path}
                    type={ele?.type}
                    actionName={ele?.type === "btn" ? ele?.actionName : ""}
                    isLangBtn={ele?.type === "btn" && ele?.label === "eng"}
                    setShowSideMenu={setShowSideMenu}
                />
            </li>
        ))
    )
}

export default ColList