export const URLPATHS = {
    BASE: 'http://localhost:8081',
    SELLERS: 'http://localhost:8081/seller',
    BUYERS: 'http://localhost:8081/buyer',
    PROPERTY: 'http://localhost:8081/property',
    BOOKING: 'http://localhost:8081/booking'
  }

 export const SALESTATUS = {
    FORSALE: 'FOR SALE',
    SOLD: 'SOLD'
}

export const SELECTVALUE = {
    NOT_SELECTED: 'not-selected',
}

export const PROPERTY_TYPES = {
    DETACHED: 'DETACHED',
    SEMI_DETACHED: 'SEMI-DETACHED',
    APARTMENT: 'APARTMENT',
    ALL: 'ALL'
}

// export const validEmail = new RegExp('^[a-zA-z0-9._.:$!-]+@+[a-zA-Z0-9.-]+.[a-zA-z]$')

export const validName = new RegExp('^[A-Z][A-Za-z]+')

export const validNumbers = new RegExp('[0-9]+')

export const timeSlots = [
    {
        time: '08:00 - 09:00',
        id:1
    },
    {
        time: '09:00 - 10:00',
        id:2
    },
    {
        time: '10:00 - 11:00',
        id:3
    },
    {
        time: '11:00 - 12:00',
        id:4
    },
    {
        time: '12:00 - 13:00',
        id:5
    },
    {
        time: '13:00 - 14:00',
        id:6
    },
    {
        time: '14:00 - 15:00',
        id:7
    },
    {
        time: '15:00 - 16:00',
        id:8
    },
    {
        time: '16:00 - 17:00',
        id:9
    }
]
