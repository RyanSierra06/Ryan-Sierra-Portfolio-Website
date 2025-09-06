# Ryan Sierra Portfolio Website

My personal portfolio website showcasing my projects, research, education, and extracurricular activities.  
The project uses **React, Vite, and Tailwind CSS** for the frontend, with **EmailJS** for the contact form

## Features
- **Education & About Me** – Overview of academic background and personal info.
- **Projects Showcase** – Highlights personal projects:  
  - Project cards with images, descriptions, and links to GitHub repos
  - Animated transitions on scroll  
- **Clubs & Activities** – Displays student organizations, roles, and achievements with dynamic cards.  
- **Research Projects** – Details research involvement, goals, results, and ongoing status.  
- **Contact Form** – Users can send messages directly via EmailJS
- **Social & Resume Links** – Quick access to LinkedIn, GitHub, and downloadable PDF resume.  
- **Smooth Scroll Animations** – Implemented using Framer Motion.

Each page leverages reusable React components for cards, split text animations, and interactive UI elements.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Messaging:** EmailJS  
- **Hosting:** Vercel

## Getting Started

### Prerequisites
- Node.js and npm installed
- EmailJS account with a service, template, and public key

### Setup

1. Clone the repository:
   ```bash
      git clone https://github.com/RyanSierra06/portfolio-website.git
      cd portfolio-website
2. Install dependencies:
   ```bash
      cd frontend && npm install
3. Configure EmailJS keys in App.jsx:
   ```bash 
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current,
        { publicKey: 'YOUR_PUBLIC_KEY' }
      );

4. Start the development server:
   ```bash
     cd frontend && npm run dev

5. View your frontend at http://localhost:5173

<img width="1315" height="856" alt="Screenshot 2025-08-22 at 6 17 32 PM" src="https://github.com/user-attachments/assets/328f1621-6642-4ccd-9a06-16d376ca50fe" />







