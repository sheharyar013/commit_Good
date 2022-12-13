import { IoInformationCircleOutline, IoEarthSharp } from "react-icons/io5";

export default function AuthWizard(props) {
  return (
    <section className="wizard-section">
      <div className="container">
        {props.regId === 0 ? (
          <div className="steps-container">
            <div className="progress-container auth-wizard-step">
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoInformationCircleOutline />
                    </span>
                  </p>
                </div>
                <h4>Your Info</h4>
              </div>
              <div className="progress-line"></div>
              <div className="step-wizard">
                <div className="circle">
                  <p>
                    <span className="span-p">
                      <IoEarthSharp />
                    </span>
                  </p>
                </div>
                <h4>Region</h4>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {props.regId === 1 ? (
          <div className="steps-container">
            <div className="progress-container auth-wizard-step">
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoInformationCircleOutline />
                    </span>
                  </p>
                </div>
                <h4>Your Info</h4>
              </div>
              <div className="progress-line active"></div>
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoEarthSharp />
                    </span>
                  </p>
                </div>
                <h4>Region</h4>
              </div>
              {/* <div className="progress-line"></div>
              <div className="step-wizard">
                <div className="circle">
                  <p>
                    <span className="span-p">
                      <AiOutlineWallet />
                    </span>
                  </p>
                </div>
                <h4>Wallet</h4>
        </div>*/}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
