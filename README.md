# Safyra Project

Safyra is an innovative safety and security platform designed to empower individuals, with a particular focus on women's safety. By integrating a modern web application with advanced computer vision and AI capabilities, Safyra provides real-time threat detection, emergency alerts, and evidence preservation. The user-friendly dashboard allows individuals to monitor and manage their safety devices, offering peace of mind and proactive protection.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
  - [Frontend Technologies](#frontend-technologies)
  - [Backend Technologies](#backend-technologies)
  - [Computer Vision & AI](#computer-vision--ai)
  - [Data Storage](#data-storage)
  - [Development Tools](#development-tools)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
Safyra combines cutting-edge web technologies with AI-driven computer vision to deliver a robust safety solution. Key features include:
- A dynamic, responsive dashboard for user interaction.
- Real-time threat detection using computer vision and deep learning.
- Emergency alert systems and evidence recording for critical situations.
- A modular architecture for scalability and ease of maintenance.

The project aims to provide users with tools to enhance their personal security, leveraging both frontend and backend technologies alongside AI innovations.

## Technology Stack

### Frontend Technologies
- **React:** A JavaScript library for building interactive and dynamic user interfaces.
- **TypeScript:** A strongly typed superset of JavaScript, enhancing code reliability and maintainability.
- **Vite:** A modern, high-speed build tool and development server for efficient frontend workflows.
- **Tailwind CSS:** A utility-first CSS framework for crafting responsive, visually appealing designs quickly.
- **shadcn-ui:** Pre-built, reusable UI components styled with Tailwind CSS for consistency and ease of use.
- **Font Awesome:** A comprehensive icon library providing scalable vector icons for the UI.

### Backend Technologies
- **Node.js:** A JavaScript runtime for developing scalable, server-side applications.
- **Express.js:** A lightweight and flexible framework for Node.js, used to create RESTful API endpoints.

### Computer Vision & AI
- **OpenCV (cv2):** An open-source library for computer vision, utilized for image and video processing tasks.
- **Python:** The primary language for implementing AI and machine learning components.
- **NumPy:** A Python library for efficient numerical computations, crucial for processing arrays and matrices.
- **Deep Learning Models:** Custom-trained models for detecting weapons (e.g., guns, knives) in video streams.

### Data Storage
- **JSON:** A lightweight format for storing configuration settings and alert data.
- **Local File System:** Used to store video recordings and evidence files securely.

### Development Tools
- **npm/Bun:** Package managers for installing and managing JavaScript dependencies.
- **ESLint:** A tool for identifying and resolving issues in JavaScript and TypeScript code.
- **PostCSS:** A CSS transformation tool, integrated with Tailwind CSS for enhanced styling capabilities.
- **TypeScript Compiler:** Ensures type safety and compiles TypeScript into executable JavaScript.

## Project Structure

### Frontend
- **Single-Page Application (SPA):** Built with React and TypeScript for a seamless user experience.
- **Components:** Modular UI elements including sections for device status, alerts, and settings.
- **Styling:** Utilizes Tailwind CSS and shadcn-ui for a modern, responsive design.

### Backend
The backend comprises multiple services, each tailored to specific functionalities:
- **EvidenceFeedback:** Manages the recording and storage of evidence, such as video clips.
- **VCTrack:** Facilitates video capture and tracking for real-time monitoring.
- **WreaponDetect2:** Implements weapon detection using computer vision and AI models.

These services communicate with the frontend through well-defined API endpoints.

## Security Features
- **Emergency Alert System:** Enables users to send SOS alerts during emergencies.
- **Weapon Detection:** Employs AI to identify weapons in video streams, complete with confidence scoring for reliability.
- **Evidence Recording:** Automatically captures and stores video evidence for future reference.
- **SOS Reporting System:** Generates detailed reports for emergency incidents, supporting post-event analysis.

## Deployment
Currently, Safyra is configured for local development and testing:
- **Local Development Server:** Hosts the frontend and backend services on localhost.
- **Static File Serving:** Delivers HTML, CSS, and JavaScript assets for the frontend.
- **API Endpoints:** Enable data exchange between the frontend and backend.

For production deployment, consider using containerization (e.g., Docker) and cloud platforms (e.g., AWS, Heroku) to ensure scalability and reliability.

## Contributing
We welcome contributions to enhance Safyra! To get started:
- **Fork the repository.**
- **Create a feature or bug-fix branch.**
- **Submit a pull request** with a clear explanation of your changes.

Please ensure your code follows the project's standards and includes appropriate documentation.

## License
This project is licensed under the [MIT License](LICENSE).