# ServiceSphere Freelancing Platform (ASP.NET & ReactJS)

About the project: 
ServiceSphere is a cutting-edge online platform meticulously designed to redefine the landscape of freelance collaboration and project management. the comprehensive solution serves as a nexus connecting clients, freelancers, and project teams across diverse industries, including Engineering & Architecture, Construction/Renovation, Event Planning, and Education. One of the standout features of ServiceSphere is its innovative approach to Extensive Projects, where AI plays a pivotal role in breaking down projects into services and forming dedicated freelance teams. It combines the flexibility of hiring individual freelancers for specific tasks and the capability to form dedicated teams for extensive projects.

ServiceSphere is a robust platform designed to facilitate seamless interactions between freelancers, clients, and project teams across various industries. the platform simplifies the process of finding, hiring, and managing freelance talent for projects ranging from simple services to extensive project collaborations. This document provides an overview of the backend API endpoints that power the ServiceSphere platform, detailing the core functionalities and technologies used.

## Core Features

### Account Management
- **Login and Registration**: Secure JWT user authentication for freelancers and clients, including registration and login functionalities.
- **Profile Management**: Users can manage their profiles, including email existence checks and retrieval of freelancer or client information.
- **Address Management**: Users can add or update their address information for more personalized service and project postings.
  
### Freelancer-Specific Features
- **Profile Management**: Freelancers can create their own profiles, update personal information, and view details of their professional profiles. This helps maintain an up-to-date presence on the platform, which is crucial for attracting client projects.
- **Skills Management**: Freelancers have the ability to add specific skills to their profiles, enhancing their visibility for specialized tasks and projects.
- **Adding Services**: Freelancers can add the services they provide to their profiles, with determining it's price and other info, highlighting their expertise in specific areas. This allows clients to easily identify freelancers with the skills they require for their projects.
- **Proposal Submission and Management**: Freelancers can actively participate in project bids by submitting proposals. They also have the capability to manage these proposals by viewing all their submissions, making necessary modifications, or withdrawing their proposals if needed.

### Client-Specific Features
- **Profile Management**: Clients can set up and maintain their profiles, ensuring they accurately represent their business needs and project requirements.
- **Job and Service Postings**: Clients can post new jobs and service requests, update existing postings, and delete those no longer needed. This enables them to manage how they source freelancers and structure their project offerings efficiently.
- **Project Postings**: In addition to regular job postings, clients can also manage larger-scale project postings, detailing each project's scope and requirements.
- **Reviews**: Clients can receive and provide reviews, allowing for a transparent reflection of the quality of work and cooperation, fostering a trustworthy community.

### Collaborative Features
- **Group Chat**: Upon acceptance of a proposal, freelancers are enabled to join dedicated group chats for each job, facilitating direct communication and collaboration with clients and other team members.
- **Project Teams**: Clients and freelancers can form teams for specific projects, allowing for structured collaboration and management of larger or more complex projects.

### Hiring and Notification System
- **Hiring Process**: Clients can initiate the hiring process directly through the platform, specifying requirements and selecting suitable freelancers for their projects.
- **Notifications**: Both freelancers and clients receive timely notifications regarding job postings, proposal statuses, and other relevant activities, ensuring they are always informed of important developments.

### AI and Advanced Functionality
- **Text Refinement**: ServiceSphere employs AI technology to refine job and project descriptions, ensuring they are clear and effective. This enhancement increases the appeal of postings, attracting suitable freelancers and clients more effectively.

- **Project Milestone Generation**: With AI algorithms, ServiceSphere automatically generates project milestones based on requirements and objectives. This feature aids in project planning by breaking tasks into manageable stages, facilitating smoother project management.

- **Team Assembly for Extensive Projects**: ServiceSphere utilizes advanced AI to assemble project teams based on requirements and freelancer skills. This intelligent feature optimizes resource allocation and enhances collaboration for successful project outcomes.
Categories and Sub-Categories: Both freelancers and clients can browse through categorized listings of services and projects, making it easier to find matches that align with specific skills or needs.

### Administrative and Supportive Features
- **Contracts Management**: Facilities for managing and viewing contracts between freelancers and clients.
- **Payment Functionality with Stripe**: Freelancers can securely receive payments for their services through the integration of Stripe. This enables seamless transactions between clients and freelancers, providing a convenient and reliable payment solution within the platform.
- **Categories and Sub-Categories**: Detailed listings of services categorized to aid in easier navigation and matching.
  
### Buggy (Error Handling)
- **Error Simulation**: Endpoints for simulating common HTTP errors (NotFound, Server Error, BadRequest) for testing the platform's error handling capabilities.


## Technologies

The ServiceSphere platform backend is built using a range of modern technologies and practices to ensure scalability, security, and performance:

- **ASP.NET Core**: A cross-platform, high-performance framework for building modern, cloud-based, Internet-connected applications.
- **Entity Framework Core**: An object-database mapper for .NET, enabling developers to work with a database using .NET objects, utilizing mutiple design patterns like Specification design pattern.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens to manage user sessions and protect endpoints.
- **Microsoft SQL Server**: A relational database management system used to store and manage the platform's data securely.
- **RESTful API Design**: Adheres to REST principles, providing a scalable approach to organizing the backend services into logical resources.
- **Error Handling and Logging**: Comprehensive error handling and logging mechanisms to ensure the platform's reliability and ease of maintenance.
- **Frontend Technologies**: The frontend is developed using ReactJS, known for its efficiency and flexibility in building dynamic user interfaces. This includes the use of Redux for state management and React Router for navigation.

## Getting Started

To get started with the ServiceSphere platform backend:

1. **Clone the Repository**: Clone the backend repository to your local development environment.
2. **Configure the Database**: Update the connection strings in the `appsettings.json` file to point to your SQL Server instance.
3. **Apply Migrations**: Use Entity Framework Core to apply database migrations and set up the initial schema.
4. **Run the Application**: Start the application using Visual Studio or the .NET Core CLI to launch the backend services.
5. **Explore API Endpoints**: Utilize tools like Postman or Swagger to explore and test the available API endpoints.

