"use client";

import Address from "@/components/Address/Address";
import ShippingHistoryTable from "@/components/ShippingHistoryTable/ShippingHistoryTable";
import StepsProgressBar from "@/components/StepsProgressBar/StepsProgressBar";
import { getTranslations } from "@/utils/getTranslations";
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TrackPage = ({ params }) => {
  const { lang } = useSelector((state) => state.langSlice);
  const t = getTranslations(lang ? lang : "en");

  const [shipmentData, setShipmentData] = useState({});

  const handleGetRequest = async (shipmentCode) => {
    const BaseURL = "https://tracking.bosta.co"; // it must be in .env file and use {process.env.NEXT_BOSTA_BASEURL} for example

    try {
      const request = await fetch(`${BaseURL}/shipments/track/${shipmentCode}`, { method: "GET" }); // we can use axios
      const data = await request.json();
      console.log(data);
      // if the code is not correct
      if (data?.error && data?.status === "Not Found.") {
        // we should navigate to home page or display error page for the user
        toast(t.notfound);
      }

      // if the code is correct -----> we can use toolkit to access data from the components but i will use the props to pass the data
      setShipmentData({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.trackingNumber) {
      handleGetRequest(params.trackingNumber);
    }
  }, [params.trackingNumber]);

  return (
    <section className="py-[40px]">
      <Container>
        {/* Steps Progress Bar */}
        <Row>
          <Col className="mb-[20px] md:mb-0">
            <StepsProgressBar
              provider={shipmentData?.provider}
              currentStatus={shipmentData?.CurrentStatus}
              createDate={shipmentData?.CreateDate}
              promisedDate={shipmentData?.PromisedDate}
              trackingNumber={shipmentData?.TrackingNumber}
              transitEvents={shipmentData?.TransitEvents}
            />
          </Col>
        </Row>


        {/* History table + Address */}
        <Row className="flex-col md:flex-row mt-[30px]">
          <Col className="mb-[20px] md:mb-0 md:flex-grow-[2]">
            <div className="w-full flex flex-col gap-[16px] justify-start items-start">
              <h3>{t.details}</h3>
              <ShippingHistoryTable transitEvents={shipmentData?.TransitEvents} />
            </div>
          </Col>

          <Col className="mb-[20px] md:mb-0 md:flex-grow-[1]">
            <div className="w-full flex flex-col gap-[16px] justify-start items-start">
              <h3>{t.address}</h3>
              <Address />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TrackPage