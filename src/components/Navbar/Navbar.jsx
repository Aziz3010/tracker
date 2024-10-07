"use client"

import { leftNavbarMenuList, middleNavbarMenuList } from '@/constants/ConstantValues'
import MainLogo from '@/shared/svgs/MainLogo'
import LinkComponent from '../LinkComponent/LinkComponent'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const { lang } = useSelector((state) => state.langSlice);
    const pathName = usePathname();
    const router = useRouter();

    // listening on lang from slice to change url and add query for lang=
    useEffect(()=>{
        if(lang) {
            router.push(`${pathName}?lang=${lang}`);
        }
    }, [lang]);

    return (

        <nav className={`w-full custom-padding-x custom-padding-y border-b-[1px] border-[var(--gray-border-color)]`}>
            <Container>
                <Row>
                    {/* Logo */}
                    <Col className='!w-fit !flex-grow-0 flex items-center justify-center'>
                        <Link href={`/?lang=${lang}`}>
                            <MainLogo lang={lang} />
                        </Link>
                    </Col>

                    {/* Middle List */}
                    <Col xs={6} className='flex-grow-1'>
                        <ul className="flex-grow-1 h-full justify-center">
                            {middleNavbarMenuList?.map((ele, _) => (
                                <li key={ele?.label}>
                                    <LinkComponent
                                        label={ele?.label}
                                        hrefLink={ele?.path}
                                        type={ele?.type}
                                        actionName={ele?.type === "btn" ? ele?.actionName : ""}
                                    />
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Left List */}
                    <Col>
                        <ul className='h-full'>
                            {leftNavbarMenuList?.map((ele, _) => (
                                <li key={ele?.label}>
                                    <LinkComponent
                                        label={ele?.label}
                                        hrefLink={ele?.path}
                                        type={ele?.type}
                                        actionName={ele?.type === "btn" ? ele?.actionName : ""}
                                        isLangBtn={ele?.type === "btn" && ele?.label === "eng"}
                                    />
                                </li>
                            ))}
                        </ul>
                    </Col>

                </Row>

            </Container>
        </nav>
    )
}

export default Navbar