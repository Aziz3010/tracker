"use client";

import Address from "@/components/Address/Address";
import ShippingHistoryTable from "@/components/ShippingHistoryTable/ShippingHistoryTable";
import StepsProgressBar from "@/components/StepsProgressBar/StepsProgressBar";
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const TrackPage = ({ params }) => {
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
      setShipmentData({...data});
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
    <section>
      <Container>
        <Row>
          <Col className="mb-[20px] md:mb-0">
            <StepsProgressBar
              provider={shipmentData?.provider}
              currentStatus={shipmentData?.CurrentStatus}
              createDate={shipmentData?.CreateDate}
              promisedDate={shipmentData?.PromisedDate}
              trackingNumber={shipmentData?.TrackingNumber}
            />
          </Col>
        </Row>

        <Row className="flex-col md:flex-row">
          <Col className="mb-[20px] md:mb-0">
            <ShippingHistoryTable
              transitEvents={shipmentData?.TransitEvents}
            />
          </Col>

          <Col className="mb-[20px] md:mb-0">
            <Address shipmentData={shipmentData} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TrackPage