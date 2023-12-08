import { useEffect, useRef, useState } from "react";
import { SELECTVALUE, URLPATHS, timeSlots } from "../utils";


const BookingForm = (props) => {

    const buyerInput = useRef(null)
    const timeslotInput = useRef(null)
    const dateInput = useRef(null)

    const buyerErr = useRef(null)
    const timeErr = useRef(null)
    const dateErr = useRef(null)
    const generalErr = useRef(null)

    const [bookings,setBookings]=useState([]) //TODO send bookings via props

    useEffect(()=>{
        fetchBookings()
    },[])

    const fetchBookings = ()=>{
        fetch(URLPATHS.BOOKING).then(res=>res.json().then(setBookings))
    }


    const getBuyerByIdJSON = async (id) =>{
        const res = await fetch(`${URLPATHS.BUYERS}/${id}`)
        const data = await res.json()
        return data
    }

    const validateBooking = ()=>{
        let isValid = true

        //buyerid != not-selected
        if(buyerInput.current.value == SELECTVALUE.NOT_SELECTED){
            isValid = false
            buyerInput.current.className = 'form-select is-invalid mb-2'
            buyerErr.current.className = 'invalid-feedback'
            buyerErr.current.innerHTML = 'Please choose a buyer from the list'
        } else {
            buyerInput.current.className = 'form-select is-valid mb-2'
            buyerErr.current.className = ''
            buyerErr.current.innerHTML = ''
        }
        //timeslot != not-selected
        if(timeslotInput.current.value == SELECTVALUE.NOT_SELECTED){
            isValid = false
            timeslotInput.current.className = 'form-select is-invalid mb-2'
            timeErr.current.className = 'invalid-feedback'
            timeErr.current.innerHTML = 'Please choose a timeslot from the list'
        } else {
            timeslotInput.current.className = 'form-control is-valid mb-2'
            timeErr.current.className = ''
            timeErr.current.innerHTML = ''
        }
        //date has no value
        if(dateInput.current.value == ''){
            isValid = false
            dateInput.current.className = 'form-control is-invalid mb-2'
            dateErr.current.className = 'invalid-feedback'
            dateErr.current.innerHTML = 'Please pick a date for booking'
        } else {
            dateInput.current.className = 'form-control is-valid mb-2'
            dateErr.current.className = ''
            dateErr.current.innerHTML = ''
        }
        //date value > todays date

        let todayDate = new Date()
        let inputDate = dateInput.current.value.split('-')
        //check year >= todays year
        if(inputDate[0] >= todayDate.getUTCFullYear() && (inputDate[1] >= todayDate.getUTCMonth()+1 || inputDate[0] > todayDate.getUTCFullYear())
            && inputDate[2] >=todayDate.getUTCDate()){
                //date can be booked
                dateInput.current.className = 'form-control is-valid mb-2'
                dateErr.current.className = ''
                dateErr.current.innerHTML = ''
        } else {
            console.log('date is in the past')
            isValid = false
            dateInput.current.className = 'form-control is-invalid mb-2'
            dateErr.current.className = 'invalid-feedback'
            dateErr.current.innerHTML = 'Date must not be in the past'
        }
        

        return isValid
    }

    const createBooking = (booking)=>{
        console.log(booking)
        fetch(URLPATHS.BOOKING,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(booking)
        })
        props.refreshBookings()
        fetchBookings() 
        resetBookingInputs()
    }

    const resetBookingInputs = ()=>{
        buyerInput.current.value = SELECTVALUE.NOT_SELECTED
        timeslotInput.current.value = SELECTVALUE.NOT_SELECTED
        dateInput.current.value = ''
        dateInput.current.className = 'form-control mb-2'
        timeslotInput.current.className = 'form-select mb-2'
        buyerInput.current.className = 'form-select mb-2'
    }
    
    

    const tryCreateBooking = ()=>{

        if(!validateBooking()){
            return
        }

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
                                timeslotInput.current.className = 'form-select is-invalid mb-2'
                                dateErr.current.className = 'invalid-feedback mb-2'
                                dateErr.current.innerHTML = 'Sorry this buyer already has an appointment at this time.'
                                return
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
                timeslotInput.current.className = 'form-select is-invalid mb-2'
                timeErr.current.className = 'invalid-feedback'
                timeErr.current.innerHTML = 'This timeslot has already been filled try another timeslot.'
                return
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
        <div className="container">
            <select ref={buyerInput} className="form-select mb-2" onChange={()=>{buyerInput.current.className = 'form-select mb-2'}}>
                <option defaultValue={SELECTVALUE.NOT_SELECTED} value={SELECTVALUE.NOT_SELECTED}>Buyer....</option>
                {props.buyers.map(buyer => (
                    <option value={buyer.id} key={buyer.id}>{`${buyer.firstName} ${buyer.surname}`}</option>
                ))}
            </select>
            <span ref={buyerErr}></span>
            <select ref={timeslotInput} className="form-select mb-2" onChange={()=>{timeslotInput.current.className = 'form-select mb-2'}}>
                <option defaultValue={SELECTVALUE.NOT_SELECTED} value={SELECTVALUE.NOT_SELECTED}>Timeslot....</option>
                {timeSlots.map((slot)=>(
                    <option value={slot.id} key={slot.id*4}>{slot.time}</option>
                ))}
            </select>
            <span ref={timeErr}></span>
            <input className="mb-2 form-control" type="date" ref={dateInput}/>
            <span ref={dateErr}></span>
            <button className="btn btn-primary col-12" onClick={()=>{ tryCreateBooking()}}>Make Booking</button>
        </div>

     );
                }
 
export default BookingForm;