/**
 * Language Switching for Veronika Raum Website
 * 
 * This script handles loading and applying translations
 * to the website content.
 */

// Current language (default is German)
let currentLanguage = localStorage.getItem('vrLanguage') || 'de';
let translations = {};

// Elements to be translated (will be populated on document load)
let translatableElements = {};

/**
 * Initialize the language system
 */
async function initializeLanguage() {
    // Load translations for both languages
    try {
        const deResponse = await fetch('translations/de.json');
        const enResponse = await fetch('translations/en.json');
        
        if (!deResponse.ok || !enResponse.ok) {
            throw new Error('Failed to load language files');
        }
        
        translations = {
            de: await deResponse.json(),
            en: await enResponse.json()
        };
        
        // Find all translatable elements
        findTranslatableElements();
        
        // Set active language in switcher
        updateLanguageSwitcher();
        
        // Apply translations
        applyTranslations();
    } catch (error) {
        console.error('Translation initialization error:', error);
    }
}

/**
 * Find all elements that need translation
 */
function findTranslatableElements() {
    translatableElements = {
        // General
        title: document.querySelector('title'),
        
        // Navigation
        navAbout: document.querySelector('nav ul li a[href="#about"]'),
        navPortfolio: document.querySelector('nav ul li a[href="#portfolio"]'),
        navServices: document.querySelector('nav ul li a[href="#services"]'),
        navProcess: document.querySelector('nav ul li a[href="#process"]'),
        navClients: document.querySelector('nav ul li a[href="#clients"]'),
        navResources: document.querySelector('nav ul li a[href="#resources"]'),
        navContact: document.querySelector('nav ul li a[href="#contact"]'),
        
        // Hero Section
        heroTitle: document.querySelector('#hero h1'),
        heroSubtitle: document.querySelector('#hero p'),
        heroCta: document.querySelector('#hero .cta-button'),
        
        // Medical Focus
        medicalFocusTitle: document.querySelector('#medical-focus .section-title'),
        techTitle: document.querySelector('#medical-focus .focus-card:nth-child(1) h3'),
        techDesc: document.querySelector('#medical-focus .focus-card:nth-child(1) p'),
        practiceTitle: document.querySelector('#medical-focus .focus-card:nth-child(2) h3'),
        practiceDesc: document.querySelector('#medical-focus .focus-card:nth-child(2) p'),
        institutionTitle: document.querySelector('#medical-focus .focus-card:nth-child(3) h3'),
        institutionDesc: document.querySelector('#medical-focus .focus-card:nth-child(3) p'),
        
        // Case Studies
        caseStudiesTitle: document.querySelector('#featured-cases .section-title'),
        devanthroTag: document.querySelector('#featured-cases .case-card:nth-child(1) .case-tag'),
        devanthroTitle: document.querySelector('#featured-cases .case-card:nth-child(1) h3'),
        devanthroDesc: document.querySelector('#featured-cases .case-card:nth-child(1) p'),
        kinderklinikTag: document.querySelector('#featured-cases .case-card:nth-child(2) .case-tag'),
        kinderklinikTitle: document.querySelector('#featured-cases .case-card:nth-child(2) h3'),
        kinderklinikDesc: document.querySelector('#featured-cases .case-card:nth-child(2) p'),
        hospitalTag: document.querySelector('#featured-cases .case-card:nth-child(3) .case-tag'),
        hospitalTitle: document.querySelector('#featured-cases .case-card:nth-child(3) h3'),
        hospitalDesc: document.querySelector('#featured-cases .case-card:nth-child(3) p'),
        viewCaseStudyLinks: document.querySelectorAll('#featured-cases .text-link'),
        
        // Dual Expertise
        expertiseTitle: document.querySelector('#dual-expertise .section-title'),
        expertiseSubtitle: document.querySelector('#dual-expertise .lead'),
        expertisePoints: document.querySelectorAll('#dual-expertise .expertise-list li'),
        
        // Equipment
        equipmentTitle: document.querySelector('#equipment .section-title'),
        camerasTitle: document.querySelector('#equipment .equipment-item:nth-child(1) h3'),
        camerasDesc: document.querySelector('#equipment .equipment-item:nth-child(1) p'),
        stabilizationTitle: document.querySelector('#equipment .equipment-item:nth-child(2) h3'),
        stabilizationDesc: document.querySelector('#equipment .equipment-item:nth-child(2) p'),
        aerialTitle: document.querySelector('#equipment .equipment-item:nth-child(3) h3'),
        aerialDesc: document.querySelector('#equipment .equipment-item:nth-child(3) p'),
        lightingTitle: document.querySelector('#equipment .equipment-item:nth-child(4) h3'),
        lightingDesc: document.querySelector('#equipment .equipment-item:nth-child(4) p'),
        
        // Testimonial (only quote needs translation)
        testimonialQuote: document.querySelector('#testimonial blockquote'),
        testimonialName: document.querySelector('#testimonial .client-name'),
        testimonialPosition: document.querySelector('#testimonial .client-position'),
        
        // About Section
        aboutTitle: document.querySelector('#about .section-title'),
        aboutSubtitle: document.querySelector('#about .lead'),
        aboutParagraph1: document.querySelector('#about p:nth-of-type(1):not(.lead)'),
        aboutParagraph2: document.querySelector('#about p:nth-of-type(2):not(.lead)'),
        aboutCta: document.querySelector('#about .cta-button'),
        
        // Portfolio Section
        portfolioTitle: document.querySelector('#portfolio .section-title'),
        portfolioFilterAll: document.querySelector('.portfolio-filter[data-filter="all"]'),
        portfolioFilterTech: document.querySelector('.portfolio-filter[data-filter="technology"]'),
        portfolioFilterPractice: document.querySelector('.portfolio-filter[data-filter="practice"]'),
        portfolioFilterInst: document.querySelector('.portfolio-filter[data-filter="institution"]'),
        
        // Portfolio Items
        devanthroPortfolioTitle: document.querySelector('.portfolio-item.technology:nth-child(1) h3'),
        devanthroPortfolioDesc: document.querySelector('.portfolio-item.technology:nth-child(1) p'),
        surgicalPortfolioTitle: document.querySelector('.portfolio-item.technology:nth-child(2) h3'),
        surgicalPortfolioDesc: document.querySelector('.portfolio-item.technology:nth-child(2) p'),
        kinderklinikPortfolioTitle: document.querySelector('.portfolio-item.practice:nth-child(1) h3'),
        kinderklinikPortfolioDesc: document.querySelector('.portfolio-item.practice:nth-child(1) p'),
        clinicPortfolioTitle: document.querySelector('.portfolio-item.practice:nth-child(2) h3'),
        clinicPortfolioDesc: document.querySelector('.portfolio-item.practice:nth-child(2) p'),
        hospitalPortfolioTitle: document.querySelector('.portfolio-item.institution:nth-child(1) h3'),
        hospitalPortfolioDesc: document.querySelector('.portfolio-item.institution:nth-child(1) p'),
        researchPortfolioTitle: document.querySelector('.portfolio-item.institution:nth-child(2) h3'),
        researchPortfolioDesc: document.querySelector('.portfolio-item.institution:nth-child(2) p'),
        viewProjectLinks: document.querySelectorAll('.portfolio-overlay .view-project'),
        portfolioCta: document.querySelector('.portfolio-cta .cta-button'),
        
        // Services Section
        servicesTitle: document.querySelector('#services .section-title'),
        servicesSubtitle: document.querySelector('#services .section-subtitle'),
        
        // Service Categories
        innovationTitle: document.querySelector('#services .service-category:nth-child(1) h3'),
        innovationItems: document.querySelectorAll('#services .service-category:nth-child(1) .service-list li'),
        environmentTitle: document.querySelector('#services .service-category:nth-child(2) h3'),
        environmentItems: document.querySelectorAll('#services .service-category:nth-child(2) .service-list li'),
        professionalTitle: document.querySelector('#services .service-category:nth-child(3) h3'),
        professionalItems: document.querySelectorAll('#services .service-category:nth-child(3) .service-list li'),
        educationTitle: document.querySelector('#services .service-category:nth-child(4) h3'),
        educationItems: document.querySelectorAll('#services .service-category:nth-child(4) .service-list li'),
        servicesCta: document.querySelector('.services-cta .cta-button'),
        
        // Process Section
        processTitle: document.querySelector('#process .section-title'),
        processSubtitle: document.querySelector('#process .section-subtitle'),
        step1Title: document.querySelector('#process .process-step:nth-child(1) h3'),
        step1Desc: document.querySelector('#process .process-step:nth-child(1) p'),
        step2Title: document.querySelector('#process .process-step:nth-child(2) h3'),
        step2Desc: document.querySelector('#process .process-step:nth-child(2) p'),
        step3Title: document.querySelector('#process .process-step:nth-child(3) h3'),
        step3Desc: document.querySelector('#process .process-step:nth-child(3) p'),
        step4Title: document.querySelector('#process .process-step:nth-child(4) h3'),
        step4Desc: document.querySelector('#process .process-step:nth-child(4) p'),
        step5Title: document.querySelector('#process .process-step:nth-child(5) h3'),
        step5Desc: document.querySelector('#process .process-step:nth-child(5) p'),
        
        // Clients Section
        clientsTitle: document.querySelector('#clients .section-title'),
        clientsSubtitle: document.querySelector('#clients .section-subtitle'),
        techClientsTitle: document.querySelector('#clients .client-category:nth-child(1) h3'),
        devanthroClient: document.querySelector('#clients .client-category:nth-child(1) .client-logo:nth-child(1) p'),
        startupClient: document.querySelector('#clients .client-category:nth-child(1) .client-logo:nth-child(2) p'),
        manufacturerClient: document.querySelector('#clients .client-category:nth-child(1) .client-logo:nth-child(3) p'),
        practiceClientsTitle: document.querySelector('#clients .client-category:nth-child(2) h3'),
        kinderklinikClient: document.querySelector('#clients .client-category:nth-child(2) .client-logo:nth-child(1) p'),
        specializedClinicClient: document.querySelector('#clients .client-category:nth-child(2) .client-logo:nth-child(2) p'),
        surgicalPracticeClient: document.querySelector('#clients .client-category:nth-child(2) .client-logo:nth-child(3) p'),
        institutionClientsTitle: document.querySelector('#clients .client-category:nth-child(3) h3'),
        hospitalClient: document.querySelector('#clients .client-category:nth-child(3) .client-logo:nth-child(1) p'),
        researchClient: document.querySelector('#clients .client-category:nth-child(3) .client-logo:nth-child(2) p'),
        pharmaClient: document.querySelector('#clients .client-category:nth-child(3) .client-logo:nth-child(3) p'),
        
        // Resources Section
        resourcesTitle: document.querySelector('#resources .section-title'),
        resourcesSubtitle: document.querySelector('#resources .section-subtitle'),
        guideTag: document.querySelector('#resources .resource-card:nth-child(1) .resource-tag'),
        guideTitle: document.querySelector('#resources .resource-card:nth-child(1) h3'),
        guideDesc: document.querySelector('#resources .resource-card:nth-child(1) p'),
        caseStudyTag: document.querySelector('#resources .resource-card:nth-child(2) .resource-tag'),
        caseStudyTitle: document.querySelector('#resources .resource-card:nth-child(2) h3'),
        caseStudyDesc: document.querySelector('#resources .resource-card:nth-child(2) p'),
        articleTag: document.querySelector('#resources .resource-card:nth-child(3) .resource-tag'),
        articleTitle: document.querySelector('#resources .resource-card:nth-child(3) h3'),
        articleDesc: document.querySelector('#resources .resource-card:nth-child(3) p'),
        resourceTag: document.querySelector('#resources .resource-card:nth-child(4) .resource-tag'),
        resourceTitle: document.querySelector('#resources .resource-card:nth-child(4) h3'),
        resourceDesc: document.querySelector('#resources .resource-card:nth-child(4) p'),
        guideLink: document.querySelector('#resources .resource-card:nth-child(1) .text-link'),
        caseStudyLink: document.querySelector('#resources .resource-card:nth-child(2) .text-link'),
        articleLink: document.querySelector('#resources .resource-card:nth-child(3) .text-link'),
        resourceLink: document.querySelector('#resources .resource-card:nth-child(4) .text-link'),
        
        // Contact Section
        contactTitle: document.querySelector('#contact .section-title'),
        contactSubtitle: document.querySelector('#contact .section-subtitle'),
        getInTouchTitle: document.querySelector('.contact-info h3'),
        getInTouchText: document.querySelector('.contact-info > p'),
        emailLabel: document.querySelector('.contact-method:nth-child(1) h4'),
        phoneLabel: document.querySelector('.contact-method:nth-child(2) h4'),
        locationLabel: document.querySelector('.contact-method:nth-child(3) h4'),
        munich: document.querySelector('.contact-method:nth-child(3) p'),
        gdprNote: document.querySelector('.contact-note p'),
        formTitle: document.querySelector('.contact-form h3'),
        nameLabel: document.querySelector('label[for="name"]'),
        organizationLabel: document.querySelector('label[for="organization"]'),
        emailAddressLabel: document.querySelector('label[for="email"]'),
        phoneNumberLabel: document.querySelector('label[for="phone"]'),
        projectTypeLabel: document.querySelector('label[for="project-type"]'),
        selectTypeOption: document.querySelector('#project-type option[disabled]'),
        innovationOption: document.querySelector('#project-type option[value="medical-innovation"]'),
        environmentOption: document.querySelector('#project-type option[value="healthcare-environment"]'),
        professionalOption: document.querySelector('#project-type option[value="medical-professional"]'),
        educationOption: document.querySelector('#project-type option[value="patient-education"]'),
        otherOption: document.querySelector('#project-type option[value="other"]'),
        projectDetailsLabel: document.querySelector('label[for="message"]'),
        timelineLabel: document.querySelector('label[for="timeline"]'),
        selectTimelineOption: document.querySelector('#timeline option[disabled]'),
        urgentOption: document.querySelector('#timeline option[value="urgent"]'),
        standardOption: document.querySelector('#timeline option[value="standard"]'),
        flexibleOption: document.querySelector('#timeline option[value="flexible"]'),
        planningOption: document.querySelector('#timeline option[value="planning"]'),
        consentLabel: document.querySelector('label[for="consent"]'),
        submitButton: document.querySelector('.submit-button'),
        
        // Footer
        footerNavAbout: document.querySelector('.footer-nav a[href="#about"]'),
        footerNavPortfolio: document.querySelector('.footer-nav a[href="#portfolio"]'),
        footerNavServices: document.querySelector('.footer-nav a[href="#services"]'),
        footerNavProcess: document.querySelector('.footer-nav a[href="#process"]'),
        footerNavClients: document.querySelector('.footer-nav a[href="#clients"]'),
        footerNavResources: document.querySelector('.footer-nav a[href="#resources"]'),
        footerNavContact: document.querySelector('.footer-nav a[href="#contact"]'),
        copyrightText: document.querySelector('.footer-bottom p:first-child'),
        privacyLink: document.querySelector('.footer-bottom a[href*="Privacy"]'),
        imprintLink: document.querySelector('.footer-bottom a[href*="Imprint"]'),
        attributionLink: document.querySelector('.footer-bottom a[href="images/attribution.html"]')
    };
}

/**
 * Update the language switcher to show the active language
 */
function updateLanguageSwitcher() {
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-lang') === currentLanguage) {
            button.classList.add('active');
        }
    });
}

/**
 * Change the current language
 * @param {string} lang - Language code ('de' or 'en')
 */
function changeLanguage(lang) {
    if (lang === currentLanguage || (lang !== 'de' && lang !== 'en')) {
        return;
    }
    
    currentLanguage = lang;
    
    // Save preference to local storage
    localStorage.setItem('vrLanguage', lang);
    
    // Update language switcher
    updateLanguageSwitcher();
    
    // Apply translations
    applyTranslations();
}

/**
 * Apply translations to all elements based on current language
 */
function applyTranslations() {
    const t = translations[currentLanguage];
    if (!t) return;
    
    // GENERAL
    if (translatableElements.title) translatableElements.title.textContent = t.general.websiteTitle;
    
    // NAVIGATION
    if (translatableElements.navAbout) translatableElements.navAbout.textContent = t.navigation.about;
    if (translatableElements.navPortfolio) translatableElements.navPortfolio.textContent = t.navigation.portfolio;
    if (translatableElements.navServices) translatableElements.navServices.textContent = t.navigation.services;
    if (translatableElements.navProcess) translatableElements.navProcess.textContent = t.navigation.process;
    if (translatableElements.navClients) translatableElements.navClients.textContent = t.navigation.clients;
    if (translatableElements.navResources) translatableElements.navResources.textContent = t.navigation.resources;
    if (translatableElements.navContact) translatableElements.navContact.textContent = t.navigation.contact;
    
    // HERO
    if (translatableElements.heroTitle) translatableElements.heroTitle.textContent = t.hero.title;
    if (translatableElements.heroSubtitle) translatableElements.heroSubtitle.textContent = t.hero.subtitle;
    if (translatableElements.heroCta) translatableElements.heroCta.textContent = t.hero.cta;
    
    // MEDICAL FOCUS
    if (translatableElements.medicalFocusTitle) translatableElements.medicalFocusTitle.textContent = t.medicalFocus.title;
    if (translatableElements.techTitle) translatableElements.techTitle.textContent = t.medicalFocus.technologyTitle;
    if (translatableElements.techDesc) translatableElements.techDesc.textContent = t.medicalFocus.technologyDesc;
    if (translatableElements.practiceTitle) translatableElements.practiceTitle.textContent = t.medicalFocus.practiceTitle;
    if (translatableElements.practiceDesc) translatableElements.practiceDesc.textContent = t.medicalFocus.practiceDesc;
    if (translatableElements.institutionTitle) translatableElements.institutionTitle.textContent = t.medicalFocus.institutionTitle;
    if (translatableElements.institutionDesc) translatableElements.institutionDesc.textContent = t.medicalFocus.institutionDesc;
    
    // CASE STUDIES
    if (translatableElements.caseStudiesTitle) translatableElements.caseStudiesTitle.textContent = t.caseStudies.title;
    if (translatableElements.devanthroTag) translatableElements.devanthroTag.textContent = t.caseStudies.devanthroTag;
    if (translatableElements.devanthroTitle) translatableElements.devanthroTitle.textContent = t.caseStudies.devanthroTitle;
    if (translatableElements.devanthroDesc) translatableElements.devanthroDesc.textContent = t.caseStudies.devanthroDesc;
    if (translatableElements.kinderklinikTag) translatableElements.kinderklinikTag.textContent = t.caseStudies.kinderklinikTag;
    if (translatableElements.kinderklinikTitle) translatableElements.kinderklinikTitle.textContent = t.caseStudies.kinderklinikTitle;
    if (translatableElements.kinderklinikDesc) translatableElements.kinderklinikDesc.textContent = t.caseStudies.kinderklinikDesc;
    if (translatableElements.hospitalTag) translatableElements.hospitalTag.textContent = t.caseStudies.hospitalTag;
    if (translatableElements.hospitalTitle) translatableElements.hospitalTitle.textContent = t.caseStudies.hospitalTitle;
    if (translatableElements.hospitalDesc) translatableElements.hospitalDesc.textContent = t.caseStudies.hospitalDesc;
    if (translatableElements.viewCaseStudyLinks) {
        translatableElements.viewCaseStudyLinks.forEach(link => {
            link.textContent = t.caseStudies.viewCaseStudy + ' ';
            // Preserve the icon
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-arrow-right');
            link.appendChild(icon);
        });
    }
    
    // DUAL EXPERTISE
    if (translatableElements.expertiseTitle) translatableElements.expertiseTitle.textContent = t.dualExpertise.title;
    if (translatableElements.expertiseSubtitle) translatableElements.expertiseSubtitle.textContent = t.dualExpertise.subtitle;
    if (translatableElements.expertisePoints && translatableElements.expertisePoints.length >= 5) {
        translatableElements.expertisePoints[0].innerHTML = `<i class="fas fa-check-circle"></i> ${t.dualExpertise.point1}`;
        translatableElements.expertisePoints[1].innerHTML = `<i class="fas fa-check-circle"></i> ${t.dualExpertise.point2}`;
        translatableElements.expertisePoints[2].innerHTML = `<i class="fas fa-check-circle"></i> ${t.dualExpertise.point3}`;
        translatableElements.expertisePoints[3].innerHTML = `<i class="fas fa-check-circle"></i> ${t.dualExpertise.point4}`;
        translatableElements.expertisePoints[4].innerHTML = `<i class="fas fa-check-circle"></i> ${t.dualExpertise.point5}`;
    }
    
    // EQUIPMENT
    if (translatableElements.equipmentTitle) translatableElements.equipmentTitle.textContent = t.equipment.title;
    if (translatableElements.camerasTitle) translatableElements.camerasTitle.textContent = t.equipment.cameras;
    if (translatableElements.camerasDesc) translatableElements.camerasDesc.textContent = t.equipment.camerasDesc;
    if (translatableElements.stabilizationTitle) translatableElements.stabilizationTitle.textContent = t.equipment.stabilization;
    if (translatableElements.stabilizationDesc) translatableElements.stabilizationDesc.textContent = t.equipment.stabilizationDesc;
    if (translatableElements.aerialTitle) translatableElements.aerialTitle.textContent = t.equipment.aerial;
    if (translatableElements.aerialDesc) translatableElements.aerialDesc.textContent = t.equipment.aerialDesc;
    if (translatableElements.lightingTitle) translatableElements.lightingTitle.textContent = t.equipment.lighting;
    if (translatableElements.lightingDesc) translatableElements.lightingDesc.textContent = t.equipment.lightingDesc;
    
    // TESTIMONIAL
    if (translatableElements.testimonialQuote) translatableElements.testimonialQuote.textContent = t.testimonial.quote;
    if (translatableElements.testimonialName) translatableElements.testimonialName.textContent = t.testimonial.name;
    if (translatableElements.testimonialPosition) translatableElements.testimonialPosition.textContent = t.testimonial.position;
    
    // ABOUT
    if (translatableElements.aboutTitle) translatableElements.aboutTitle.textContent = t.about.title;
    if (translatableElements.aboutSubtitle) translatableElements.aboutSubtitle.textContent = t.about.subtitle;
    if (translatableElements.aboutParagraph1) translatableElements.aboutParagraph1.textContent = t.about.paragraph1;
    if (translatableElements.aboutParagraph2) translatableElements.aboutParagraph2.textContent = t.about.paragraph2;
    if (translatableElements.aboutCta) translatableElements.aboutCta.textContent = t.about.cta;
    
    // PORTFOLIO
    if (translatableElements.portfolioTitle) translatableElements.portfolioTitle.textContent = t.portfolio.title;
    if (translatableElements.portfolioFilterAll) translatableElements.portfolioFilterAll.textContent = t.portfolio.all;
    if (translatableElements.portfolioFilterTech) translatableElements.portfolioFilterTech.textContent = t.portfolio.technology;
    if (translatableElements.portfolioFilterPractice) translatableElements.portfolioFilterPractice.textContent = t.portfolio.practice;
    if (translatableElements.portfolioFilterInst) translatableElements.portfolioFilterInst.textContent = t.portfolio.institution;
    
    // Portfolio Items
    if (translatableElements.devanthroPortfolioTitle) translatableElements.devanthroPortfolioTitle.textContent = t.portfolio.projects.devanthro.title;
    if (translatableElements.devanthroPortfolioDesc) translatableElements.devanthroPortfolioDesc.textContent = t.portfolio.projects.devanthro.desc;
    if (translatableElements.surgicalPortfolioTitle) translatableElements.surgicalPortfolioTitle.textContent = t.portfolio.projects.surgicalDevice.title;
    if (translatableElements.surgicalPortfolioDesc) translatableElements.surgicalPortfolioDesc.textContent = t.portfolio.projects.surgicalDevice.desc;
    if (translatableElements.kinderklinikPortfolioTitle) translatableElements.kinderklinikPortfolioTitle.textContent = t.portfolio.projects.kinderklinik.title;
    if (translatableElements.kinderklinikPortfolioDesc) translatableElements.kinderklinikPortfolioDesc.textContent = t.portfolio.projects.kinderklinik.desc;
    if (translatableElements.clinicPortfolioTitle) translatableElements.clinicPortfolioTitle.textContent = t.portfolio.projects.clinic.title;
    if (translatableElements.clinicPortfolioDesc) translatableElements.clinicPortfolioDesc.textContent = t.portfolio.projects.clinic.desc;
    if (translatableElements.hospitalPortfolioTitle) translatableElements.hospitalPortfolioTitle.textContent = t.portfolio.projects.hospital.title;
    if (translatableElements.hospitalPortfolioDesc) translatableElements.hospitalPortfolioDesc.textContent = t.portfolio.projects.hospital.desc;
    if (translatableElements.researchPortfolioTitle) translatableElements.researchPortfolioTitle.textContent = t.portfolio.projects.research.title;
    if (translatableElements.researchPortfolioDesc) translatableElements.researchPortfolioDesc.textContent = t.portfolio.projects.research.desc;
    
    if (translatableElements.viewProjectLinks) {
        translatableElements.viewProjectLinks.forEach(link => {
            link.textContent = t.portfolio.viewProject;
        });
    }
    
    if (translatableElements.portfolioCta) translatableElements.portfolioCta.textContent = t.portfolio.cta;
    
    // SERVICES
    if (translatableElements.servicesTitle) translatableElements.servicesTitle.textContent = t.services.title;
    if (translatableElements.servicesSubtitle) translatableElements.servicesSubtitle.textContent = t.services.subtitle;
    if (translatableElements.innovationTitle) translatableElements.innovationTitle.textContent = t.services.innovationTitle;
    if (translatableElements.environmentTitle) translatableElements.environmentTitle.textContent = t.services.environmentTitle;
    if (translatableElements.professionalTitle) translatableElements.professionalTitle.textContent = t.services.professionalTitle;
    if (translatableElements.educationTitle) translatableElements.educationTitle.textContent = t.services.educationTitle;
    
    // Service Lists
    if (translatableElements.innovationItems) {
        translatableElements.innovationItems.forEach((item, index) => {
            if (index < t.services.innovationItems.length) {
                item.textContent = t.services.innovationItems[index];
            }
        });
    }
    
    if (translatableElements.environmentItems) {
        translatableElements.environmentItems.forEach((item, index) => {
            if (index < t.services.environmentItems.length) {
                item.textContent = t.services.environmentItems[index];
            }
        });
    }
    
    if (translatableElements.professionalItems) {
        translatableElements.professionalItems.forEach((item, index) => {
            if (index < t.services.professionalItems.length) {
                item.textContent = t.services.professionalItems[index];
            }
        });
    }
    
    if (translatableElements.educationItems) {
        translatableElements.educationItems.forEach((item, index) => {
            if (index < t.services.educationItems.length) {
                item.textContent = t.services.educationItems[index];
            }
        });
    }
    
    if (translatableElements.servicesCta) translatableElements.servicesCta.textContent = t.services.cta;
    
    // PROCESS
    if (translatableElements.processTitle) translatableElements.processTitle.textContent = t.process.title;
    if (translatableElements.processSubtitle) translatableElements.processSubtitle.textContent = t.process.subtitle;
    if (translatableElements.step1Title) translatableElements.step1Title.textContent = t.process.step1Title;
    if (translatableElements.step1Desc) translatableElements.step1Desc.textContent = t.process.step1Desc;
    if (translatableElements.step2Title) translatableElements.step2Title.textContent = t.process.step2Title;
    if (translatableElements.step2Desc) translatableElements.step2Desc.textContent = t.process.step2Desc;
    if (translatableElements.step3Title) translatableElements.step3Title.textContent = t.process.step3Title;
    if (translatableElements.step3Desc) translatableElements.step3Desc.textContent = t.process.step3Desc;
    if (translatableElements.step4Title) translatableElements.step4Title.textContent = t.process.step4Title;
    if (translatableElements.step4Desc) translatableElements.step4Desc.textContent = t.process.step4Desc;
    if (translatableElements.step5Title) translatableElements.step5Title.textContent = t.process.step5Title;
    if (translatableElements.step5Desc) translatableElements.step5Desc.textContent = t.process.step5Desc;
    
    // CLIENTS
    if (translatableElements.clientsTitle) translatableElements.clientsTitle.textContent = t.clients.title;
    if (translatableElements.clientsSubtitle) translatableElements.clientsSubtitle.textContent = t.clients.subtitle;
    if (translatableElements.techClientsTitle) translatableElements.techClientsTitle.textContent = t.clients.technologyTitle;
    if (translatableElements.devanthroClient) translatableElements.devanthroClient.textContent = t.clients.devanthro;
    if (translatableElements.startupClient) translatableElements.startupClient.textContent = t.clients.startup;
    if (translatableElements.manufacturerClient) translatableElements.manufacturerClient.textContent = t.clients.manufacturer;
    if (translatableElements.practiceClientsTitle) translatableElements.practiceClientsTitle.textContent = t.clients.practiceTitle;
    if (translatableElements.kinderklinikClient) translatableElements.kinderklinikClient.textContent = t.clients.kinderklinik;
    if (translatableElements.specializedClinicClient) translatableElements.specializedClinicClient.textContent = t.clients.specializedClinic;
    if (translatableElements.surgicalPracticeClient) translatableElements.surgicalPracticeClient.textContent = t.clients.surgicalPractice;
    if (translatableElements.institutionClientsTitle) translatableElements.institutionClientsTitle.textContent = t.clients.institutionTitle;
    if (translatableElements.hospitalClient) translatableElements.hospitalClient.textContent = t.clients.regionalHospital;
    if (translatableElements.researchClient) translatableElements.researchClient.textContent = t.clients.researchCenter;
    if (translatableElements.pharmaClient) translatableElements.pharmaClient.textContent = t.clients.pharma;
    
    // RESOURCES
    if (translatableElements.resourcesTitle) translatableElements.resourcesTitle.textContent = t.resources.title;
    if (translatableElements.resourcesSubtitle) translatableElements.resourcesSubtitle.textContent = t.resources.subtitle;
    if (translatableElements.guideTag) translatableElements.guideTag.textContent = t.resources.guide.tag;
    if (translatableElements.guideTitle) translatableElements.guideTitle.textContent = t.resources.guide.title;
    if (translatableElements.guideDesc) translatableElements.guideDesc.textContent = t.resources.guide.desc;
    if (translatableElements.caseStudyTag) translatableElements.caseStudyTag.textContent = t.resources.caseStudy.tag;
    if (translatableElements.caseStudyTitle) translatableElements.caseStudyTitle.textContent = t.resources.caseStudy.title;
    if (translatableElements.caseStudyDesc) translatableElements.caseStudyDesc.textContent = t.resources.caseStudy.desc;
    if (translatableElements.articleTag) translatableElements.articleTag.textContent = t.resources.article.tag;
    if (translatableElements.articleTitle) translatableElements.articleTitle.textContent = t.resources.article.title;
    if (translatableElements.articleDesc) translatableElements.articleDesc.textContent = t.resources.article.desc;
    if (translatableElements.resourceTag) translatableElements.resourceTag.textContent = t.resources.resource.tag;
    if (translatableElements.resourceTitle) translatableElements.resourceTitle.textContent = t.resources.resource.title;
    if (translatableElements.resourceDesc) translatableElements.resourceDesc.textContent = t.resources.resource.desc;
    
    // Resource Links
    if (translatableElements.guideLink) {
        translatableElements.guideLink.textContent = t.resources.download + ' ';
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-arrow-right');
        translatableElements.guideLink.appendChild(icon);
    }
    
    if (translatableElements.caseStudyLink) {
        translatableElements.caseStudyLink.textContent = t.resources.read + ' ';
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-arrow-right');
        translatableElements.caseStudyLink.appendChild(icon);
    }
    
    if (translatableElements.articleLink) {
        translatableElements.articleLink.textContent = t.resources.read + ' ';
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-arrow-right');
        translatableElements.articleLink.appendChild(icon);
    }
    
    if (translatableElements.resourceLink) {
        translatableElements.resourceLink.textContent = t.resources.view + ' ';
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-arrow-right');
        translatableElements.resourceLink.appendChild(icon);
    }
    
    // CONTACT
    if (translatableElements.contactTitle) translatableElements.contactTitle.textContent = t.contact.title;
    if (translatableElements.contactSubtitle) translatableElements.contactSubtitle.textContent = t.contact.subtitle;
    if (translatableElements.getInTouchTitle) translatableElements.getInTouchTitle.textContent = t.contact.getInTouchTitle;
    if (translatableElements.getInTouchText) translatableElements.getInTouchText.textContent = t.contact.getInTouchText;
    if (translatableElements.emailLabel) translatableElements.emailLabel.textContent = t.contact.email;
    if (translatableElements.phoneLabel) translatableElements.phoneLabel.textContent = t.contact.phone;
    if (translatableElements.locationLabel) translatableElements.locationLabel.textContent = t.contact.location;
    if (translatableElements.munich) translatableElements.munich.textContent = t.contact.munich;
    if (translatableElements.gdprNote) translatableElements.gdprNote.innerHTML = `<strong>${t.contact.gdprNote.split(':')[0]}:</strong> ${t.contact.gdprNote.split(':')[1]}`;
    if (translatableElements.formTitle) translatableElements.formTitle.textContent = t.contact.formTitle;
    if (translatableElements.nameLabel) translatableElements.nameLabel.textContent = t.contact.name;
    if (translatableElements.organizationLabel) translatableElements.organizationLabel.textContent = t.contact.organization;
    if (translatableElements.emailAddressLabel) translatableElements.emailAddressLabel.textContent = t.contact.emailAddress;
    if (translatableElements.phoneNumberLabel) translatableElements.phoneNumberLabel.textContent = t.contact.phoneNumber;
    if (translatableElements.projectTypeLabel) translatableElements.projectTypeLabel.textContent = t.contact.projectType;
    if (translatableElements.selectTypeOption) translatableElements.selectTypeOption.textContent = t.contact.selectType;
    if (translatableElements.innovationOption) translatableElements.innovationOption.textContent = t.contact.innovation;
    if (translatableElements.environmentOption) translatableElements.environmentOption.textContent = t.contact.environment;
    if (translatableElements.professionalOption) translatableElements.professionalOption.textContent = t.contact.professional;
    if (translatableElements.educationOption) translatableElements.educationOption.textContent = t.contact.education;
    if (translatableElements.otherOption) translatableElements.otherOption.textContent = t.contact.other;
    if (translatableElements.projectDetailsLabel) translatableElements.projectDetailsLabel.textContent = t.contact.projectDetails;
    if (translatableElements.timelineLabel) translatableElements.timelineLabel.textContent = t.contact.timeline;
    if (translatableElements.selectTimelineOption) translatableElements.selectTimelineOption.textContent = t.contact.selectTimeline;
    if (translatableElements.urgentOption) translatableElements.urgentOption.textContent = t.contact.urgent;
    if (translatableElements.standardOption) translatableElements.standardOption.textContent = t.contact.standard;
    if (translatableElements.flexibleOption) translatableElements.flexibleOption.textContent = t.contact.flexible;
    if (translatableElements.planningOption) translatableElements.planningOption.textContent = t.contact.planning;
    if (translatableElements.consentLabel) translatableElements.consentLabel.textContent = t.contact.consent;
    if (translatableElements.submitButton) translatableElements.submitButton.textContent = t.contact.submit;
    
    // FOOTER
    if (translatableElements.footerNavAbout) translatableElements.footerNavAbout.textContent = t.navigation.about;
    if (translatableElements.footerNavPortfolio) translatableElements.footerNavPortfolio.textContent = t.navigation.portfolio;
    if (translatableElements.footerNavServices) translatableElements.footerNavServices.textContent = t.navigation.services;
    if (translatableElements.footerNavProcess) translatableElements.footerNavProcess.textContent = t.navigation.process;
    if (translatableElements.footerNavClients) translatableElements.footerNavClients.textContent = t.navigation.clients;
    if (translatableElements.footerNavResources) translatableElements.footerNavResources.textContent = t.navigation.resources;
    if (translatableElements.footerNavContact) translatableElements.footerNavContact.textContent = t.navigation.contact;
    if (translatableElements.copyrightText) translatableElements.copyrightText.textContent = t.footer.copyright;
    if (translatableElements.privacyLink) translatableElements.privacyLink.textContent = t.footer.privacy;
    if (translatableElements.imprintLink) translatableElements.imprintLink.textContent = t.footer.imprint;
    if (translatableElements.attributionLink) translatableElements.attributionLink.textContent = t.footer.attribution;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLanguage);