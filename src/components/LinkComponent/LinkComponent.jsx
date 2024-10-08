"use client";

import { changeLanguage } from "@/store/Slices/langSlice";
import { changeTrackerPopOverState } from "@/store/Slices/trackerPopOverSlice";
import { getTranslations } from "@/utils/getTranslations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ShippingPopover from "../ShippingPopover/ShippingPopover";

const LinkComponent = ({ label, hrefLink, type, actionName, isLangBtn }) => {
    const pathName = usePathname();
    const { lang } = useSelector((state) => state.langSlice);
    const { trackerPopOverState } = useSelector((state) => state.trackerPopOverSlice);
    const t = getTranslations(lang ? lang : "en");
    const dispatch = useDispatch();

    const handleClickOnButton = () => {
        // open popover for shipping code =====> maybe we need to open this popover from any btn outside the navbar so i create it by redux toolkit
        if (actionName === "trackerPopover") {
            console.log(!trackerPopOverState, "trackerPopover");
            dispatch(changeTrackerPopOverState(!trackerPopOverState));
            return;
        }

        // changeLanguage
        dispatch(changeLanguage(lang === "en" ? "ar" : "en"));
    };

    return (
        (() => {
            if(type === "link") {
                return (<Link href={`${hrefLink}?lang=${lang}`} className={`w-full block text-large-size text-large-weight capitalize p-[4px] rounded-[8px] border-transparent ${pathName === hrefLink ? "text-red" : ""}`}>{t[label]}</Link>)
            }
            if(type !== "link" && label === "track shipment") {
                return (
                    <div className="relative w-full">
                        <button onClick={handleClickOnButton} className={`w-full text-large-size text-large-weight capitalize p-[4px] rounded-[8px] border-[1px] border-transparent ${pathName === hrefLink ? "text-red" : ""} ${isLangBtn ? "text-red" : ""} ${label === "track shipment" && trackerPopOverState ? "!border-[var(--gray-border-color)]" : ""}`}>{t[label]}</button>
                        {trackerPopOverState ? <ShippingPopover /> : null}
                    </div>
                )
            }

            return (<button onClick={handleClickOnButton} className={`w-full text-large-size text-large-weight capitalize p-[4px] rounded-[8px] border-[1px] border-transparent ${pathName === hrefLink ? "text-red" : ""} ${isLangBtn ? "text-red" : ""} ${label === "track shipment" && trackerPopOverState ? "!border-[var(--gray-border-color)]" : ""}`}>{t[label]}</button>)
        })()      
    )
}

export default LinkComponent