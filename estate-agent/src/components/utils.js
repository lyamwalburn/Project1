export const URLPATHS = {
    BASE: 'https://localhost:7203',
    SELLERS: 'https://localhost:7203/Seller',
    BUYERS: 'https://localhost:7203/Buyer',
    PROPERTY: 'https://localhost:7203/Property',
    BOOKING: 'https://localhost:7203/Booking'
  }

export const ROUTES = {
    SELLERS: '/sellers',
    BUYERS: '/buyers',
    PROPERTIES: '/properties',
    PROPERTIES_UPSERT: '/properties/upsert',
}

 export const SALESTATUS = {
    FORSALE: 'FOR SALE',
    SOLD: 'SOLD'
}

export const SELECTVALUE = {
    NOT_SELECTED: 'not-selected',
}

export const PATH_IDS = {
    NEW : 'new',
}

export const PROPERTY_TYPES = {
    DETACHED: 'DETACHED',
    SEMI_DETACHED: 'SEMI-DETACHED',
    APARTMENT: 'APARTMENT',
    ALL: 'ALL'
}

export const USER_TYPE = {
    SELLER : 'seller',
    BUYER: 'buyer',
}

// export const validEmail = new RegExp('^[a-zA-z0-9._.:$!-]+@+[a-zA-Z0-9.-]+.[a-zA-z]$')

export const validName = new RegExp('^[A-Z][A-Za-z]+')

export const validNumbers = new RegExp('^[0-9]+$')

export const timeSlots = [
    {
        value: '08:00 - 09:00',
        id:1,
        time: 8
    },
    {
        value: '09:00 - 10:00',
        id:2,
        time: 9
    },
    {
        value: '10:00 - 11:00',
        id:3,
        time: 10
    },
    {
        value: '11:00 - 12:00',
        id:4,
        time: 11
    },
    {
        value: '12:00 - 13:00',
        id:5,
        time: 12
    },
    {
        value: '13:00 - 14:00',
        id:6,
        time: 13
    },
    {
        value: '14:00 - 15:00',
        id:7,
        time: 14
    },
    {
        value: '15:00 - 16:00',
        id:8,
        time: 15
    },
    {
        value: '16:00 - 17:00',
        id:9,
        time: 16
    }
]
