import { useEffect, useRef, useState } from "react";
import { URLPATHS, timeSlots } from "./utils";
import { useNavigate } from "react-router-dom";

const BookingForm = (props) => {

    const buyerInput = useRef(null)
    const timeslotInput = useRef(null)
    const dateInput = useRef(null)

    const [bookings,setBookings]=useState([]) //TODO send bookings via props

    useEffect(()=>{
        fetch(URLPATHS.BOOKING).then(res=>res.json().then(setBookings))
    },[])


    const getBuyerByIdJSON = async (id) =>{
        const res = await fetch(`${URLPATHS.BUYERS}/${id}`)
        const data = await res.json()
        return data
    }

    const createBooking = (booking)=>{
        console.log(booking)
        fetch(URLPATHS.BOOKING,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(booking)
        })
        props.refreshBookings()
    }

    const tryCreateBooking = ()=>{
        let newBooking = {
            buyerId: buyerInput.current.value,
            propertyId: props.property.id,
            timeslot: timeslotInput.current.value,
            date: dateInput.current.value
        }

        console.log(buyerInput.current.value)
        console.log(timeslotInput.current.value)
        console.log(dateInput.current.value)

        console.log(bookings)
        let tempBookings = [...bookings]
        console.log(new Date().toDateString())

        //can the property be booked for this date/time?
        console.log(canBookProperty(newBooking))

            if(canBookProperty(newBooking)){
                //can i just chain the filters and if the array is 0 at the end i cant book?
                //test this!
                //buyer booking checks
                getBuyerByIdJSON(buyerInput.current.value).then(buyer=>{
                    console.log(buyer)
                    //does this buyer have bookings?
                    tempBookings = tempBookings.filter(booking=>booking.buyerId == buyer.id)
                    if(tempBookings.length > 0){
                        //we have bookings keep checking
                        tempBookings = tempBookings.filter(booking=> booking.date == dateInput.current.value)
                        if(tempBookings.length > 0){
                            //the bookings are on the same day check timeslots
                            tempBookings = tempBookings.filter(booking => booking.timeslot == timeslotInput.current.value)
                            if(tempBookings.length > 0){
                                //buyer has a booking in this timeslot cannot book
                                console.log('error buyer already has a booking at this time')
                            } else {
                                console.log('buyer has no booking this timeslot')
                                createBooking(newBooking)
                            }
                        } else {
                            //no buyer bookings on this day
                            console.log('buyer has no bookings this date')
                            createBooking(newBooking)
                        }
                    } else {
                        console.log('buyer has no bookings')
                        createBooking(newBooking)
                    }
                })
            }
            else {
                console.log('cannot book property')
            }
        }
    

    const canBookProperty = (newBooking)=>{
        //property has bookings
            //are any on this day?
                //yes - does the timeslot match
                    ///yes - cant book
                    //no check buyer
                //no check buyer

        let propertyBookings = bookings
        propertyBookings = propertyBookings.filter(booking=> booking.propertyId == props.property.id)
        if(propertyBookings.length > 0 ){
            //there are bookings for this property keep checking
            propertyBookings = propertyBookings.filter(booking => booking.date == newBooking.date)
            if(propertyBookings.length > 0){
                //bookings are on this date keep checking
                propertyBookings = propertyBookings.filter(booking => booking.timeslot == newBooking.timeslot)
                if(propertyBookings.length >0){
                    //time slot taken cannot book
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return true
        }
        
    }

    return (
        <div>
            <select ref={buyerInput}>
                <option defaultValue value='not-selected'>Buyer....</option>
                {props.buyers.map(buyer => (
                    <option value={buyer.id} key={buyer.id}>{`${buyer.firstName} ${buyer.surname}`}</option>
                ))}
            </select>
            <select ref={timeslotInput}>
                <option defaultValue value='not-selected'>Timeslot....</option>
                {timeSlots.map((slot)=>(
                    <option value={slot.id} key={slot.id*4}>{slot.time}</option>
                ))}
            </select>
            <input type="date" ref={dateInput}/>
            <button onClick={()=>{ tryCreateBooking()}}>Make Booking</button>
        </div>

     );
                }
 
export default BookingForm;