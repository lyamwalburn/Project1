import { timeSlots } from "./utils"

const BookingsTable = (props) => {

    const getBuyerNameString = (booking)=>{
        let buyer = props.buyers.filter(b=>b.id == booking)[0]
        return `${buyer.firstName} ${buyer.surname}`
    }

    const getTimeslotString = (num)=>{
        return timeSlots.filter(slot=>slot.id == num)[0].time
    }

    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Buyer</th>
                    <th>Cancel</th>
                </tr>
            </thead>
            <tbody>
                {props.bookings.filter(b=>b.propertyId == props.property.id).map(booking=>(
                    <tr>
                        <td>{booking.date}</td>
                        <td>{getTimeslotString(booking.timeslot)}</td>
                        <td>{getBuyerNameString(booking.buyerId)}</td>
                        <td><button  className='btn btn-danger'onClick={()=>{props.deleteBooking(booking.id)}}>Cancel Booking</button></td>
                    </tr>
                
                    
                ))}
            </tbody>
        </table>
     );
}
 
export default BookingsTable;