"use client"

// we must check on the validation, but i do not receive any requery

import SearchIcon from '@/shared/svgs/SearchIcon';
import { changeTrackerPopOverState } from '@/store/Slices/trackerPopOverSlice';
import { getTranslations } from '@/utils/getTranslations';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const InputComponent = ({setShowSideMenu}) => {
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const trackingNumber = pathParts[3];
  const { lang } = useSelector((state) => state.langSlice);
  const t = getTranslations(lang ? lang : "en");

  const handleClickOnSearch = () => {
    const inputValue = inputRef.current.value;
    if(trackingNumber === inputValue) {
      toast(t.sameCode);
      return;
    }
    dispatch(changeTrackerPopOverState(false));
    setShowSideMenu(false);
    router.push(`/shipments/track/${inputValue.trim()}?lang=${lang}`);
  };

  const handleOnKeyDown = (e) => {
    const inputValue = inputRef.current.value;
    if(e.key === "Enter") {
      if(trackingNumber === inputValue) {
        toast(t.sameCode);
        return;
      }
      dispatch(changeTrackerPopOverState(false));
      setShowSideMenu(false);
      router.push(`/shipments/track/${inputValue.trim()}?lang=${lang}`);
    }
  };


  return (
    <div className='flex justify-center border-1 border-[var(--gray-border-color)] rounded-md overflow-hidden'>
      <input onKeyDown={handleOnKeyDown} ref={inputRef} maxLength={8} minLength={8} placeholder={`${t.track}`} type="text" className={`flex-grow-1 outline-none border-none p-[6px] text-[var(--gray-text-color)]`} />
      <button onClick={handleClickOnSearch} className='w-[40px] bg-[var(--red-text-color)] flex justify-center items-center'>
        <SearchIcon />
      </button>
    </div>
  )
}

export default InputComponent