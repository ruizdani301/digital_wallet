# http://url/user/<int:id> :

- Gets the user with the user id using request get

# http://url/register :

- register a new user
  example:
  {
  "password":"123456789",
  "name":"admin",
  "country_code":"57",
  "email":"admin@gmail.com",
  "identification_number":"1143878999",
  "phone_number":"3218829300",
  "identification_type":"cedula"
  }

# http://url/login:

example:
{ "email":"admin@gmail.com","password":"123456789"}

# http:://url/'user/<int:id>:

- performing a patch request updates the object partially
  example:

{
"password":"123456789",
"name":"admin",
"country_code":"57",
"email":"adminx@gmail.com",
"identification_number":"1243878990",
"phone_number":"333333333333",
"identification_type":"cedula"
}
