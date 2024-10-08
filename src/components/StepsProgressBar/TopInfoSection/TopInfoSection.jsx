import { getTranslations } from '@/utils/getTranslations';
import { formatDateTime } from '@/utils/helper';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const TopInfoSection = ({ provider, currentStatus, createDate, promisedDate, trackingNumber }) => {
    const { lang } = useSelector((state) => state.langSlice);
    const t = getTranslations(lang ? lang : "en");

    const getTheShipmentStatus = () => {
        let theColor = "text--black";
        let status = "";
        switch (currentStatus?.state) {
            case "DELIVERED":
                theColor = "text-green";
                status = "delivered";
                break;
            case "CANCELLED":
                theColor = "text-red";
                status = "cancelled";
                break;
            case "DELIVERED_TO_SENDER":
                theColor = "text-yellow";
                status = "return";
                break;
            default:
                theColor = "text--black";
                status = "";
                break;
        }
        return { color: theColor, status };
    };

    return (
        <Container className='p-[16px]'>
            <Row>
                <Col>
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-gray text-small-size text-small-weight">{t.shipmentNumber} {trackingNumber}</h2>
                        <h2 className={`text-large-size text-large-weight ${getTheShipmentStatus().color}`}>{t[getTheShipmentStatus().status]}</h2>
                    </div>
                </Col>

                <Col>
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-gray text-small-size text-small-weight">{t.lastUpdate}</h2>
                        <h2 className={`text-large-size text-large-weight text--black`}>{formatDateTime(createDate, "short", true).longDate}</h2>
                    </div>
                </Col>

                <Col>
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-gray text-small-size text-small-weight">{t.sellerName}</h2>
                        <h2 className={`text-large-size text-large-weight text--black`}>{provider}</h2>
                    </div>
                </Col>

                <Col>
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-gray text-small-size text-small-weight">{t.deliveryDateWithin}</h2>
                        <h2 className={`text-large-size text-large-weight text--black`}>{formatDateTime(promisedDate, "short", false).shortDate}</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TopInfoSection