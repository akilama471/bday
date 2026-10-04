document.addEventListener('DOMContentLoaded', () => {
    // Background Particles Setup
    const container = document.getElementById('particles-container');
    const particleCount = 35;
    
    // Mix of hearts, stars, and sparkles
    const elements = ['❤️', '✨', '💖', '🌟', '🌸', '💕'];

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, Math.random() * 5000); // Stagger initial creation
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize particle content
        particle.innerText = elements[Math.floor(Math.random() * elements.length)];
        
        // Randomize position, size, and animation duration
        const size = Math.random() * 1.2 + 0.6;
        particle.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 8 + 6; // 6 to 14 seconds
        particle.style.animationDuration = duration + 's';
        
        particle.style.transform = `scale(${size})`;
        // Adding a slight blur to some background particles for depth
        if (Math.random() > 0.5) {
            particle.style.filter = 'blur(1px)';
        }
        
        container.appendChild(particle);

        // Remove and recreate particle after animation ends to keep it infinite
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }

    // Card Interaction Setup
    const openBtn = document.getElementById('open-btn');
    const cardFront = document.querySelector('.card-front');
    const cardInside = document.getElementById('inside-message');
    const card = document.getElementById('birthday-card');

    openBtn.addEventListener('click', () => {
        // Trigger Confetti effect
        fireConfetti();

        // Animate card transition
        cardFront.classList.add('fade-out');
        
        setTimeout(() => {
            // Hide front, show inside
            cardFront.classList.add('hidden');
            cardFront.classList.remove('fade-out');
            
            cardInside.classList.remove('hidden');
            
            // Add a fun 3D spin effect to the card when opening
            card.classList.add('spin-in');
            
            setTimeout(() => {
                card.classList.remove('spin-in');
            }, 1000);
            
        }, 500); // Wait for fade out
    });

    function fireConfetti() {
        const duration = 4000;
        const end = Date.now() + duration;

        (function frame() {
            // Left side confetti
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#ff4b72', '#ff8fa3', '#ffffff', '#ffd700', '#ffb6c1']
            });
            // Right side confetti
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#ff4b72', '#ff8fa3', '#ffffff', '#ffd700', '#ffb6c1']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});
