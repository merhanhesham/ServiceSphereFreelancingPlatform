# ServiceSphereFreelancingPlatform (ASP.NET & ReactJS)

About the project: 
ServiceSphere is a cutting-edge online platform meticulously designed to redefine the landscape of freelance collaboration and project management. the comprehensive solution serves as a nexus connecting clients, freelancers, and project teams across diverse industries, including Engineering & Architecture, Construction/Renovation, Event Planning, and Education. One of the standout features of ServiceSphere is its innovative approach to Extensive Projects, where AI plays a pivotal role in breaking down projects into services and forming dedicated freelance teams. It combines the flexibility of hiring individual freelancers for specific tasks and the capability to form dedicated teams for extensive projects.

ServiceSphere is a robust platform designed to facilitate seamless interactions between freelancers, clients, and project teams across various industries. the platform simplifies the process of finding, hiring, and managing freelance talent for projects ranging from simple services to extensive project collaborations. This document provides an overview of the backend API endpoints that power the ServiceSphere platform, detailing the core functionalities and technologies used.

## Core Features

### Account Management
- **Login and Registration**: Secure user authentication for freelancers and clients, including registration and login functionalities.
- **Profile Management**: Users can manage their profiles, including email existence checks and retrieval of freelancer or client information.
- **Address Management**: Users can add or update their address information for more personalized service and project postings.

### Agreements
- **Proposal Submission**: Freelancers can submit proposals for both project and service postings, facilitating the bidding process.
- **Proposal Management**: Users can view, update, or delete their proposals, and clients can accept proposals through the platform.

### Assessments
- **Notifications**: The platform supports sending notifications, along with retrieving unread and all notifications for a user.
- **Reviews**: Users can post reviews for services or projects they've utilized or completed, enhancing trust within the community.

### Buggy (Error Handling)
- **Error Simulation**: Endpoints for simulating common HTTP errors (NotFound, Server Error, BadRequest) for testing the platform's error handling capabilities.

### Posting
- **Service and Project Postings**: Clients can create, update, or delete service and project postings, making it easier to find the right talent.
- **Posting Retrieval**: Users can retrieve all service postings, specific service, or project postings, enabling freelancers to find suitable jobs.

### Services
- **Service Discovery**: Facilitates the discovery of services and sub-categories, allowing freelancers to offer their skills in specific areas.

## Technologies

The ServiceSphere platform backend is built using a range of modern technologies and practices to ensure scalability, security, and performance:

- **ASP.NET Core**: A cross-platform, high-performance framework for building modern, cloud-based, Internet-connected applications.
- **Entity Framework Core**: An object-database mapper for .NET, enabling developers to work with a database using .NET objects, utilizing mutiple design patterns like Specification design pattern.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens to manage user sessions and protect endpoints.
- **Microsoft SQL Server**: A relational database management system used to store and manage the platform's data securely.
- **RESTful API Design**: Adheres to REST principles, providing a scalable approach to organizing the backend services into logical resources.
- **Error Handling and Logging**: Comprehensive error handling and logging mechanisms to ensure the platform's reliability and ease of maintenance.

## Getting Started

To get started with the ServiceSphere platform backend:

1. **Clone the Repository**: Clone the backend repository to your local development environment.
2. **Configure the Database**: Update the connection strings in the `appsettings.json` file to point to your SQL Server instance.
3. **Apply Migrations**: Use Entity Framework Core to apply database migrations and set up the initial schema.
4. **Run the Application**: Start the application using Visual Studio or the .NET Core CLI to launch the backend services.
5. **Explore API Endpoints**: Utilize tools like Postman or Swagger to explore and test the available API endpoints.

