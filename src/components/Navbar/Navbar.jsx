import { leftNavbarMenuList, middleNavbarMenuList } from '@/constants/ConstantValues'
import MainLogo from '@/shared/svgs/MainLogo'
import LinkComponent from '../LinkComponent/LinkComponent'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Navbar = () => {
    return (

        <nav className={`w-full custom-padding-x custom-padding-y`}>
            <Container>
                <Row>
                    {/* Logo */}
                    <Col className='!w-fit !flex-grow-0 flex items-center justify-center'>
                        <MainLogo lang="en" />
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