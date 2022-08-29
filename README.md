# Places API Manual

## User - Sign Up
URL - /auth/signUp \
Request - post \
Body Json Format: \
{ \
    "name":  "Rajen", \
    "email":  "hopeful.raz@gmail.com", \
    "password": "1", \
    "contact_number": "9861533778", \
    "address": "chagal, jana-sewa marga, swayambhu", \
    "website": "www.nnn.com" \
} \

## User - Sign in
URL - /auth/signIp \
Request - post \
Body Json Format: \
{ \
    "email":  "hopeful.raz@gmail.com", \
    "password": "1", \
} \

## Item - Add
URL - items/add \
Request - post \
Body Json Format: \
{ \
    "name":  "Large", \
    "unit_price":  "1000.00", \
    "description": "The large package" \
} \

## Item - List
URL - items/list \
Request - get \

## Client - Add
URL - clients/add \
Request - post \
Body Json Format: \
{ \
    "name":  "Asif", \
    "employee":  "630c815a1ef12dfa94ad5811", \
    "address": "Bangladesh", \
    "contact_number": "8967855224" \
} \

## Client - List
URL - clients/list \
Request - get \

## Invoice - Add
URL - invoices/add \
Request - post \
Body Json Format: \
{ \
    "number":  "1", \
    "due_date":  "2022-08-31", \
    "items": "630c9a91111252ebb0b9aaa0 630c9acf111252ebb0b9aaa2", \
    "creator": "630c815a1ef12dfa94ad5811", \
    "client": "630ca0afd168fdb30e69def8" \
} \

## Invoice - List and filter them by Paid or Not
URL - invoices/list \
Request - post \
{ \
  "paid":false \
}