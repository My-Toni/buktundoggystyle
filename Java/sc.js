    AOS.init({
      duration: 800,
      once: true
    });  
    
    function toggleMenu() {  
      var menu = document.getElementById("menu");  
      menu.style.display = menu.style.display === "block" ? "none" : "block";  
    }  

    const textElement = document.getElementById("typewriter-text");  
    const texts = ["Welcome to Toni"];  
    let textIndex = 0;  
    let charIndex = 0;  
    let isDeleting = false;  

    function typeEffect() {  
      const currentText = texts[textIndex];  
      if (isDeleting) {  
        charIndex--;  
        textElement.innerHTML = "<strong>" + currentText.substring(0, charIndex) + "</strong>";  
      } else {  
        charIndex++;  
        textElement.innerHTML = "<strong>" + currentText.substring(0, charIndex) + "</strong>";  
      }  

      if (!isDeleting && charIndex === currentText.length) {  
        isDeleting = true;  
        setTimeout(typeEffect, 1000);  
      } else if (isDeleting && charIndex === 0) {  
        isDeleting = false;  
        textIndex = (textIndex + 1) % texts.length;  
        setTimeout(typeEffect, 300);  
      } else {  
        setTimeout(typeEffect, isDeleting ? 50 : 100);  
      }  
    }  

    typeEffect();

    $(document).ready(function(){
      $('.testimonial-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true
      });
    });
    
    // Modal functions
    function openModal() {
      document.getElementById('checkoutModal').style.display = 'block';
    }
    
    function closeModal() {
      document.getElementById('checkoutModal').style.display = 'none';
    }
    
    function selectPayment(method) {
      // Remove selected class from all
      document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Add selected class to clicked one
      event.currentTarget.classList.add('selected');
      document.getElementById('payment-method').value = method;
    }
    
    // Voucher codes and discounts
    const vouchers = {
      'VIPTRADE2025': 5,
      'GETDISCOUNT': 3,
      'BukKesTobrutMode': 50,
      'BukTunBodyGoals': 50,
      'BukPutriGyatt': 50
    };
    
    let appliedVoucher = null;
    const basePrice = 100000;
    
    function applyVoucher() {
      const voucherCode = document.getElementById('voucher').value.trim();
      const voucherError = document.getElementById('voucher-error');
      
      if (vouchers[voucherCode]) {
        appliedVoucher = {
          code: voucherCode,
          discount: vouchers[voucherCode]
        };
        voucherError.style.display = 'none';
        updateFinalPrice();
      } else {
        appliedVoucher = null;
        voucherError.style.display = 'block';
        updateFinalPrice();
      }
    }
    
    function updateFinalPrice() {
      let finalPrice = basePrice;
      let discountText = '';
      
      if (appliedVoucher) {
        const discountAmount = (basePrice * appliedVoucher.discount) / 100;
        finalPrice = basePrice - discountAmount;
        discountText = ` (Diskon ${appliedVoucher.discount}% dengan kode ${appliedVoucher.code})`;
      }
      
      document.getElementById('final-price').innerHTML = 
        `Total: Rp ${finalPrice.toLocaleString('id-ID')}${discountText}`;
    }
    
    function validateForm() {
      let isValid = true;
      
      // Validate email
      const email = document.getElementById('email').value;
      const emailError = document.getElementById('email-error');
      if (!email || !email.includes('@') || !email.includes('.')) {
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailError.style.display = 'none';
      }
      
      // Validate password
      const password = document.getElementById('password').value;
      const passwordError = document.getElementById('password-error');
      if (!password || password.length < 6) {
        passwordError.style.display = 'block';
        isValid = false;
      } else {
        passwordError.style.display = 'none';
      }
      
      // Validate payment method
      const paymentMethod = document.getElementById('payment-method').value;
      const paymentError = document.getElementById('payment-error');
      if (!paymentMethod) {
        paymentError.style.display = 'block';
        isValid = false;
      } else {
        paymentError.style.display = 'none';
      }
      
      return isValid;
    }
    
    function processOrder() {
      if (!validateForm()) return;
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const paymentMethod = document.getElementById('payment-method').value;
      const voucherCode = appliedVoucher ? appliedVoucher.code : 'Tidak ada';
      
      let finalPrice = basePrice;
      if (appliedVoucher) {
        finalPrice = basePrice - ((basePrice * appliedVoucher.discount) / 100);
      }
      
      const message = `Halo min, saya mau join VIP%0A%0A` +
        `Email: ${email}%0A` +
        `Password: ${password}%0A` +
        `Metode Pembayaran: ${paymentMethod.toUpperCase()}%0A` +
        `Kode Voucher: ${voucherCode}%0A` +
        `Total Pembayaran: Rp ${finalPrice.toLocaleString('id-ID')}%0A%0A` +
        `Saya sudah siap melakukan pembayaran.`;
      
      window.open(`https://wa.me/62881026788157?text=${message}`, '_blank');
      closeModal();
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
      if (event.target == document.getElementById('checkoutModal')) {
        closeModal();
      }
    }