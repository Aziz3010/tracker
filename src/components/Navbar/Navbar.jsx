"use client"

import { leftNavbarMenuList, middleNavbarMenuList } from '@/constants/ConstantValues'
import MainLogo from '@/shared/svgs/MainLogo'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import RowList from '../RowList/RowList';
import ColList from '../ColList/ColList';
import { getTranslations } from '@/utils/getTranslations';
import { IoClose } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
    const { lang } = useSelector((state) => state.langSlice);
    const pathName = usePathname();
    const router = useRouter();
    const t = getTranslations(lang ? lang : "en");
    const [showSideMenu, setShowSideMenu] = useState(false);

    const handleClickOnBurgerBtn = () => {
        setShowSideMenu(!showSideMenu);
    };

    // listening on lang from slice to change url and add query for lang=
    useEffect(() => {
        if (lang) {
            router.push(`${pathName}?lang=${lang}`);
        }
    }, [lang]);

    return (
        <nav className={`w-full custom-padding-x custom-padding-y border-b-[1px] border-[var(--gray-border-color)]`}>
            <Container>
                <Row className='justify-between'>
                    {/* Logo */}
                    <Col className='!w-fit !flex-grow-0 flex items-center justify-center'>
                        <Link href={`/?lang=${lang}`}>
                            <MainLogo lang={lang} />
                        </Link>
                    </Col>

                    {/* Middle List */}
                    <Col xs={6} className='flex-grow-1 hidden md:flex'>
                        <ul className="flex-grow-1 h-full justify-center">
                            <RowList arrayOfData={middleNavbarMenuList} setShowSideMenu={setShowSideMenu} />
                        </ul>
                    </Col>

                    {/* Left List */}
                    <Col className='hidden md:flex'>
                        <ul className='h-full'>
                            <RowList arrayOfData={leftNavbarMenuList} setShowSideMenu={setShowSideMenu} />
                        </ul>
                    </Col>

                    {/* Burger button */}
                    <Col className='w-fit flex-grow-0 flex md:hidden'>
                        <button className='h-full' onClick={handleClickOnBurgerBtn}><AiOutlineMenu /></button>
                    </Col>

                    {/* SideMenu for mobile */}
                    {showSideMenu && <Col className={`z-50 flex md:hidden bg-[var(--background)] border-[var(--gray-border-color)] h-full fixed top-0 ${lang === "en" ? "left-0 border-r-[1px]" : "right-0 border-l-[1px]"} w-[200px] py-[12px]`}>
                        <div className='h-full w-full relative'>
                            <button onClick={() => { setShowSideMenu(false) }} className={`text-x-small-size w-fit p-[4px] rounded absolute top-[4px] ${lang === "en" ? "left-[4px]" : "right-[4px]"}`}><IoClose /></button>

                            <ul className='h-full flex-col mt-[50px]'>
                                <ColList arrayOfData={[...middleNavbarMenuList, ...leftNavbarMenuList]} setShowSideMenu={setShowSideMenu} />
                            </ul>
                        </div>
                    </Col>}

                </Row>
            </Container>
        </nav>
    )
}

export default Navbar