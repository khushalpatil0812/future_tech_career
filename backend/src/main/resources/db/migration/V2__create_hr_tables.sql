-- Create Companies table (if not exists)
CREATE TABLE IF NOT EXISTS companies (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    website_url VARCHAR(255),
    industry VARCHAR(100),
    logo_url VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Job Openings table
CREATE TABLE IF NOT EXISTS job_openings (
    id VARCHAR(36) PRIMARY KEY,
    company_id VARCHAR(36),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(100),
    location VARCHAR(255),
    employment_type VARCHAR(50),
    experience_level VARCHAR(50),
    salary_range VARCHAR(100),
    requirements TEXT,
    responsibilities TEXT,
    status VARCHAR(50) DEFAULT 'open',
    openings_count INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- Create Candidates table
CREATE TABLE IF NOT EXISTS candidates (
    id VARCHAR(36) PRIMARY KEY,
    job_opening_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    resume_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    current_company VARCHAR(255),
    total_experience DECIMAL(4,1),
    skills TEXT,
    interview_stage VARCHAR(50) DEFAULT 'screening',
    final_status VARCHAR(50) DEFAULT 'in-progress',
    hr_notes TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_opening_id) REFERENCES job_openings(id) ON DELETE CASCADE
);

-- Create Clients table
CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    industry VARCHAR(100),
    website_url VARCHAR(255),
    contact_person VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Contracts table
CREATE TABLE IF NOT EXISTS contracts (
    id VARCHAR(36) PRIMARY KEY,
    client_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    contract_number VARCHAR(100),
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    contract_value DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'active',
    payment_terms VARCHAR(255),
    document_url VARCHAR(255),
    terms TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Create Resource Requirements table
CREATE TABLE IF NOT EXISTS resource_requirements (
    id VARCHAR(36) PRIMARY KEY,
    client_id VARCHAR(36) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    project_name VARCHAR(255),
    required_count INT DEFAULT 1,
    fulfilled_count INT DEFAULT 0,
    skills_required TEXT,
    experience_level VARCHAR(50),
    min_experience DECIMAL(4,1),
    max_experience DECIMAL(4,1),
    location VARCHAR(255),
    budget_per_resource DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'open',
    priority VARCHAR(50) DEFAULT 'medium',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_job_openings_status ON job_openings(status);
CREATE INDEX IF NOT EXISTS idx_job_openings_company ON job_openings(company_id);
CREATE INDEX IF NOT EXISTS idx_candidates_job ON candidates(job_opening_id);
CREATE INDEX IF NOT EXISTS idx_candidates_stage ON candidates(interview_stage);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_contracts_client ON contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_resource_requirements_client ON resource_requirements(client_id);
CREATE INDEX IF NOT EXISTS idx_resource_requirements_status ON resource_requirements(status);
