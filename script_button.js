<style>
.age-verification {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.age-verification-content {
  background: black;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  width: 24rem;
  position: relative;
}

.age-verification-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
}

.age-verification-title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #fbbf24;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.age-verification-subtitle {
  color: white;
  margin-bottom: 1.5rem;
}

.age-verification-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.age-verification-input {
  background: black;
  border: 1px solid #374151;
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: white;
  width: 100%;
}

.age-verification-button {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background: white;
  border: none;
  transition: background-color 0.2s;
}

.age-verification-button.green {
  background: #22c55e;
}

.age-verification-error {
  color: #ef4444;
  text-align: center;
  margin-bottom: 1rem;
  display: none;
}

.age-verification-footer {
  color: #9ca3af;
  font-size: 0.875rem;
  text-align: center;
}
</style>
<div id="ageVerification" class="age-verification" style="display: none;">
  <div class="age-verification-content">
    <button class="age-verification-close">&times;</button>
    <h2 class="age-verification-title">Are you over 18 years old?</h2>
    <p class="age-verification-subtitle">Please verify your age to enter this site.</p>
    <div class="age-verification-inputs">
      <input type="number" placeholder="MM" class="age-verification-input" id="month">
      <input type="number" placeholder="DD" class="age-verification-input" id="day">
      <input type="number" placeholder="YYYY" class="age-verification-input" id="year">
    </div>
    <button class="age-verification-button" id="verifyButton">I am 18+</button>
    <p class="age-verification-error" id="error"></p>
    <p class="age-verification-footer">By entering this website, you agree to our terms of use and privacy policy.</p>
  </div>
</div>
<script>
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
</script>
