"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LinkComponent = ({ label, hrefLink, type, actionName, isLangBtn }) => {
    const pathName = usePathname();

    console.log(pathName, 'pathName');
    

    const handleClickOnButton = () => {
        if (actionName === "trackerPopover") {
            console.log("trackerPopover");
            return;
        }

        // changeLanguage
        console.log("changeLanguage");
    };

    return (
        type === "link" ?
            <Link href={hrefLink} className={`text-large-size text-large-weight capitalize ${pathName === hrefLink ? "text-red" : ""}`}>{label}</Link>
            :
            <button onClick={handleClickOnButton} className={`text-large-size text-large-weight capitalize ${pathName === hrefLink ? "text-red" : ""} ${isLangBtn ? "text-red" : ""}`}>{label}</button>
    )
}

export default LinkComponent