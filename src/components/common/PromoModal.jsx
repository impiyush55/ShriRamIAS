
import { useEffect, useState } from 'react';

export default function PromoModal() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const closeModal = () => {
        setIsActive(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target.id === 'promo-modal') {
            closeModal();
        }
    };

    return (
        <div
            id="promo-modal"
            className={`modal-overlay ${isActive ? 'active' : ''}`}
            onClick={handleBackdropClick}
        >
            <div className="modal-content">
                <button className="modal-close" onClick={closeModal}><i className="ri-close-line"></i></button>
                <div className="modal-body" style={{ backgroundImage: "url('/assets/promo-bg.png')" }}>
                    <div className="modal-text-content">
                        <div className="modal-logo">SRIRAM's <span>IAS</span></div>
                        <div className="modal-year">1 <span className="text-sm">YEAR</span></div>
                        <h2 className="modal-heading">GS FOUNDATION COURSE <br /> <span className="text-lighter">for</span> <span className="text-highlight">UPSC CSE</span></h2>

                        <div className="modal-badges">
                            <div className="modal-badge-main">
                                BATCH STARTS <span>19th JANUARY</span>
                            </div>
                            <span className="admission-tag">ADMISSION OPEN</span>
                        </div>

                        <div className="modal-footer-row">
                            <div className="modal-modes">
                                <span><i className="ri-community-line"></i> OFFLINE</span>
                                <span><i className="ri-computer-line"></i> LIVE-ONLINE</span>
                            </div>
                            <div className="modal-contact">
                                <i className="ri-whatsapp-line text-green"></i> 9811489560
                            </div>
                            <a href="#" className="btn btn-warning btn-enroll">ENROLL NOW</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
