document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect (Customized for Pragati)
    const texts = ["Graphic Designer", "Visual Storyteller", "Creative Thinker"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    
    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        document.querySelector('.typewriter').textContent = letter;
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait 2s before clearing
        } else {
            setTimeout(type, 100);
        }
    })();

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // 3. Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check local storage
    if(localStorage.getItem('theme') === 'light') {
        body.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // 4. Scroll Reveal & Active Link
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');
    
    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Highlight Nav
                let current = entry.target.getAttribute('id');
                navLi.forEach(li => {
                    li.classList.remove('active');
                    if(li.getAttribute('href').includes(current)){
                        li.classList.add('active');
                    }
                });

                // Trigger Animations
                const hiddenElements = entry.target.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
                hiddenElements.forEach(el => el.classList.add('show'));

                // Trigger Skill Bars
                if (current === 'skills') {
                    const skillBars = document.querySelectorAll('.bar span');
                    skillBars.forEach(bar => {
                        if(bar.classList.contains('adobe')) bar.style.width = "90%";
                        if(bar.classList.contains('branding')) bar.style.width = "85%";
                        if(bar.classList.contains('ui')) bar.style.width = "75%";
                    });
                }

                // Trigger Counters
                if (current === 'about') {
                    const counters = document.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const increment = target / 100;
                        
                        const updateCounter = () => {
                            const c = +counter.innerText;
                            if(c < target) {
                                counter.innerText = Math.ceil(c + increment);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 5. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + "%";
        
        // Navbar blur effect
        const navbar = document.querySelector('.navbar');
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
});