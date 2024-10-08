import TopInfoSection from "./TopInfoSection/TopInfoSection";
import ProgressBarCom from "./ProgressBarCom/ProgressBarCom";

const StepsProgressBar = ({ provider, currentStatus, createDate, promisedDate, trackingNumber, transitEvents }) => {
    return (
        <div className="w-full border-1 border-[var(--gray-border-color)] rounded-md">
            <TopInfoSection
                provider={provider}
                currentStatus={currentStatus}
                createDate={createDate}
                promisedDate={promisedDate}
                trackingNumber={trackingNumber}
            />

            <hr style={{borderColor: "#dfdfdf"}} />

            <ProgressBarCom transitEvents={transitEvents} />

        </div>
    )
}

export default StepsProgressBar