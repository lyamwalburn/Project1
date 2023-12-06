import { useId } from "react"
import { timeSlots } from "../utils"

const BookingsTable = (props) => {

    let id = useId()
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
                    <tr key={id}>
                        <td key={id+booking.id}>{booking.date}</td>
                        <td key={id+3}>{getTimeslotString(booking.timeslot)}</td>
                        <td key={id+4}>{getBuyerNameString(booking.buyerId)}</td>
                        <td key={id+5}><button  className='btn btn-danger'onClick={()=>{props.deleteBooking(booking.id)}}>Cancel Booking</button></td>
                    </tr>
                
                    
                ))}
            </tbody>
        </table>
     );
}
 
export default BookingsTable;