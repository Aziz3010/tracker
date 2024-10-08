import React, { useEffect, useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getTranslations } from "@/utils/getTranslations";

const ProgressBarCom = ({ transitEvents }) => {
    const { lang } = useSelector((state) => state.langSlice);
    const t = getTranslations(lang ? lang : "en");

    const initialSteps = [
        { stepName: "TICKET_CREATED", index: 1, reach: false },
        { stepName: "PACKAGE_RECEIVED", index: 2, reach: false },
        { stepName: "OUT_FOR_DELIVERY", index: 3, reach: false },
        { stepName: "DELIVERED", index: 4, reach: false }
    ];

    const [steps, setSteps] = useState(initialSteps);

    const checkSteps = () => {
        const updatedSteps = steps.map(step => {
            const stateObj = transitEvents.find(event => event.state === step.stepName);
            return {
                ...step,
                reach: stateObj ? true : step.reach
            };
        });

        setSteps(updatedSteps);
    };

    const getThePercentage = () => {
        const totalSteps = steps.length;
        const reachedSteps = steps.filter(step => step.reach).length;
        return Math.ceil((reachedSteps / totalSteps) * 100);
    };

    const getTheProgressColor = () => {
        if (transitEvents?.length) {
            const lastState = transitEvents[transitEvents.length - 1]?.state;

            if (lastState === "DELIVERED") {
                return "#4fcb0d";
            }

            if (lastState === "CANCELLED") {
                return "#ff0000";
            }

            return "#FFD700";
        }
        return "#FFD700";
    };

    const getTheState = () => {
        if (transitEvents?.length) {
            const lastState = transitEvents[transitEvents.length - 1]?.state;
            if (lastState === "DELIVERED") {
                return "";
            }

            if (lastState === "DELIVERED_TO_SENDER" || lastState === "CANCELLED") {
                return t.cancelled;
            }
        }
        return "";
    };


    useEffect(() => {
        if (transitEvents && transitEvents.length) {
            checkSteps();
        }
    }, [transitEvents]);

    return (
        <Container className='p-[30px]' style={{ direction: "ltr" }}>
            <Row>
                <Col>
                    <ProgressBar
                        percent={getThePercentage()}
                        filledBackground={getTheProgressColor()}
                        hasStepZero={true}
                    >
                        {steps.map(({ stepName, index }) => (
                            <Step key={index} transition="scale">
                                {({ accomplished }) => (
                                    <div style={{ backgroundColor: `${accomplished ? getTheProgressColor() : "#fff"}` }} className={`stepsStyle indexedStep ${accomplished ? "accomplished doneStep" : ""}`}>
                                        {index}
                                    </div>
                                )}
                            </Step>
                        ))}
                    </ProgressBar>
                </Col>
            </Row>

            <Row className="mt-[24px]">
                <Col className="flex flex-col gap-2 p-0 m-0 items-start justify-start">
                    <h3 className="text--black text-small-size text-small-weight">{t.TICKET_CREATED}</h3>
                </Col>
                <Col className="flex flex-col gap-2 p-0 m-0 items-center justify-start">
                    <h3 className="text--black text-small-size text-small-weight">{t.PACKAGE_RECEIVED}</h3>
                </Col>
                <Col className="flex flex-col gap-2 p-0 m-0 items-center justify-start">
                    <div className="w-full flex flex-col gap-2 items-center justify-start">
                        <h3 className="text--black text-small-size text-small-weight">{t.OUT_FOR_DELIVERY}</h3>
                        <h4 className="text-small-size text-small-weight" style={{ color: `${getTheProgressColor()}` }}>{getTheState()}</h4>
                    </div>
                </Col>
                <Col className="flex flex-col gap-2 p-0 m-0 items-end justify-start">
                    <h3 className="text--black text-small-size text-small-weight">{t.DELIVERED}</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default ProgressBarCom;
