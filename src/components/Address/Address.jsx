import { getTranslations } from '@/utils/getTranslations';
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Image from 'next/image';

const Address = () => {
  const { lang } = useSelector((state) => state.langSlice);
  const t = getTranslations(lang ? lang : "en");

  return (
    <Container className='p-0'>
      <Row className='mb-[20px]'>
        <Col>
          <div className='w-full bg-[var(--gray-bg)] border-[1px] border-[var(--gray-border-color)] rounded-[8px] p-[16px]'>
            <h3 className='text-gray text-small-size text-small-weight'>{t.FakeAddress}</h3>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className='flex items-center bg-[var(--background)] border-[1px] border-[var(--gray-border-color)] rounded-[8px] p-[16px]'>
            <div className='flex-grow-[1]'>
              <Image src="/assets/logo2.png" height={150} width={150}></Image>
            </div>

            <div className='w-full text-center flex-grow-[2]'>
              <h6 className='text--black text-small-size text-large-weight mb-[12px]'>{t.Is_there_a_problem_with_your_shipment}</h6>
              <ButtonComponent title={t.complain} type="complain" action={() => { }} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Address