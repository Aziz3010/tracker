"use client";

import { changeLanguage } from "@/store/Slices/langSlice";
import { changeTrackerPopOverState } from "@/store/Slices/trackerPopOverSlice";
import { getTranslations } from "@/utils/getTranslations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const LinkComponent = ({ label, hrefLink, type, actionName, isLangBtn }) => {
    const pathName = usePathname();
    const { lang } = useSelector((state) => state.langSlice);
    const { trackerPopOverState } = useSelector((state) => state.trackerPopOverSlice);
    const t = getTranslations(lang ? lang : "en");
    const dispatch = useDispatch();

    const handleClickOnButton = () => {
        // open popover for shipping code
        if (actionName === "trackerPopover") {
            console.log(!trackerPopOverState, "trackerPopover");
            dispatch(changeTrackerPopOverState(!trackerPopOverState));
            return;
        }

        // changeLanguage
        dispatch(changeLanguage(lang === "en" ? "ar" : "en"));
    };

    return (
        type === "link" ?
            <Link href={`${hrefLink}?lang=${lang}`} className={`text-large-size text-large-weight capitalize p-[4px] rounded-[8px] border-transparent ${pathName === hrefLink ? "text-red" : ""}`}>{t[label]}</Link>
            :
            <button onClick={handleClickOnButton} className={`text-large-size text-large-weight capitalize p-[4px] rounded-[8px] border-[1px] border-transparent ${pathName === hrefLink ? "text-red" : ""} ${isLangBtn ? "text-red" : ""} ${label === "track shipment" && trackerPopOverState ? "!border-[var(--gray-border-color)]" : ""}`}>{t[label]}</button>
    )
}

export default LinkComponent