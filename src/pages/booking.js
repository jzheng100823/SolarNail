import "./BookingButton.css"
const { useNavigate } = require("react-router-dom")

const Booking = () => {
    const navigation = useNavigate();
    const goToWalking = () => {
        navigation('/bookings/walk-in/');

    }

    

    return (
        <div>
        <h1 className="h1">Book Now</h1>
        <div class="button-center">
        <button class="button middle-button" onClick={goToWalking}>Walk Ins</button>
        <div className="space"> </div>
        <button class="button middle-button" onClick={() => navigation('/bookings/appointment')}> Book Online</button>
        </div>
        </div>
    );
}

export default Booking;