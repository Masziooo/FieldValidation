const form = document.getElementById('form');
const username = document.getElementById('name');
const surname = document.getElementById('surname');
const idnumber = document.getElementById('idnumber');
const birthDate = document.getElementById('birthDate');


form.addEventListener('submit', (e) => {
    isInputCorrect();
    e.preventDefault();
});

const isInputCorrect = () => {
    if (username.value === '' || username.value.length > 20) {
        setError(username, 'Field is incorrect');
    } else {
        setSuccess(username, 'Success');
    }

    if (surname.value === '' || surname.value.length > 30) {
        setError(surname, 'Field is incorrect');
    } else {
        setSuccess(surname, 'Success');
    }

    if (idnumber.value.length === 11) {
        setSuccess(idnumber, 'Success');
        birthDate.value = dateOutOfID(idnumber).date.toISOString().substr(0,10);
    } else {
        setError(idnumber, 'Field is incorrect');
    }
};

const setError = (input, message) => {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	small.innerText = message;
    formControl.className = 'form-container error';
};

const setSuccess = (input, message) => {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	small.innerText = message;
    formControl.className = 'form-container success';
};

const dateOutOfID = idnumber => {
   let year = parseInt(idnumber.value.substring(0,2),10);
   let month = parseInt(idnumber.value.substring(2,4),10)-1;
   let day = parseInt(idnumber.value.substring(4,6),10);
   
   if (month>80) {
        year = year + 1800;
        month = month - 80;
   }
   else if (month > 60) {
        year = year + 2200;
        month = month - 60;
   }
   else if (month > 40) {
        year = year + 2100;
        month = month - 40;
   }
   else if (month > 20) {
        year = year + 2000;
        month = month - 20;
   }
   else {
        year += 1900;
   }

   let born = new Date();
   born.setFullYear(year, month, day);

   return {date: born}
};