document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('ageVerified') === 'true') {
    return;
  }

  const popup = document.getElementById('ageVerification');
  const closeBtn = popup.querySelector('.age-verification-close');
  const verifyBtn = document.getElementById('verifyButton');
  const monthInput = document.getElementById('month'); 
  const dayInput = document.getElementById('day');
  const yearInput = document.getElementById('year');
  const errorText = document.getElementById('error');

  popup.style.display = 'flex';

  function calculateAge(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function checkInputs() {
    if (dayInput.value && monthInput.value && yearInput.value) {
      verifyBtn.classList.add('green');
      errorText.style.display = 'none';
    } else {
      verifyBtn.classList.remove('green');
    }
  }

  [dayInput, monthInput, yearInput].forEach(input => {
    input.addEventListener('input', checkInputs);
  });

  closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
  });

  verifyBtn.addEventListener('click', function() {
    if (!dayInput.value || !monthInput.value || !yearInput.value) {
      errorText.textContent = 'Please enter a valid date.';
      errorText.style.display = 'block';
      return;
    }

    const age = calculateAge(
      parseInt(dayInput.value),
      parseInt(monthInput.value), 
      parseInt(yearInput.value)
    );

    if (age >= 18) {
      localStorage.setItem('ageVerified', 'true');
      popup.style.display = 'none';
    } else {
      errorText.textContent = 'You must be 18 or older to enter this site. You are not old enough to view this content 😔. See you next year?';
      errorText.style.display = 'block';
    }
  });
});
