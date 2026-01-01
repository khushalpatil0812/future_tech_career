-- Insert sample testimonials into database
INSERT INTO testimonials (id, name, email, role, rating, message, is_active, created_at, updated_at)
VALUES
    (UUID(), 'Priya Sharma', 'priya.sharma@email.com', 'Software Engineer', 5, 'Future Tech helped me land my dream job at a top tech company. Their resume writing service was exceptional!', true, NOW(), NOW()),
    (UUID(), 'Rahul Verma', 'rahul.verma@email.com', 'Data Analyst', 5, 'The interview preparation sessions boosted my confidence tremendously. Highly recommend their services!', true, NOW(), NOW()),
    (UUID(), 'Anita Patel', 'anita.patel@email.com', 'Product Manager', 5, 'Professional and dedicated team. They helped me transition to a better role with excellent guidance.', true, NOW(), NOW()),
    (UUID(), 'Amit Kumar', 'amit.kumar@email.com', 'Business Analyst', 4, 'Great experience with their career counseling service. Very responsive and helpful throughout the process.', true, NOW(), NOW()),
    (UUID(), 'Sneha Reddy', 'sneha.reddy@email.com', 'Marketing Manager', 5, 'Their LinkedIn optimization service significantly improved my profile visibility. Got multiple interview calls!', true, NOW(), NOW());
