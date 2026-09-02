document.addEventListener("DOMContentLoaded", () => {
  // Wish list funding tracker mock data mapping
  // Update these numbers dynamically to reflect real pledge counts
  const fundingData = {
    "field-tools": { funded: 2, total: 5 },
    "soil-kits": { funded: 4, total: 10 },
    "ppe": { funded: 9, total: 15 },
    "drone": { funded: 1, total: 2 },
    "trailers": { funded: 1, total: 1 },
    "comms": { funded: 3, total: 6 }
  };

  // Update DOM elements for wish list items
  const wishlistCards = document.querySelectorAll(".wishlist-card");
  
  wishlistCards.forEach(card => {
    const itemKey = card.getAttribute("data-item");
    if (fundingData[itemKey]) {
      const { funded, total } = fundingData[itemKey];
      const percent = Math.round((funded / total) * 100);
      
      const fundedText = card.querySelector(".funded-text");
      const percentText = card.querySelector(".percent-text");
      const progressBar = card.querySelector(".progress-bar");
      
      if (fundedText) fundedText.textContent = `${funded} / ${total} Funded`;
      if (percentText) percentText.textContent = `${percent}%`;
      if (progressBar) progressBar.style.width = `${percent}%`;
    }
  });

  // Handle Form Submission with EmailJS integration hook
  const donationForm = document.querySelector("#donate-form form");
  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameInput = donationForm.querySelector("input[name='name']").value;
      const emailInput = donationForm.querySelector("input[name='email']").value;
      const itemSelect = donationForm.querySelector("select[name='item']").value;

      // Ensure EmailJS is initialized with a live public key before dispatching
      // emailjs.send("service_id", "template_id", { name: nameInput, email: emailInput, item: itemSelect })
      
      alert(`Thank you, ${nameInput}! Your pledge to support our ${itemSelect.replace("-", " ")} initiative has been submitted. We will follow up via ${emailInput}.`);
      donationForm.reset();
    });
  }
});
