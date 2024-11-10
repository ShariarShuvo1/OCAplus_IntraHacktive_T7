# Office of Co-Curricular Activities (OCA) Automation System

## Project Overview

The OCA Automation System is a digital platform designed to streamline the operations of a university's Office of Club Affairs (OCA). The website facilitates efficient event management, communication, room booking, budget tracking, and data insights for OCA staff, clubs, and advisors. By centralizing these activities, the system aims to reduce delays, enhance transparency, and allow for data-driven decision-making.

## Features Implemented

### 1. **Event Management**

-   **Digital Event Approval**: Clubs can submit event requests online. These requests are approved by advisors before being submitted to OCA for final approval, which reduces time delays compared to paper-based workflows.
-   **Approval Tracking**: Clubs can track the approval status of their requests in real-time.

### 2. **Communication System**

-   **Centralized Communication**: Provides a unified platform for OCA, advisors, and club members to communicate and receive timely updates.
-   **Notifications and Alerts**: Automated notifications for budget approvals, room bookings, and event status changes.

### 3. **Room Booking**

-   **Real-Time Availability**: Clubs can view available rooms and request bookings instantly, with real-time confirmations.
-   **Conflict Prevention**: Ensures no double bookings and allows for rescheduling if necessary.

### 4. **Budget Tracking and Transparency**

-   **Budget Request and Approval**: Clubs can submit budget requests digitally, streamlining the approval process.
-   **Expenditure Visualizations**: Graphs show budget usage over time, aiding financial transparency and planning.

### 5. **Data-Driven Insights**

-   **Automated Reporting**: Analytics provide insights on event participation, budget allocation, and room usage.
-   **Performance Dashboards**: Clubs can monitor past events and budget patterns for improved future planning.

## Technical Stack and Architecture

### Technologies Used

-   **Frontend**: Next.js for server-side rendering and improved performance.
-   **Styling**: Tailwind CSS for responsive and consistent UI design.
-   **Language**: TypeScript for type safety and improved code maintainability.
-   **Database**: MongoDB for flexible, document-based data storage.
-   **Media Storage**: Cloudinary for secure and scalable media storage.
-   **Authentication**: Clerk for streamlined user authentication and management.

### Architecture

-   **Model-View-Controller (MVC)**: Utilized for separation of concerns, improving code maintainability.
-   **API Integration**: Next.js API routes for efficient server-client communication.

## User Guide

### Getting Started

1.  **Sign Up and Login**:

    -   OCA sends invitations to club advisors and presidents to set up their accounts.
    -   Club presidents can invite additional panel members upon account creation.

2.  **Dashboard Navigation**:

    -   **Events**: Create, submit, and track event proposals.
    -   **Budget**: Submit and monitor budget requests, view spending charts.
    -   **Room Booking**: Access room availability and book instantly.
    -   **Reports**: View analytics on club performance and resource usage.

### Setup Instructions

-   **Local Setup**:
    1.  Clone the repository and navigate to the project directory.
    2.  Install dependencies with `npm install`.
    3.  Configure environment variables for MongoDB, Cloudinary, and Clerk.
    4.  Run the development server with `npm run dev`.

## Challenges and Solutions

-   **Approval Delays**: Overcome with an end-to-end digital approval workflow for faster, online event approvals.
-   **Communication Fragmentation**: Centralized communication system keeps all stakeholders informed and updated.
-   **Room Booking Conflicts**: Real-time availability reduces scheduling issues and double bookings.
-   **Budget Transparency**: Digital budget tracking module with visual insights ensures clear communication and financial planning.

## Future Enhancements

-   **Enhanced Role-Based Access Control**: Add granular permissions within clubs for increased data security.
-   **Predictive Analytics**: Include insights into trends in attendance, budget allocations, and room occupancy.
-   **Mobile Version**: Develop a mobile app to improve accessibility for all users.
