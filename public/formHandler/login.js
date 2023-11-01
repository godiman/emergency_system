const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const emailErr = document.querySelector('.emailErr')
    const passwordErr = document.querySelector('.passwordErr')

    const msg = document.querySelector('.msg')


    emailErr.innerHTML = '';
    passwordErr.innerHTML = ''; 

    const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

 
    if (!email_Reg.test(email)) {
        emailErr.innerHTML = 'Invalid Email Address Entered';
        throw Error('Terminating');
    }
    if (!pwdReg.test(password)) {
        passwordErr.innerHTML = 'Enter a Strong Password';
        throw Error('Terminating'); 
    }

    const data = {email, password};

    fetch('/auth/login', {
        method: 'Post',
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
            msg.style.marginBottom = '10px';
            msg.style.textAlign = 'center';

            setInterval(() => {
                window.location.href = '/dash'
             }, 2000);

        }
        if (data.error) { 
            msg.innerHTML = data.error;
            msg.style.backgroundColor = 'red';
            msg.style.padding = '10px'
            msg.style.marginBottom = '4px';
            msg.style.textAlign = 'center'

            setInterval(() => {
               window.location.href = '/';
            }, 2000);
        }
    })
    .catch((e) => {
    })


});