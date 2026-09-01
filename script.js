const wishListGoals = {
  'field-tools': { current: 2, target: 5 },
  'soil-kits': { current: 4, target: 10 },
  'ppe': { current: 8, target: 15 },
  'drone': { current: 1, target: 2 },
  'trailers': { current: 0, target: 1 },
  'comms': { current: 3, target: 6 }
};

function updateProgressUI() {
  document.querySelectorAll('.wishlist-card').forEach(card => {
    const itemKey = card.getAttribute('data-item');
    if (wishListGoals[itemKey]) {
      const { current, target } = wishListGoals[itemKey];
      const percent = Math.min(Math.round((current / target) * 100), 100);
      card.querySelector('.funded-text').innerText = `${current} / ${target} Funded`;
      card.querySelector('.percent-text').innerText = `${percent}%`;
      card.querySelector('.progress-bar').style.width = `${percent}%`;
    }
  });
}

function selectWishlistItem(itemValue) {
  const selectDropdown = document.querySelector('select[name="item"]');
  if (selectDropdown) {
    selectDropdown.value = itemValue;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
  
  const pledgeForm = document.querySelector('#donate-form form');
  if (pledgeForm) {
    pledgeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = pledgeForm.querySelector('button[type="submit"]');
      submitBtn.innerText = "Processing Pledge...";
      submitBtn.disabled = true;

      const formData = {
        name: pledgeForm.querySelector('input[name="name"]').value,
        email: pledgeForm.querySelector('input[name="email"]').value,
        item: pledgeForm.querySelector('select[name="item"]').value
      };

      setTimeout(() => {
        alert('Thank you! Your operational support pledge has been recorded.');
        if (wishListGoals[formData.item]) {
          wishListGoals[formData.item].current += 1;
          updateProgressUI();
        }
        pledgeForm.reset();
        submitBtn.innerText = "Submit Pledge";
        submitBtn.disabled = false;
      }, 800);
    });
  }
});
