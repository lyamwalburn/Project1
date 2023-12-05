export const URLPATHS = {
    BASE: 'http://localhost:8081',
    SELLERS: 'http://localhost:8081/seller',
    BUYERS: 'http://localhost:8081/buyer',
    PROPERTY: 'http://localhost:8081/property'
  }

 export const SALESTATUS = {
    FORSALE: 'FOR SALE',
    SOLD: 'SOLD'
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
