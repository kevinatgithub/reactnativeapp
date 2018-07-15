What is getsandbox?

Quick and easy mock RESTful API and SOAP webservices. Generate from API definitions,
instant deploy, collaborative build, and debugging tools for integration.


there is only 1 route I created here 

1. POST /references   (http://wombtest.getsandbox.com/references)

Server Response :


{
    "accounts": [
        {
            "username": "admin",
            "password": "admin"
        },
        {
            "username": "user",
            "password": "user"
        }
    ],
    "genders": [
        {
            "code": "M",
            "desc": "Male"
        },
        {
            "code": "F",
            "desc": "Female"
        }
    ],
    "patientTypes": [
        {
            "code": "I",
            "desc": "In-patient"
        },
        {
            "code": "O",
            "desc": "Out-patient"
        }
    ]
}