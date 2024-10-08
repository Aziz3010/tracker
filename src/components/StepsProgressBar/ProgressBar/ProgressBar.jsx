import { Col, Container, Row } from "react-bootstrap"
import { ProgressBar } from "react-step-progress-bar";

const ProgressBar = ({ currentStatus }) => {
    return (
        <Container className='p-[16px]'>
            <Row>
                <Col>
                    {/* ProgressBar {currentStatus?.state} */}
                    
                    <ProgressBar
                        percent={75}
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    />
                    
                </Col>
            </Row>
        </Container>
    )
}

export default ProgressBar