/* 
  Full Potential Animation Suite 
  - Cosmos Background
  - 3D Tilt Cards
  - Stardust Cursor Trail
  - Magnetic Scroll Reveal
*/

document.addEventListener('DOMContentLoaded', function () {
    // initCosmosAnimation(); // Disabled as per user request to remove "Video BG"
    initCinematicText();
    initTiltEffect();
    initMagneticCursor(); // Updated to Magnetic Cursor
    initScrollReveal();
});

/* =========================================
   1. Cosmos Background (Starfield + Shooting Stars)
   ========================================= */
function initCosmosAnimation() {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let shootingStars = [];

    // Configuration
    const starCount = 300;
    const shootingStarInterval = 2000; // ms
    let lastShootingStarTime = 0;

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX - width / 2) * 0.02;
        targetMouseY = (e.clientY - height / 2) * 0.02;
    });

    // Star Class
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 2 + 0.5; // Depth factor
            this.size = Math.random() * 1.5;
            this.brightness = Math.random();
            this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        }

        update() {
            // Parallax movement
            this.x += (mouseX * this.z - (width / 2 * 0.001)) * 0.05; // Gentle drift
            this.y += (mouseY * this.z - (height / 2 * 0.001)) * 0.05;

            // Wrap around
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Twinkle
            this.brightness += this.twinkleSpeed;
            if (this.brightness > 1 || this.brightness < 0) {
                this.twinkleSpeed *= -1;
            }
        }

        draw() {
            const alpha = Math.abs(this.brightness);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * this.z * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Shooting Star Class
    class ShootingStar {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height * 0.5; // Start in top half
            this.length = Math.random() * 80 + 20;
            this.speed = Math.random() * 10 + 5;
            this.angle = Math.PI / 4; // 45 degrees
            this.opacity = 1;
            this.dead = false;
        }

        update() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);

            this.opacity -= 0.01;
            if (this.opacity <= 0 || this.x > width || this.y > height) {
                this.dead = true;
            }
        }

        draw() {
            if (this.dead) return;
            const endX = this.x - this.length * Math.cos(this.angle);
            const endY = this.y - this.length * Math.sin(this.angle);

            const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.lineWidth = 2;
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

    // Initialize Stars
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    // Animation Loop
    function animate(now) {
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse movement
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;

        // Draw Stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        // Spawn Shooting Stars
        if (now - lastShootingStarTime > shootingStarInterval) {
            if (Math.random() > 0.5) { // 50% chance per interval
                shootingStars.push(new ShootingStar());
                lastShootingStarTime = now;
            }
        }

        // Draw Shooting Stars
        shootingStars.forEach((star, index) => {
            star.update();
            star.draw();
            if (star.dead) {
                shootingStars.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate(0);
}

/* =========================================
   2. Cinematic Text Reveal (Formerly Glitch)
   ========================================= */
// initGlitchEffect and initHackerText removed for cleaner aesthetic

function initTiltEffect() {
    if (window.innerWidth < 992) return; // Disable on mobile

    // Targeted elements for tilt
    // Removed .progress-wrap to keep skill bars clean/floaty as requested
    const targets = document.querySelectorAll('.services, .panel, .about-desc, .hire');

    targets.forEach(card => {
        card.classList.add('tilt-card');
        card.classList.add('neon-glow'); // Add neon pulsing

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt angle
            // Limit tilt to 10 degrees max
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
}

/* =========================================
   4. Stardust Cursor Trail
   ========================================= */
/* =========================================
   4. Futuristic Magnetic Cursor
   ========================================= */
function initMagneticCursor() {
    if (window.innerWidth < 992) return; // Disable on mobile to prevent lag

    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor2');

    if (!cursor || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate update for core dot
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Electric Spark Generation
        if (Math.random() < 0.2) { // 20% chance per frame/move event
            createSpark(mouseX, mouseY);
        }
    });

    function createSpark(x, y) {
        const spark = document.createElement('div');
        spark.classList.add('electric-spark');
        document.body.appendChild(spark);

        spark.style.left = x + 'px';
        spark.style.top = y + 'px';

        // Random direction for spark
        const tx = (Math.random() - 0.5) * 50 + 'px'; // -25px to +25px
        const ty = (Math.random() - 0.5) * 50 + 'px';

        spark.style.setProperty('--tx', tx);
        spark.style.setProperty('--ty', ty);

        // Cleanup
        setTimeout(() => {
            spark.remove();
        }, 600);
    }

    // Smooth physics loop for the ring
    function animateRing() {
        // Linear interpolation (Lerp) for delay
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Magnetic Snapping Logic
    const targets = document.querySelectorAll('a, button, .btn, .services, .project');

    targets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('magnet');
            cursorRing.classList.add('magnet');
        });

        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('magnet');
            cursorRing.classList.remove('magnet');
        });
    });
}


/* =========================================
   5. Smooth Scroll Reveal (Intersection Observer)
   ========================================= */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe logical blocks
    const targets = document.querySelectorAll('section, .row, .services, .about-desc, .timeline-entry');
    targets.forEach(t => {
        t.classList.add('scroll-reveal');
        observer.observe(t);
    });
}


/* =========================================
   6. Hacker Decoding Text Effect
   ========================================= */
function initHackerText() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const targets = document.querySelectorAll('h1, h2'); // Apply to main headers

    targets.forEach(header => {
        // Store original text
        header.dataset.value = header.innerText;

        header.onmouseover = event => {
            let iterations = 0;
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText.split('')
                    .map((letter, index) => {
                        if (index < iterations) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join('');

                if (iterations >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }

                iterations += 1 / 3;
            }, 30);
        }

        // Trigger once on load for effect
        // (Optional: can comment this out if it's too much noise on load)
        header.onmouseover({ target: header });
    });
}



/* =========================================
   6. Cinematic Text Reveal (Elegant)
   ========================================= */
function initCinematicText() {
    const headings = document.querySelectorAll('#colorlib-hero h1, #colorlib-hero h2');
    headings.forEach((h, index) => {
        h.style.opacity = '0';
        h.style.transform = 'translateY(20px)';
        h.style.transition = 'all 1s ease-out';
        h.style.filter = 'blur(10px)';

        setTimeout(() => {
            h.style.opacity = '1';
            h.style.transform = 'translateY(0)';
            h.style.filter = 'blur(0)';
        }, 500 + (index * 300)); // Staggered reveal
    });
}

