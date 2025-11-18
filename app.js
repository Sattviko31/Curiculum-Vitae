document.addEventListener("DOMContentLoaded", () => {
    // --- DATA ---
    const data = {
        skills: [
            { id: "Desain Hardware & PCB", en: "Hardware & PCB Design", level: "90%", icon: "fas fa-microchip" },
            { id: "Pemrograman Mikrokontroler", en: "Microcontroller Programming", level: "85%", icon: "fas fa-robot" },
            { id: "PLC Otomasi Industri", en: "Industrial Automation PLC", level: "75%", icon: "fas fa-cogs" },
            { id: "Pemrograman", en: "Programming", level: "80%", icon: "fas fa-code" }
        ],
        experience: [
            { id: { title: "PT Goseki Manufacturing Indonesia", role: "Stamping & QA Operator" }, en: { title: "PT Goseki Manufacturing Indonesia", role: "Stamping & QA Operator" }, period: "2022–2023", logo: "goseki-logo.png" },
            { id: { title: "PT Samsung Electronic", role: "Experience Consultant" }, en: { title: "PT Samsung Electronic", role: "Experience Consultant" }, period: "2022", logo: "samsung-logo.png" },
            { id: { title: "PT Panasonic Manufacturing Indonesia", role: "Operator Assembling PCB" }, en: { title: "PT Panasonic Manufacturing Indonesia", role: "PCB Assembling Operator" }, period: "2020–2021", logo: "panasonic-logo.png" }
        ],
        education: [
            { id: { school: "Politeknik Elektronika Negeri Surabaya", major: "D3 Teknik Elektronika" }, en: { school: "Electronic Engineering Polytechnic Institut Of Surabaya", major: "D3 Electronics Engineering" }, period: "2023 – Sekarang", logo: "pens-logo.png" },
            { id: { school: "SMK Negeri 1 Bendo Magetan", major: "Teknik Audio Video" }, en: { school: "SMK Negeri 1 Bendo Magetan", major: "Audio Video Engineering" }, period: "2019 – 2022", logo: "smkn1bendo-logo.png" } 
        ],
        portfolio: [
            { id: 1, category: "hardware", img: "D:/Data Pribadi/Website/project-transformer.jpg", title: { id: "Sensor Minyak Transformator", en: "Transformer Oil Sensor" }, desc: { id: "Pengukuran kadar air transformator menggunakan sensor akustik dan analisis sinyal untuk deteksi dini kegagalan.", en: "Water content measurement in transformers using acoustic sensors and signal analysis for early failure detection." }, repo: "#", live: "#" },
            { id: 2, category: "robotics", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1llzJLQO-8FC7Jz7asS_zUtrQSNlQUs5Ow&s", title: { id: "Line Follower Analog", en: "Analog Line Follower" }, desc: { id: "Robot pelacak jalur berbasis sensor inframerah dan op-amp dengan tuning performa tinggi untuk kompetisi.", en: "An IR sensor and op-amp based line tracking robot with high-performance tuning for competitions." }, repo: "#", live: "" },
            { id: 3, category: "robotics", img: "https://i0.wp.com/sciencestore.pk/wp-content/uploads/2020/05/made-solver-robot-kit.jpg?fit=1600%2C1600&ssl=1", title: { id: "Maze Runner Robot", en: "Maze Runner Robot" }, desc: { id: "Robot cerdas yang mampu menavigasi labirin secara mandiri menggunakan sensor dan algoritma pencarian jalur.", en: "An intelligent robot capable of autonomously navigating a maze using sensors and pathfinding algorithms." }, repo: "#", live: "" },
            { id: 4, category: "iot", img: "D:/Data Pribadi/Website/project-iot-farm.jpg", title: { id: "Sistem Pertanian IoT", en: "IoT Farming System" }, desc: { id: "Sistem pemantauan dan irigasi otomatis berbasis IoT menggunakan sensor kelembaban tanah dan mikrokontroler ESP32.", en: "An IoT-based monitoring and automated irrigation system using soil moisture sensors and an ESP32 microcontroller." }, repo: "#", live: "#" }
        ],
        filters: [
            { id: "Semua", en: "All", key: "all" },
            { id: "Hardware", en: "Hardware", key: "hardware" },
            { id: "Robotika", en: "Robotics", key: "robotics" },
            { id: "IoT", en: "IoT", key: "iot" }
        ],
        contact: {
            id: { name: "Nama Anda", email: "Email Anda", message: "Pesan Anda", submit: "Kirim via WhatsApp" },
            en: { name: "Your Name", email: "Your Email", message: "Your Message", submit: "Send via WhatsApp" }
        }
    };

    // --- RENDER FUNCTIONS ---
    const renderSkills = (lang) => {
        const container = document.querySelector('#skills .skills-grid');
        if (!container) return;
        container.innerHTML = data.skills.map(skill => `
            <div class="skill-item">
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <div class="skill-details">
                    <p>${skill[lang]}</p>
                    <div class="skill-bar"><div class="skill-level" data-level="${skill.level}"></div></div>
                </div>
            </div>
        `).join('');
    };

    const renderTimeline = (section, lang) => {
        const container = document.querySelector(`#${section} .timeline`);
        if (!container) return;
        container.innerHTML = data[section].map(item => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <img src="${item.logo}" alt="${item[lang].title || item[lang].school} Logo" class="timeline-logo">
                    <div class="timeline-text">
                        <h3>${item[lang].title || item[lang].school}</h3>
                        <p class="timeline-role">${item[lang].role || item[lang].major}</p>
                        <span class="timeline-period">${item.period}</span>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderPortfolio = (lang) => {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;
        grid.innerHTML = data.portfolio.map(item => `
            <div class="item" data-category="${item.category}" data-id="${item.id}" style="background-image: url('${item.img}')">
                <div class="item-overlay">
                    <h3>${item.title[lang]}</h3>
                    <p class="hover-info">${lang === 'id' ? 'Lihat Detail' : 'View Details'}</p>
                </div>
            </div>
        `).join('');
        addModalEventListeners();
    };

    const renderFilters = (lang) => {
        const container = document.querySelector('.filter-buttons');
        if (!container) return;
        container.innerHTML = data.filters.map((filter, index) => `
            <button class="${index === 0 ? 'active' : ''}" data-filter="${filter.key}">${filter[lang]}</button>
        `).join('');
        addFilterEventListeners();
    };

    const updateContactForm = (lang) => {
        const contactLang = data.contact[lang];
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        const submitButton = document.getElementById('contact-submit');

        if (nameInput) nameInput.placeholder = contactLang.name;
        if (emailInput) emailInput.placeholder = contactLang.email;
        if (messageInput) messageInput.placeholder = contactLang.message;
        if (submitButton) submitButton.textContent = contactLang.submit;
    };

    // --- EVENT LISTENERS & MODAL ---
    const addFilterEventListeners = () => {
        const filterButtons = document.querySelectorAll('.filter-buttons button');
        const portfolioItems = document.querySelectorAll('.portfolio-grid .item');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
                });
            });
        });
    };

    const addModalEventListeners = () => {
        document.querySelectorAll('.portfolio-grid .item').forEach(item => {
            item.addEventListener('click', () => openModal(item.dataset.id));
        });
    };

    const modal = document.getElementById('portfolio-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');

    const openModal = (id) => {
        const lang = document.documentElement.lang;
        const project = data.portfolio.find(p => p.id == id);
        if (!project || !modal) return;

        document.getElementById('modal-title').textContent = project.title[lang];
        document.getElementById('modal-image').src = project.img;
        document.getElementById('modal-description').textContent = project.desc[lang];
        
        const repoLink = document.getElementById('modal-link-repo');
        const liveLink = document.getElementById('modal-link-live');
        
        repoLink.href = project.repo;
        repoLink.style.display = project.repo && project.repo !== '#' ? 'inline-block' : 'none';
        
        liveLink.href = project.live;
        liveLink.style.display = project.live && project.live !== '#' ? 'inline-block' : 'none';

        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    // --- CONTACT FORM (WHATSAPP) ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const lang = document.documentElement.lang;

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !message) {
                alert(lang === 'id' ? 'Harap isi semua kolom.' : 'Please fill in all fields.');
                return;
            }

            const phoneNumber = "6285851574689";
            const template = lang === 'id' 
                ? `Halo Sattviko,\n\nNama saya *${name}*.\nEmail: *${email}*.\n\nPesan:\n${message}`
                : `Hello Sattviko,\n\nMy name is *${name}*.\nEmail: *${email}*.\n\nMessage:\n${message}`;
            
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(template)}`;
            
            window.open(whatsappURL, '_blank');
            form.reset();
        });
    }

    // --- GENERAL & INITIALIZATION ---
    const toggleBtn = document.getElementById('toggleBtn');
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    const setInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.body.className = savedTheme + '-theme';
        if (toggleBtn) toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌓';
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            let newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            document.body.className = newTheme + '-theme';
            toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌓';
            localStorage.setItem('theme', newTheme);
        });
    }

    window.onscroll = () => {
        if (scrollTopBtn) {
            scrollTopBtn.style.display = (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) ? "block" : "none";
        }
    };
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    entry.target.querySelectorAll('.skill-level').forEach(skill => {
                        skill.style.width = skill.getAttribute('data-level');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(section => observer.observe(section));

    const typingTextEl = document.getElementById("typingText");
    const typingTexts = {
        id: "Halo, Selamat Datang di Curriculum Vitae Saya",
        en: "Hello, Welcome to My Curriculum Vitae"
    };
    let typeTimeout;

    function startTyping(lang) {
        if (!typingTextEl) return;
        const text = typingTexts[lang];
        let index = 0;
        typingTextEl.textContent = '';
        clearTimeout(typeTimeout);
        const typeChar = () => {
            if (index < text.length) {
                typingTextEl.textContent += text.charAt(index++);
                typeTimeout = setTimeout(typeChar, 100);
            }
        };
        typeChar();
    }

    function switchTo(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[lang="id"], [lang="en"]').forEach(el => {
            el.style.display = el.getAttribute('lang') === lang ? '' : 'none';
        });
        
        // Re-render dynamic content
        // renderSkills(lang); // This is now static in HTML
        // renderTimeline('experience', lang); // This is now static in HTML
        // renderTimeline('education', lang); // This is now static in HTML
        renderPortfolio(lang);
        renderFilters(lang);
        updateContactForm(lang);
        
        localStorage.setItem('lang', lang);
        startTyping(lang);

        // Update language button active state
        const langIdBtn = document.getElementById('lang-id');
        const langEnBtn = document.getElementById('lang-en');
        if (lang === 'id') {
            langIdBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langEnBtn.classList.add('active');
            langIdBtn.classList.remove('active');
        }
    }

    const savedLang = localStorage.getItem('lang') || 'id';
    
    document.getElementById('lang-id')?.addEventListener('click', () => switchTo('id'));
    document.getElementById('lang-en')?.addEventListener('click', () => switchTo('en'));

    // Initial Load
    setInitialTheme();
    switchTo(savedLang);
});