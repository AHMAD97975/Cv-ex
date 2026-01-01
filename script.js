

// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger-menu');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (!backdrop) {
        createMobileMenuBackdrop();
    } else {
        backdrop.classList.toggle('active');
    }
}

function createMobileMenuBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.onclick = toggleMobileMenu;
    document.body.appendChild(backdrop);
    backdrop.classList.add('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger-menu');
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
        }
    });
});

// Also update the existing smooth scroll to close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        }
    });
});



// Language toggle functionality with comprehensive translations
let currentLang = "ar";

// Comprehensive translation dictionary
const translations = {


  // Footer Translations
  "مصمم بتفانٍ بواسطة": "Designed with passion by",
  "نحو التميز دائماً": "Towards Excellence Always",
  "الرئيسية": "Home",
  "تواصل": "Contact",
  "تحميل السيرة": "Download CV",
  "English": "العربية",
  "العربية": "English",


// في ملف script.js، أضف هذه الترجمات في كائن 
  // ... الترجمات الحالية ...
  
  // Personal Information
  "الهاتف": "Phone",
  "البريد الإلكتروني": "Email",
  "العنوان": "Location",
  "الشركة الحالية": "Current Company",
  "دبي، الإمارات العربية المتحدة": "Dubai, United Arab Emirates",
  
  // ... باقي الترجمات ...

  
  // MOH Responsibilities
  "مدير مشروع إعادة هندسة الخدمات": "Service Reengineering Project Manager",
  "قيادة مشروع شامل لإعادة تصميم وتحسين 151 خدمة حكومية":
    "Leading a comprehensive project to redesign and improve 151 government services",
  "تطبيق منهجيات التصميم المرتكز على الإنسان (Human-Centered Design)":
    "Applying Human-Centered Design methodologies",
  "تحليل رحلة العميل وتحديد نقاط الألم وفرص التحسين":
    "Analyzing customer journey and identifying pain points and improvement opportunities",
  "تطوير نماذج أولية واختبارها مع المستخدمين":
    "Developing prototypes and testing them with users",

  "تأسيس قسم قيادة الخدمات": "Establishing Service Leadership Department",
  "إنشاء وتأسيس قسم متخصص لقيادة وتحسين الخدمات الحكومية":
    "Creating and establishing a specialized department for leading and improving government services",
  "تطوير استراتيجيات وسياسات إدارة الخدمات":
    "Developing service management strategies and policies",
  "بناء فريق عمل متخصص وتدريبه على أفضل الممارسات":
    "Building a specialized team and training it on best practices",
  "وضع معايير قياس جودة الخدمات ومتابعة الأداء":
    "Setting service quality measurement standards and performance monitoring",

  "تأسيس قسم الاستدامة والمسؤولية الاجتماعية":
    "Establishing Sustainability and Social Responsibility Department",
  "تأسيس قسم جديد لتعزيز الاستدامة المؤسسية":
    "Establishing a new department to enhance institutional sustainability",
  "تطوير استراتيجية الاستدامة والمسؤولية الاجتماعية للوزارة":
    "Developing ministry sustainability and social responsibility strategy",
  "تنفيذ مبادرات بيئية واجتماعية مبتكرة":
    "Implementing innovative environmental and social initiatives",
  "قياس الأثر الاجتماعي والبيئي للمشاريع والخدمات":
    "Measuring social and environmental impact of projects and services",

  "مدير مشروع مبادرة تجميع الاستدامة":
    "Sustainability Aggregation Initiative Project Manager",
  "قيادة مبادرة شاملة لتجميع وتوحيد جهود الاستدامة":
    "Leading a comprehensive initiative to aggregate and unify sustainability efforts",
  "تطوير مؤشرات أداء لقياس التقدم في الاستدامة":
    "Developing KPIs to measure sustainability progress",
  "التنسيق مع مختلف الجهات الداخلية والخارجية":
    "Coordinating with various internal and external entities",
  "إعداد تقارير دورية عن إنجازات الاستدامة":
    "Preparing periodic reports on sustainability achievements",

  "نموذج التميز الحكومي (GEM 2.1)": "Government Excellence Model (GEM 2.1)",
  "تطبيق معايير نموذج التميز الحكومي الإماراتي الإصدار 2.1":
    "Implementing UAE Government Excellence Model version 2.1 standards",
  "إجراء تقييم ذاتي شامل لأداء الوزارة":
    "Conducting comprehensive self-assessment of ministry performance",
  "تطوير خطط تحسين بناءً على فجوات التميز":
    "Developing improvement plans based on excellence gaps",
  "التحضير للجوائز والاعتمادات الحكومية":
    "Preparing for government awards and accreditations",

  // Skills section
  "المهارات الأساسية والكفاءات المتخصصة":
    "Core Skills & Specialized Competencies",
  "إدارة المشاريع وتحسين الخدمات": "Project Management & Service Improvement",
  "الاستراتيجية ومؤشرات الأداء": "Strategy & Performance Indicators",
  "تجربة العميل والبحوث": "Customer Experience & Research",
  "إدارة المخاطر والتحسين المستمر": "Risk Management & Continuous Improvement",
  "التدريب والتطوير المؤسسي": "Training & Organizational Development",
  "التقنية والأدوات": "Technology & Tools",

  // Ethos section
  "مدير التعلم والتطوير الاستشاري - Ethos Integrated Solutions":
    "Learning & Development Consulting Manager - Ethos Integrated Solutions",
  "شغل منصب مدير التعلم والتطوير الاستشاري في شركة إيثوس للحلول المتكاملة":
    "Served as Learning & Development Consulting Manager at Ethos Integrated Solutions",
  "نسبة نجاح المشاريع": "Project Success Rate",
  "سنوات من التميز": "Years of Excellence",
  "مشروع استشاري منجز": "Completed Consulting Project",

  "مشاريع نظام التصنيف العالمي بالنجوم والتميز:":
    "Global Star Rating System & Excellence Projects:",
  "شرطة أبوظبي": "Abu Dhabi Police",
  "وزارة الداخلية": "Ministry of Interior",
  "مؤسسة الإمارات للخدمات الصحية": "Emirates Health Services",
  "وزارة الصحة ووقاية المجتمع": "Ministry of Health and Prevention",
  "شرطة دبي": "Dubai Police",
  "الهيئة الاتحادية للهوية والجنسية والجمارك وأمن المنافذ":
    "Federal Authority for Identity, Citizenship, Customs & Port Security",

  // Certifications
  "الشهادات والاعتمادات المهنية":
    "Professional Certifications & Accreditations",
  "شهادات التميز المؤسسي": "Organizational Excellence Certifications",
  "شهادات تجربة العميل والخدمات":
    "Customer Experience & Services Certifications",
  "شهادات التدريب والتطوير": "Training & Development Certifications",
  "شهادات إدارة المشاريع": "Project Management Certifications",
  "شهادات الجودة والأيزو": "Quality & ISO Certifications",
  "شهادات إضافية": "Additional Certifications",

  // Common terms
  "أولاً:": "First:",
  "ثانياً:": "Second:",
  "ثالثاً:": "Third:",
  "رابعاً:": "Fourth:",
  "خامساً:": "Fifth:",
  "سادساً:": "Sixth:",
  "سابعاً:": "Seventh:",
  "نوفمبر 2017 - نوفمبر 2022": "November 2017 - November 2022",
  "يوليو 2022 - نوفمبر 2024": "July 2022 - November 2024",

  // Education & Previous Experience
  مكتمل: "Completed",
  "PDCA للاستشارات الإدارية": "PDCA Management Consultancy",
  "مستشار التميز المؤسسي": "Organizational Excellence Consultant",
  "أساتذة التميز المؤسسي الدولي":
    "International Organizational Excellence Professors",
  "مستشار التميز": "Excellence Consultant",
  "منسق مشاريع": "Project Coordinator",
  "2016 - 2017": "2016 - 2017",
  "2015 - 2016": "2015 - 2016",
  "2014 - 2015": "2014 - 2015",

  // Job descriptions
  "تقديم استشارات متخصصة في مجالات التميز المؤسسي وإدارة الجودة للجهات الحكومية والخاصة، مع التركيز على تطبيق نماذج التميز العالمية والمحلية.":
    "Providing specialized consultancy in organizational excellence and quality management for government and private entities, focusing on implementing global and local excellence models.",
  "العمل كمستشار تميز مؤسسي، مع التركيز على تطوير أنظمة إدارة الأداء وتطبيق معايير التميز في مختلف القطاعات.":
    "Working as an organizational excellence consultant, focusing on developing performance management systems and implementing excellence standards across various sectors.",
  "تنسيق وإدارة المشاريع الاستشارية، مع المساهمة في تطوير المنهجيات وأدوات العمل الاستشارية.":
    "Coordinating and managing consulting projects, while contributing to the development of methodologies and consulting work tools.",

  // Ethos projects descriptions
  "مشروع نظام التصنيف العالمي بالنجوم للخدمات":
    "Global Star Rating System Project for Services",
  "تطبيق شامل لنظام التصنيف العالمي بالنجوم على خدمات القيادة العامة لشرطة أبوظبي، شمل تحليل وتقييم الخدمات، تطوير معايير الأداء، وتدريب الفرق على أفضل الممارسات العالمية.":
    "Comprehensive implementation of the Global Star Rating System for Abu Dhabi Police services, including service analysis and evaluation, performance standards development, and training teams on global best practices.",
  "تنفيذ كامل برنامج 7 نجوم لمراكز إسعاد المتعاملين":
    "Complete Implementation of 7 Stars Program for Customer Happiness Centers",
  "قيادة التنفيذ الكامل لبرنامج 7 نجوم لمراكز إسعاد المتعاملين، يشمل جميع ركائز البرنامج من استشارات، تقييم، قياس، وتطوير.":
    "Leading complete implementation of 7 Stars program for customer happiness centers, including all program pillars: consultancy, evaluation, measurement, and development.",
  "ركيزتان: الاستشارات والقياس لنظام التصنيف العالمي":
    "Two Pillars: Consultancy and Measurement for Global Rating System",
  "تقديم الاستشارات الفنية المتخصصة وإجراء القياسات الميدانية لتطبيق نظام التصنيف بالنجوم على المنشآت الصحية التابعة للمؤسسة.":
    "Providing specialized technical consultancy and conducting field measurements for implementing star rating system in health facilities.",
  "3 مشاريع شاملة تتضمن ركائز: الاستشارات، التقييم، والقياس":
    "3 Comprehensive Projects Including: Consultancy, Evaluation, and Measurement",
  "تنفيذ ثلاثة مشاريع متكاملة لوزارة الصحة، شملت جميع جوانب تطبيق نظام التصنيف بالنجوم بما في ذلك الاستشارات الفنية، التقييم المؤسسي، والقياسات الميدانية.":
    "Implementing three integrated projects for Ministry of Health, covering all aspects of star rating system including technical consultancy, institutional evaluation, and field measurements.",

  // Additional projects
  "مشاريع إضافية مع جهات حكومية رائدة:":
    "Additional Projects with Leading Government Entities:",
  "تنفيذ كامل برنامج 7 نجوم لأربعة مراكز شرطة":
    "Complete Implementation of 7 Stars Program for Four Police Stations",
  "مشروع شامل لتطبيق نظام التصنيف العالمي بالنجوم على 4 مراكز شرطة رئيسية، شمل تحليل الخدمات، تطوير المعايير، التدريب، والقياس الميداني.":
    "Comprehensive project to implement Global Star Rating System for 4 main police stations, including service analysis, standards development, training, and field measurement.",
  "مراكز إسعاد المتعاملين مع مخرجات مؤسسية شاملة":
    "Customer Happiness Centers with Comprehensive Institutional Outputs",
  "تطوير مراكز إسعاد المتعاملين وفق أعلى المعايير، مع تطوير دليل خدمات شامل، معايير الأداء، ومؤشرات القياس.":
    "Developing customer happiness centers according to highest standards, with comprehensive service manual, performance standards, and measurement indicators.",

  // Awards
  "شهادة تقدير من وزير الداخلية":
    "Certificate of Appreciation from Minister of Interior",
  "شرطة عجمان": "Ajman Police",
  2025: "2025",
  "تقديراً للجهود المتميزة في تطبيق برنامج 7 نجوم وتحقيق نتائج استثنائية في تحسين الخدمات.":
    "In recognition of distinguished efforts in implementing 7 Stars program and achieving exceptional results in service improvement.",
  "جوائز داخلية من إيقوس": "Internal Awards from Ethos",
  "جائزة البطل المجهول": "Unsung Hero Award",
  "أفضل موظف": "Best Employee",
  "موظف العام 2020": "Employee of the Year 2020",
  "تقديراً للأداء المتميز والتفاني في العمل والمساهمة الفعالة في نجاح المشاريع.":
    "In recognition of outstanding performance, dedication to work, and effective contribution to project success.",
  "شهادات تقدير من جهات حكومية":
    "Certificates of Appreciation from Government Entities",
  "بلدية دبي": "Dubai Municipality",
  "هيئة الصحة بدبي": "Dubai Health Authority",
  "جهات حكومية أخرى": "Other Government Entities",
  "شهادات تقدير متعددة من الجهات الحكومية التي تم العمل معها نظير التميز في تقديم الخدمات الاستشارية.":
    "Multiple certificates of appreciation from government entities for excellence in providing consulting services.",
  "الالتزام بالتميز والتطوير المستمر":
    "Commitment to Excellence and Continuous Development",
  "تعكس هذه الجوائز والتقديرات التزاماً راسخاً بتحقيق أعلى معايير التميز المهني والمساهمة الفعالة في تطوير الخدمات الحكومية. وتمثل دافعاً مستمراً للمزيد من الإنجازات والمساهمات في رفع مستوى الأداء المؤسسي.":
    "These awards reflect firm commitment to achieving highest professional excellence standards and effective contribution to developing government services.",

  // Deliverables
  "المخرجات المشتركة في المشاريع الاستشارية":
    "Common Deliverables in Consulting Projects",
  "مجموعة شاملة من المخرجات والوثائق المؤسسية التي يتم تطويرها خلال المشاريع الاستشارية لضمان الاستدامة ونقل المعرفة:":
    "Comprehensive set of outputs and institutional documents developed during consulting projects to ensure sustainability and knowledge transfer:",
  "تحليل الفجوات والتقييم التشخيصي الشامل":
    "Gap Analysis and Comprehensive Diagnostic Assessment",
  "رسم وتحليل وتحسين رحلة العميل":
    "Customer Journey Mapping, Analysis and Improvement",
  "استراتيجية تطوير وتحسين الخدمات":
    "Service Development and Improvement Strategy",
  "تطوير وتفعيل ميثاق المتعاملين":
    "Development and Activation of Customer Charter",
  "منهجية إشراك أصحاب المصلحة والشركاء":
    "Stakeholder and Partner Engagement Methodology",
  "برامج المكافآت والتقدير والتوجيه":
    "Rewards, Recognition and Guidance Programs",
  "تقسيم العملاء واتفاقيات مستوى الخدمة (SLA)":
    "Customer Segmentation and Service Level Agreements (SLA)",
  "مبادرات وخطط تحسين الخدمات": "Service Improvement Initiatives and Plans",
  "خطة التشغيل ومؤشرات الأداء الرئيسية":
    "Operations Plan and Key Performance Indicators",
  "تقييم وتصنيف الخدمات حسب المعايير":
    "Service Evaluation and Classification by Standards",
  "دليل معايير خدمة العملاء والسياسات":
    "Customer Service Standards and Policies Manual",
  "برامج التدريب والتطوير المتخصصة":
    "Specialized Training and Development Programs",
  "أدلة الإجراءات والعمليات التشغيلية":
    "Procedures and Operational Processes Manuals",
  "أنظمة القياس والمتابعة والتقارير":
    "Measurement, Follow-up and Reporting Systems",
  "خطط الاستدامة والتحسين المستمر":
    "Sustainability and Continuous Improvement Plans",
};

function toggleLanguage() {
  const html = document.documentElement;
  const langText = document.getElementById("lang-text");

  if (currentLang === "ar") {
    currentLang = "en";
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    langText.textContent = "AR";

    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
      const enText = el.getAttribute("data-en");
      if (enText) {
        el.textContent = enText;
      }
    });

    // Apply dictionary translations for elements without data attributes
    document
      .querySelectorAll(
        "h4, li, p.project-details, p.project-details-small, p.mini-details, .stat-label, .section-title, h3, h5"
      )
      .forEach((el) => {
        const arText = el.textContent.trim();
        if (translations[arText]) {
          el.setAttribute("data-original-ar", arText);
          el.textContent = translations[arText];
        }
      });

    // Update nav brand
    const navBrand = document.querySelector(".nav-brand");
    if (navBrand) navBrand.textContent = "Moein Najem";
  } else {
    currentLang = "ar";
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    langText.textContent = "EN";

    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
      const arText = el.getAttribute("data-ar");
      if (arText) {
        el.textContent = arText;
      }
    });

    // Restore original Arabic text for dictionary-translated elements
    document.querySelectorAll("[data-original-ar]").forEach((el) => {
      const originalAr = el.getAttribute("data-original-ar");
      if (originalAr) {
        el.textContent = originalAr;
      }
    });

    // Update nav brand
    const navBrand = document.querySelector(".nav-brand");
    if (navBrand) navBrand.textContent = "معين نجم";
  }

  // Save preference
  localStorage.setItem("preferredLang", currentLang);

  // Re-apply any special formatting
  applyLanguageFormatting();
}

function applyLanguageFormatting() {
  // Apply any special formatting based on language
  const body = document.body;
  if (currentLang === "en") {
    body.style.fontFamily =
      "'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  } else {
    body.style.fontFamily =
      "'Tajawal', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  }
}

// Load saved language preference on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && savedLang !== currentLang) {
    toggleLanguage();
  }
});

// Smooth scroll functionality
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Download CV functionality
function downloadCV() {
  // Create a temporary link to trigger download
  const link = document.createElement("a");
  link.href = "#"; // Replace with actual PDF path when available

  // For now, use print dialog as fallback
  if (
    confirm(
      "هل تريد طباعة السيرة الذاتية أو حفظها كملف PDF؟\nWould you like to print the CV or save it as PDF?"
    )
  ) {
    window.print();
  } else {
    // Alternative: You can add actual PDF file here
    alert(
      "يمكنك حفظ هذه الصفحة كـ PDF من متصفحك\nYou can save this page as PDF from your browser\n\nCtrl+P (Windows) or Cmd+P (Mac) → Save as PDF"
    );
  }
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// Scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Animate cards on scroll
  const cards = document.querySelectorAll(
    ".competency-card, .project-card, .stat-card, .skill-category-card, .award-card, .contact-card"
  );
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.5s ease ${
      index * 0.1
    }s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Active navigation link
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = "+" + target;
      clearInterval(timer);
    } else {
      element.textContent = "+" + Math.floor(start);
    }
  }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        if (statNumber && !statNumber.classList.contains("animated")) {
          const target = parseInt(statNumber.textContent.replace("+", ""));
          statNumber.textContent = "0";
          animateCounter(statNumber, target);
          statNumber.classList.add("animated");
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", () => {
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card) => statsObserver.observe(card));
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Print functionality
function printCV() {
  window.print();
}

// Copy contact info to clipboard
function copyToClipboard(text, element) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const originalText = element.textContent;
      element.textContent = "تم النسخ!";
      element.style.color = "#10b981";

      setTimeout(() => {
        element.textContent = originalText;
        element.style.color = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("فشل النسخ: ", err);
    });
}

// Add click to copy functionality to contact items
document.addEventListener("DOMContentLoaded", () => {
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", function () {
      const text = this.textContent.trim();
      copyToClipboard(text, this);
    });
  });
});

// Lazy load images (if images are added later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Back to top button
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = "back-to-top";
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
`;

document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.opacity = "1";
    backToTopButton.style.visibility = "visible";
  } else {
    backToTopButton.style.opacity = "0";
    backToTopButton.style.visibility = "hidden";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

backToTopButton.addEventListener("mouseenter", function () {
  this.style.transform = "translateY(-5px)";
  this.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
});

backToTopButton.addEventListener("mouseleave", function () {
  this.style.transform = "translateY(0)";
  this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
});

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

console.log("السيرة الذاتية لمعين نجم - تم التحميل بنجاح ✓");



