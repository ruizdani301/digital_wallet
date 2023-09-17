APIS:

http://url/api/v1/saldo/<int:id>
Displays the user's balance, along with the user's name and identificaction_number.
ejemplo de retorno:
{
"balance": "510000.00",
"user**name": "queen",
"user**uuid_user": "f01feaa2-277f-4617-b395-683436288f1b"
}

http://url/api/v1/pago/<int:id>
Performs data entry and deducts from the user's balance.
{
"amount":"10000" , "details": "pago de factura", "transaction_type": "pago",
"reference": "1143878990", "reference_name": "movistar", "user": 1
}

http://url/api/v1/recarga/
sends the identification number and the value to recharge to the user, this would be an api used by an external entity to recharge the user's wallet.
{"reload": 20000, "identification": "123456790" }

http://url/api/v1/retiro/ : send a withdrawal request and returns a 6-digit validation code
example of shipment:

{"identification_number": "1143878993","value": 50000}

http://url/api/v1/reporte/<id>
ejemplo: returns a list of objects with the data required for the reports

[
{
"reference_name": "sucursal", "reference": "1143878990",
"transaction_type": "recarga", "amount": "220000.00", "transaction_date": "2023-09-13T17:14:15.562810Z",
"new_date": "13-09-2023 17:14:15", }
]

dependencies:

Django==4.2.4
djangorestframework==3.14.0
psycopg2==2.9.7
