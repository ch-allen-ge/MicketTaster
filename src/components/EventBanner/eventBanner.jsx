import './eventBanner.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const EventBanner = ({title, date, venue, picture, pricePerTicket}) => {

    const [ticketNumber, setTicketNumber] = useState(0);
    const navigate = useNavigate();

    const routeChange = () => {
        if (ticketNumber == 0) {
            alert('Please select some tickets to buy!');
        } else {
            navigate(`/checkout`, {
                state: {
                    title,
                    date,
                    venue,
                    picture,
                    pricePerTicket,
                    ticketNumber
                }
            });
        }
    }
    
    return (
        <div className="eventBannerContainer">
            <div className='imageContainer'>
                <img src={picture}/>
            </div>
            <div className='eventDetails'>
                <span>{title}</span>
                <span>{venue}</span>
                <span>{date}</span>
                <span>${pricePerTicket} per ticket</span>
                <div>
                    <span>Number of tickets:</span>
                    <select name="ticketNumber" onChange={(e) => setTicketNumber(e.target.value)}>
                        {[...Array(11).keys()].map((number) => {
                            return (
                                <option value={number} key={number}>{number}</option>
                            );
                        })}
                    </select>
                </div>
                <button onClick={routeChange}>Checkout</button>
            </div>
        </div>
    );
}

export default EventBanner;