// we must check on the validation, but i do not receive any requery

import SearchIcon from '@/shared/svgs/SearchIcon';
import { changeTrackerPopOverState } from '@/store/Slices/trackerPopOverSlice';
import { getTranslations } from '@/utils/getTranslations';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const InputComponent = () => {
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { lang } = useSelector((state) => state.langSlice);
  const t = getTranslations(lang ? lang : "en");

  const handleClickOnSearch = () => {
    const inputValue = inputRef.current.value;
    // if(inputValue.length === 8) {
      dispatch(changeTrackerPopOverState(false));
      router.push(`/shipments/track/${inputValue}?lang=${lang}`);
      // return;
    // }

    // toast(t.errorMesg);
  };

  return (
    <div className='flex justify-center border-1 border-[var(--gray-border-color)] rounded-md overflow-hidden'>
      <input ref={inputRef} maxLength={8} minLength={8} placeholder={`${t.track}`} type="text" className={`flex-grow-1 outline-none border-none p-[6px] text-[var(--gray-text-color)]`} />
      <button onClick={handleClickOnSearch} className='w-[40px] bg-[var(--red-text-color)] flex justify-center items-center'>
        <SearchIcon />
      </button>
    </div>
  )
}

export default InputComponent