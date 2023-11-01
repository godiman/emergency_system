const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

// get form inputs
    const fullName = signupForm.fullName.value;
    const email = signupForm.email.value;
    const phoneNo = signupForm.phoneNo.value;
    const password = signupForm.password.value;
    


    const fullNameErr = document.querySelector('.fullNameErr')
    const emailErr = document.querySelector('.emailErr') 
    const phoneNoErr = document.querySelector('.phoneNoErr')
    const passwordErr = document.querySelector('.passwordErr')
    
    const msg = document.querySelector('.msg')


    fullNameErr.innerHTML = '';
    emailErr.innerHTML = '';
    phoneNoErr.innerHTML = '';
    passwordErr.innerHTML = '';
    


    
    // pattern construction
    const nameReg = /^[a-zA-Z\s]+$/; 
    const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNoReg = /^[0-9]+$/;
    const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
   


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
    if (!pwdReg.test(password)) {
        passwordErr.innerHTML = 'Password must contain uppercase, lowercasre and digit';
        throw Error('Terminating');
    }



 // ********** Post form data to backend **********

 const data = {fullName, email, phoneNo, password};

 fetch('/auth/register', {   
     method: 'POST',
     headers: { 
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
 }) 
 .then(res => res.json())
 .then((data) => {
       
     if (data.success) {
         msg.innerHTML = data.message;
         msg.style.backgroundColor = '#d1e7dd';
         msg.style.padding = '10px'
         msg.style.marginBottom = '4px';
         msg.style.textAlign = 'center'

         setInterval(() => {
            window.location.href = '/login' 
         }, 2000);
     }

     if (data.error) {
         msg.innerHTML = data.error;
         msg.style.backgroundColor = 'red';
         msg.style.padding = '10px'
         msg.style.marginBottom = '4px';
         msg.style.textAlign = 'center'
 
         setInterval(() => {
            window.location.href = '/'
         }, 2000);
     }

 })
 .catch((e)); 


 
})
