import LinkComponent from '../LinkComponent/LinkComponent'

const RowList = ({ arrayOfData }) => {
    return (
        arrayOfData?.map((ele, _) => (
            <li key={ele?.label}>
                <LinkComponent
                    label={ele?.label}
                    hrefLink={ele?.path}
                    type={ele?.type}
                    actionName={ele?.type === "btn" ? ele?.actionName : ""}
                    isLangBtn={ele?.type === "btn" && ele?.label === "eng"}
                />
            </li>
        ))
    )
}

export default RowList