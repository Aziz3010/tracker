import { useSelector } from "react-redux";
import InputComponent from "../InputComponent/InputComponent"
import { getTranslations } from "@/utils/getTranslations";

const ShippingPopover = ({setShowSideMenu}) => {
  const { lang } = useSelector((state) => state.langSlice);
  const t = getTranslations(lang ? lang : "en");

  return (
    <div className="flex flex-col justify-start items-start gap-[8px] absolute bg-[var(--background)] border-1 border-[var(--gray-border-color)] rounded-md p-[16px] top-[40px] w-fit">
      <h1 className="text-gray text-small-size text-small-weight text-nowrap">{t.track}</h1>
      <InputComponent setShowSideMenu={setShowSideMenu} />
    </div>
  )
}

export default ShippingPopover