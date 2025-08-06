// CrossFit Barn - JavaScript Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Configurações para animações de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer para animações fade-in-up
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos os elementos com fade-in-up
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito parallax no hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Header transparente ao rolar com throttle para performance
    let ticking = false;
    
    function updateHeader() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(151, 63, 29, 0.4)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        ticking = false;
    }

    function requestHeaderUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestHeaderUpdate);

    // Contador animado para estatísticas (se adicionadas)
    function animateCounter(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const step = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, step);
    }

    // Efeito de hover nos cards com delay
    const cards = document.querySelectorAll('.card, .pricing-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Easter egg: Efeito especial ao clicar no logo
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        clickCount++;
        
        this.style.transform = 'scale(1.2) rotate(360deg)';
        this.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
        
        // Se clicar 5 vezes, adiciona confete (efeito especial)
        if (clickCount === 5) {
            createConfetti();
            clickCount = 0;
        }
    });

    // Função para criar confete (easter egg)
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            createConfettiPiece();
        }
    }

    function createConfettiPiece() {
        const confetti = document.createElement('div');
        const colors = ['#973F1D', '#C29765', '#2A3622', '#B8543A']; // Cores da empresa
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    } {
            confetti.remove();
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }

    // Adicionar animação CSS para confete
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        /* Modo escuro adicional */
        .dark-mode {
            --primary-rust: #B8543A;
            --warm-beige: #D4A876;
        }
        
        .dark-mode body {
            background: linear-gradient(135deg, #0D0D0D 0%, #1F2419 100%);
        }
        
        .dark-mode .card {
            background: linear-gradient(135deg, rgba(13, 13, 13, 0.9), rgba(31, 36, 25, 0.7));
        }
    `;
    document.head.appendChild(style);
    document.head.appendChild(style);

    // Validação simples para formulário de contato (se adicionado)
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar validação e envio do formulário
            alert('Obrigado pelo interesse! Em breve entraremos em contato.');
        });
    });

    // Loading das imagens com lazy loading
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Performance: Debounce para resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Ajustar hero height no resize
    const handleResize = debounce(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.height = `${window.innerHeight}px`;
        }
    }, 250);

    window.addEventListener('resize', handleResize);
});

// Efeito de abertura das portas do celeiro no carregamento
window.addEventListener('load', () => {
    setTimeout(() => {
        const doors = document.querySelectorAll('.barn-door');
        doors.forEach(door => {
            if (door.classList.contains('left')) {
                door.style.transform = 'translateX(-100%)';
            } else {
                door.style.transform = 'translateX(100%)';
            }
        });
        
        // Adicionar classe para indicar que a página carregou
        document.body.classList.add('loaded');
    }, 500);
});

// Adicionar suporte para modo escuro (opcional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Restaurar preferência de modo escuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}