const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', (e) =>{
    e.preventDefault();

// get form inputs
    const fullName = updateForm.fullName.value;
    const email = updateForm.email.value;
    const phoneNo = updateForm.phoneNo.value;
    const admin_id = updateForm.admin_id.value;
    


    const fullNameErr = document.querySelector('.fullNameErr')
    const emailErr = document.querySelector('.emailErr') 
    const phoneNoErr = document.querySelector('.phoneNoErr')
    
    
    const msg = document.querySelector('.msg') 

 
    fullNameErr.innerHTML = '';
    emailErr.innerHTML = '';
    phoneNoErr.innerHTML = '';
    


    
    // pattern construction
    const nameReg = /^[a-zA-Z\s]+$/; 
    const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNoReg = /^[0-9]+$/;


    if (!nameReg.test(fullName)) {
        fullNameErr.innerHTML = 'Enter a Valid Name';
        throw Error('Terminating');    
    }
    if (!email_Reg.test(email)) {
        emailErr.innerHTML = 'Invalid email address';
        throw Error('Terminating');
    }
    if (!phoneNoReg.test(phoneNo)) {
        phoneNoErr.innerHTML = 'Invalid phone number';
        throw Error('Terminating');
    }


    // ********** Post form data to backend **********

    const data = {fullName, email, phoneNo, admin_id};

    fetch('/update-profile', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        if (data.success) {
            msg.innerHTML = data.message;
            msg.style.backgroundColor = '#d1e7dd'; 
            msg.style.marginBottom = '4px';
            msg.style.textAlign = 'center' 

            setInterval(() => {
               window.location.href = '/profile'
            }, 2000);
        }

        if (data.error) {
            msg.innerHTML = data.error;
            msg.style.backgroundColor = 'red';
            msg.style.padding = '10px'
            msg.style.marginBottom = '4px';
            msg.style.textAlign = 'center'

            setInterval(() => {    
               window.location.href = '/profile'
            }, 2000);
        }

    }) 
    .catch((e) => console.log(e.message)); 


    
})
