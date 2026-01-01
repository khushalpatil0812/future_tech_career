package com.futuretech.career.config;

import com.futuretech.career.model.Admin;
import com.futuretech.career.model.Content;
import com.futuretech.career.model.SEO;
import com.futuretech.career.model.Testimonial;
import com.futuretech.career.repository.AdminRepository;
import com.futuretech.career.repository.ContentRepository;
import com.futuretech.career.repository.SEORepository;
import com.futuretech.career.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final AdminRepository adminRepository;
    private final ContentRepository contentRepository;
    private final SEORepository seoRepository;
    private final TestimonialRepository testimonialRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        initializeAdmin();
        initializeContent();
        initializeSEO();
        initializeTestimonials();
    }
    
    private void initializeAdmin() {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setEmail("admin@futuretech.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("Admin User");
            admin.setRole("admin");
            
            adminRepository.save(admin);
            log.info("✅ Default admin created - Email: admin@futuretech.com, Password: admin123");
        }
    }
    
    private void initializeContent() {
        if (contentRepository.count() == 0) {
            String[][] contentData = {
                {"home_hero", "Helping you build your career with expert guidance and support."},
                {"about_text", "Future Tech Consultancy is a career support and recruitment consultancy dedicated to helping job seekers navigate their career paths with confidence."},
                {"services_text", "We provide resume writing, interview preparation, LinkedIn optimization, and comprehensive career guidance services."},
                {"contact_info", "{\"phone\":\"7385552872\",\"email\":\"careerisfuturetech@gmail.com\",\"linkedin\":\"https://www.linkedin.com/company/future-tech-career/\"}"}
            };
            
            for (String[] data : contentData) {
                Content content = new Content();
                content.setSection(data[0]);
                content.setContent(data[1]);
                contentRepository.save(content);
            }
            
            log.info("✅ Default content sections created");
        }
    }
    
    private void initializeSEO() {
        if (seoRepository.count() == 0) {
            String[][] seoData = {
                {"home", "Future-Tech Career - Your Career Partner", "Expert career guidance, resume writing, and job placement services.", "career consultancy, resume writing, interview prep, job search", null},
                {"about", "About Us - Future-Tech Career", "Learn about our mission to help job seekers build successful careers.", "about us, career services, company mission", null},
                {"services", "Our Services - Future-Tech Career", "Resume writing, interview prep, LinkedIn optimization, and more.", "career services, resume writing, interview coaching", null},
                {"contact", "Contact Us - Future-Tech Career", "Get in touch with our career experts today.", "contact, get in touch, career help", null},
                {"feedback", "Share Your Feedback - Future-Tech Career", "Tell us about your experience with our services.", "feedback, testimonials, reviews", null}
            };
            
            for (String[] data : seoData) {
                SEO seo = new SEO();
                seo.setPage(data[0]);
                seo.setTitle(data[1]);
                seo.setDescription(data[2]);
                seo.setKeywords(data[3]);
                seo.setOgImage(data[4]);
                seoRepository.save(seo);
            }
            
            log.info("✅ Default SEO metadata created");
        }
    }
    
    private void initializeTestimonials() {
        if (testimonialRepository.count() == 0) {
            Object[][] testimonialData = {
                {"Priya Sharma", "priya.sharma@email.com", "Software Engineer", 5, "Future Tech helped me land my dream job at a top tech company. Their resume writing service was exceptional!", true},
                {"Rahul Verma", "rahul.verma@email.com", "Data Analyst", 5, "The interview preparation sessions boosted my confidence tremendously. Highly recommend their services!", true},
                {"Anita Patel", "anita.patel@email.com", "Product Manager", 5, "Professional and dedicated team. They helped me transition to a better role with excellent guidance.", true},
                {"Amit Kumar", "amit.kumar@email.com", "Business Analyst", 4, "Great experience with their career counseling service. Very responsive and helpful throughout the process.", true},
                {"Sneha Reddy", "sneha.reddy@email.com", "Marketing Manager", 5, "Their LinkedIn optimization service significantly improved my profile visibility. Got multiple interview calls!", true}
            };
            
            for (Object[] data : testimonialData) {
                Testimonial testimonial = new Testimonial();
                testimonial.setName((String) data[0]);
                testimonial.setEmail((String) data[1]);
                testimonial.setRole((String) data[2]);
                testimonial.setRating((Integer) data[3]);
                testimonial.setMessage((String) data[4]);
                testimonial.setIsActive((Boolean) data[5]);
                testimonialRepository.save(testimonial);
            }
            
            log.info("✅ Sample testimonials created");
        }
    }
}
