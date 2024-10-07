"use client"

import { getTranslations } from '@/utils/getTranslations';
import { useSelector } from 'react-redux';

const PricesPage = () => {
    const { lang } = useSelector((state) => state.langSlice);
    const t = getTranslations(lang ? lang : "en");
    
  return (
    <section className='flex items-center justify-center'>{t["coming soon - Prices"]}</section>
  )
}

export default PricesPage