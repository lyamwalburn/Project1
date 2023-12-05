const BookingsTable = (props) => {
    return ( 
        <table>
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
                        <td>{booking.time}</td>
                        <td>{booking.buyerId}</td>
                        <td>Cancel button</td>
                    </tr>
                ))}
            </tbody>
        </table>
     );
}
 
export default BookingsTable;