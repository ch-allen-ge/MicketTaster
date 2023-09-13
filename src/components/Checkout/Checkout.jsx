import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate(`/`);
    };
    
    const {state} = useLocation();
    const {
        title,
        date,
        venue,
        picture,
        pricePerTicket,
        ticketNumber
    } = state;

    const [addingNewCreditCard, setAddingNewCreditCard] = useState(false);
    const [editingCreditCard, setEditingCreditCard] = useState(false);
    const [savedCreditCards, setSavedCreditCards] = useState([]);
    const [selectedCreditCard, setSelectedCreditCard] = useState({});
    const [cardChangingIndex, setCardChangingIndex] = useState(null);

    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [country, setCountry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [stateLocation, setStateLocation] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const getNewCreditCardDetails = () => {
        return {
            nameOnCard,
            cardNumber,
            expirationDate,
            securityCode,
            country,
            addressLine1,
            addressLine2,
            city,
            stateLocation,
            postalCode,
            phoneNumber
        };
    };

    const getTotalCost = () => {
        let ticketCost = pricePerTicket * ticketNumber;
        let serviceFee = Math.round(0.19249 * pricePerTicket * ticketNumber * 100) / 100;
        let orderProcessingFee = 2.95;

        return ticketCost + serviceFee + orderProcessingFee;
    }

    const deleteSavedCreditCard = (cardNumber) => {
        setSavedCreditCards(savedCreditCards.filter((card) => card.cardNumber !== cardNumber));
    }

    return (
        <>
            <div className="checkoutContainer">
                <div className="deliveryPaymentContainer">
                    <div className="section">
                        <div className="title">
                            <h1>Delivery</h1>
                            <img className='greenCheckMark' src='/src/assets/greenCheck.png' />
                        </div>

                        <div className="subTitle">
                            Mobile Entry - Free
                        </div>
                        <br />
                        <div className="greyText">
                            Tickets available by {date} <br />
                            These mobile tickets will be transferred directly to you from a trusted seller.
                            We'll email you instructions on how to accept them on the original ticket provider's mobile app.
                        </div>
                    </div>
                    
                    <div className="section">
                        <div className="title">
                            <h1>Payment</h1>
                            <img className='greenCheckMark' src='/src/assets/greenCheck.png' />
                        </div>

                        {(addingNewCreditCard | editingCreditCard ) ?
                            <div className="slightMarginLeft">
                                <div className='backToStoredCards' onClick={() => {
                                    setAddingNewCreditCard(false);
                                    setEditingCreditCard(false);
                                }}> &lt; Back to Stored Cards</div>
                                <br />
                                {/* Maybe add all credit card icons individually here */}

                                <div>
                                    <div>
                                        <label htmlFor="explicit-label-name">Name on Card</label><br />
                                        <input 
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.nameOnCard : ''}
                                            onChange={(e) => {setNameOnCard(e.target.value)}}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Card Number</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.cardNumber : ''}
                                            onChange={(e) => {setCardNumber(e.target.value)}} />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Expiration Date</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            placeholder="MM/YY"
                                            defaultValue={editingCreditCard ? selectedCreditCard.expirationDate : ''}
                                            onChange={(e) => {setExpirationDate(e.target.value)}}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Security Code</label><br />
                                        <div className="flexDisplay">
                                            <input
                                                type="text"
                                                id="explicit-label-name"
                                                placeholder="CVV"
                                                defaultValue={editingCreditCard ? selectedCreditCard.securityCode : ''}
                                                onChange={(e) => {setSecurityCode(e.target.value)}} />
                                            <img className='icon ml-10' src='/src/assets/creditCard.png' />
                                            <span>3 digits on back of card</span>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Country</label><br />
                                        <div className="flexDisplay">
                                            <select defaultValue={editingCreditCard ? selectedCreditCard.country : ''} onChange={(e) => {setCountry(e.target.value)}} >
                                                <option value='' key=''></option>
                                                <option value='United States' key='United States'>United States</option>
                                                <option value='Canada' key='Canada'>Canada</option>
                                                <option value='China' key='China'>China</option>
                                                <option value='Australia' key='Australia'>Australia</option>
                                                <option value='Japan' key='Japan'>Japan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Address Line 1</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.addressLine1 : ''}
                                            onChange={(e) => {setAddressLine1(e.target.value)}}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Address Line 2 (optional)</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.addressLine2 : ''}
                                            onChange={(e) => {setAddressLine2(e.target.value)}} />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">City</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.city : ''}
                                            onChange={(e) => {setCity(e.target.value)}}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">State</label><br />
                                        <div className="flexDisplay">
                                            <select defaultValue={editingCreditCard ? selectedCreditCard.stateLocation : ''} onChange={(e) => {setStateLocation(e.target.value)}} >
                                                <option value='' key=''></option>
                                                <option value='Massachusetts' key='Massachusetts'>Massachusetts</option>
                                                <option value='California' key='California'>California</option>
                                                <option value='Florida' key='Florida'>Florida</option>
                                                <option value='Texas' key='Texas'>Texas</option>
                                                <option value='Maine' key='Maine'>Maine</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Postal Code</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.postalCode : ''}
                                            onChange={(e) => {setPostalCode(e.target.value)}}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="explicit-label-name">Phone Number</label><br />
                                        <input
                                            type="text"
                                            id="explicit-label-name"
                                            defaultValue={editingCreditCard ? selectedCreditCard.phoneNumber : ''}
                                            onChange={(e) => {setPhoneNumber(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <br />
                                <button className="saveNewCreditCardButton" onClick={() => {
                                    if (editingCreditCard) {
                                        //update card details here
                                        savedCreditCards[cardChangingIndex] = getNewCreditCardDetails();
                                        setEditingCreditCard(false);
                                    } else {
                                        setSavedCreditCards([...savedCreditCards, getNewCreditCardDetails()]);
                                        setAddingNewCreditCard(false);
                                    }
                                }}>
                                    {editingCreditCard ? 'Save' : 'Add New Card'}
                                </button>
                            </div>
                            :
                            <div className="addNewCardSection">
                                <div className="subTitle useCreditDebitText">
                                    <span className="slightMarginLeft">Use Credit / Debit Card</span>
                                </div>

                                <div className="savedCreditCardsContainer slightMarginLeft">
                                    {savedCreditCards.map((card, index) => {
                                        return (
                                            <div className="radio" key={card.cardNumber}>
                                                <input id="radio-1" name="radio" type="radio" />
                                                <img className='visaIcon' src='/src/assets/visaIcon.png'/>
                                                <div className="savedCreditCardDetails">
                                                    <span>Visa - {card.cardNumber.slice(-4)}</span>
                                                    {card.nameOnCard} | exp. {card.expirationDate}
                                                    <div>
                                                        <span className='blueClickableText' onClick={() => {
                                                            setEditingCreditCard(true);
                                                            setSelectedCreditCard(card);
                                                            setCardChangingIndex(index);
                                                        }}>
                                                            Edit
                                                        </span>
                                                        &nbsp;|&nbsp; 
                                                        <span className='blueClickableText' onClick={() => {
                                                            deleteSavedCreditCard(card.cardNumber);
                                                        }}>
                                                            Delete
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="addNewCardContainer">
                                    <img className='icon' src='/src/assets/bluePlus.png' />
                                    <img className='icon' src='/src/assets/creditCard.png' />

                                    <span className='blueClickableText' onClick={() => setAddingNewCreditCard(true)}>Add New Card</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="totalContainer">
                    <div className="section">
                        <div className="title spaceBetweenFlex">
                            <h1>Total</h1>
                            <h1>${getTotalCost()}</h1>
                        </div>

                        <div className="subTitle">
                            Tickets
                        </div>
                        <br />
                        <div className="spaceBetweenFlex">
                            <span>Tickets: ${pricePerTicket} x {ticketNumber}</span>
                            <span>${pricePerTicket * ticketNumber}</span>
                        </div>
                        <br />

                        <div className="subTitle">
                            Notes From Seller
                        </div>
                        <br />
                        <span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                            type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged.
                        </span>
                        <br />

                        <div className="subTitle">
                            Fees
                        </div>
                        <br />
                        <div className="spaceBetweenFlex">
                            <span>Service Fee: ${0.19249 * pricePerTicket} x {ticketNumber}</span>
                            <span>${Math.round(0.19249 * pricePerTicket * ticketNumber * 100) / 100}</span>
                        </div>
                        <div className="spaceBetweenFlex">
                            <span>Order Processing Fee</span>
                            <span>$2.95</span>
                        </div>
                        <br />

                        <div className="subTitle">
                            Delivery
                        </div>
                        <br />
                        <div className="spaceBetweenFlex">
                            <span>Mobile Entry</span>
                            <span>Free</span>
                        </div>
                        <br />

                        <span className='blueClickableText' onClick={() => {navigateToHome()}}>Cancel Order</span>
                        <br /><br />

                        <div className="subTitle">
                            *All Sales Final - No Refunds
                        </div>
                        <br />

                        <div className="termsContainer">
                            <input type="checkbox" value="agreedToTerms" />
                            <span>I have read and agreed to the current <a href=''>Terms of Use</a></span>
                        </div>
                        <br />

                        <button onClick={() => {
                            alert(`Order successfully placed for ${ticketNumber} ticket(s) to go see ${title} on ${date} at ${venue}! Going back to homepage now.`);
                            navigateToHome();
                        }}>
                            Place Order
                        </button>

                        <h5>*Exceptions may apply, see our Terms of Use</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;