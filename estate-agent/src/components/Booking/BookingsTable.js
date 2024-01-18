import { useId, useState } from "react"
import { timeSlots } from "../utils"

const BookingsTable = (props) => {

    const [bookingToDelete,setBookingToDelete] = useState()
    let id = useId()
    const getBuyerNameString = (booking)=>{
        if(props.buyers.length > 0){
            let buyer = props.buyers.filter(b=>b.id == booking)[0]
            return `${buyer.firstName} ${buyer.surname}`
        }
    }

    const getTimeslotString = (dt)=>{
        let time = new Date(dt)
        return `${time.getHours()}:00 - ${parseInt(time.getHours()+1)}:00`
    }

    return ( 
        <>
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
                    <tr key={booking.time}>
                        <td key={booking.time+1}>{booking.time.substr(0,10).split('-').reverse().join('-')}</td>
                        <td key={booking.time+3}>{getTimeslotString(booking.time)}</td>
                        <td key={booking.time+4}>{getBuyerNameString(booking.buyerId)}</td>
                        <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=>setBookingToDelete(booking.id)}>Cancel Booking</button></td>
                    </tr>     
                ))}
            </tbody>
        </table>
            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="deleteModalLabel">Are you sure?</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    This booking will be permenantly deleted, this cannot be undone.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{
                     props.deleteBooking(bookingToDelete) 
                     }}>Confirm Delete</button>
                </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default BookingsTable;