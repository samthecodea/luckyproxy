        // === CONFIGURATION ===
        const WHATSAPP_NUMBER = "6285715401386"; // GANTI DENGAN NOMOR WA ANDA (Pakai awalan 62)
        
        // Variables
        let timerInterval;
        let currentProduct = "";
        let currentPrice = "";

        // UI Functions
        function openPayment(product, price) {
            currentProduct = product;
            currentPrice = "Rp " + price.toLocaleString('id-ID');
            document.getElementById('modal-product').innerText = `${product} Edition - ${currentPrice}`;
            
            // Reset state
            document.getElementById('proof-file').value = "";
            document.getElementById('upload-text').innerText = "Klik untuk memilih gambar";
            document.getElementById('upload-icon').className = "fas fa-cloud-upload-alt text-2xl text-emerald-500 mb-2";
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";

            // Show modal
            const modal = document.getElementById('payment-modal');
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            
            startTimer(600); // 10 minutes (600 seconds)
        }

        function closePayment() {
            const modal = document.getElementById('payment-modal');
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
            clearInterval(timerInterval);
        }

        // Timer Logic
        function startTimer(duration) {
            clearInterval(timerInterval);
            let timer = duration, minutes, seconds;
            const display = document.getElementById('payment-timer');
            
            timerInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    clearInterval(timerInterval);
                    display.textContent = "KADALUARSA";
                    document.getElementById('submit-btn').disabled = true;
                    document.getElementById('submit-btn').style.opacity = "0.5";
                }
            }, 1000);
        }

        // File Upload Handling
        function handleFileUpload(input) {
            if (input.files && input.files[0]) {
                const fileName = input.files[0].name;
                document.getElementById('upload-text').innerText = fileName;
                document.getElementById('upload-icon').className = "fas fa-image text-2xl text-emerald-400 mb-2";
                
                // Enable button
                const submitBtn = document.getElementById('submit-btn');
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitBtn.style.cursor = "pointer";
            }
        }

        // Generate License Key
        function generateKey() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let key = 'LUCKY-';
            for (let i = 0; i < 4; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
            key += '-';
            for (let i = 0; i < 4; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
            key += '-';
            for (let i = 0; i < 4; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
            return key;
        }

        // Process & Redirect
        function processPayment() {
            clearInterval(timerInterval);
            const overlay = document.getElementById('loading-overlay');
            const modal = document.getElementById('payment-modal');
            
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
            
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);

            const generatedKey = generateKey();
            
            // Construct WA Message
            const waMessage = `Halo Admin *Lucky Proxy*! 🍀\n\nSaya telah melakukan pembayaran dan ingin mengklaim produk saya.\n\n` + 
                              `📦 *Produk:* ${currentProduct} Edition\n` +
                              `💰 *Harga:* ${currentPrice}\n` +
                              `🔑 *Ticket Key:* ${generatedKey}\n\n` +
                              `_Berikut saya lampirkan gambar bukti transfer saya pada chat ini._\n\nMohon segera diproses, terima kasih!`;

            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

            // Simulate processing delay
            setTimeout(() => {
                document.getElementById('loading-text').innerText = "Mengalihkan ke WhatsApp... Jangan lupa kirim gambarnya di chat!";
                document.querySelector('.animate-spin').classList.replace('border-emerald-500', 'border-green-500');
                
                setTimeout(() => {
                    window.open(waLink, '_blank');
                    overlay.classList.add('opacity-0');
                    setTimeout(() => overlay.classList.add('hidden'), 500);
                }, 1500);
            }, 2000);
        }