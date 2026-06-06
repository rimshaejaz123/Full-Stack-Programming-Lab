# Full-Stack-Programming-Lab
Project: Final_Term_Project_HLApp
A comprehensive Healthcare Appointment System designed to manage doctors, patients, and the complete treatment lifecycle.

Overview
This application provides a secure, role-based healthcare management system. It enables patients to book appointments, allows doctors to manage medical records and prescriptions, and provides administrators with a centralized dashboard for system oversight.

Key Features
Secure Authentication: JWT-based role access control for Admin, Doctors, and Patients.

Appointment Lifecycle: Full flow from booking and approval to treatment tracking and follow-up scheduling.

Medical Records Management: Digital prescriptions, vital sign logging, and patient history tracking.

Notification System: Automated feedback for appointment status, medication reminders, and follow-ups.

Admin Dashboard: Full CRUD capabilities for user management.

Tech Stack
Frontend: Next.js (React), Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Security: JWT (JSON Web Tokens), bcryptjs

Folder Structure
Plaintext
Final_Term_Project_HLApp/
├── frontend/      # Next.js client-side application
└── backend/       # Node.js/Express server API
Installation & Setup
Clone the repository:

Bash
git clone https://github.com/rimshaejaz123/Full-Stack-Programming-Lab.git
Backend Setup:

Navigate to backend/

Create a .env file and set MONGO_URI and JWT_SECRET.

Run npm install

Run node server.js

Frontend Setup:

Navigate to frontend/

Run npm install

Run npm run dev

Project Documentation
Developed by: Rimsha Ejaz

Lab Submission: Final Term Project

How to add this to your GitHub:
Copy the text above.

In your Full-Stack-Programming-Lab repository on GitHub, click the README.md file.

Click the pencil icon (Edit).

Delete the existing text, paste this new content, and click Commit changes at the bottom.
