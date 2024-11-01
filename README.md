# Product-API

The Product API is a backend service that manages product, category, and brand entities. It supports full CRUD (Create, Read, Update, Delete) operations for each entity, allowing seamless product management within the system. This service is designed with Spring Boot, Spring Data JPA, and MySQL as the database, with asynchronous communication facilitated through RabbitMQ.

## Key Features

- **CRUD Operations**: 
  - Provides API endpoints to create, read, update, and delete products, categories, and brands.
- **Asynchronous Communication**:
  - Utilizes RabbitMQ to send data to a separate Store Service, ensuring efficient and asynchronous data transfer.
- **Docker Deployment**:
  - Dockerized and available as an image on DockerHub for easy deployment and scalability.

## Technical Stack

- **Backend**: Spring Boot, Spring Data JPA
- **Database**: MySQL
- **Messaging Queue**: RabbitMQ
- **Containerization**: Docker
- **Frontend**: Angular 18 (Product UI)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amirelkased/Product-Service.git
   cd Product-Service
   ```

2. **Setup the Backend**:
    - Ensure you have MySQL and RabbitMQ running.
    - Configure database credentials in the application properties file.
    - Run the Spring Boot application.

3. **Run the Frontend (Product UI)**:
   - Navigate to the ProductUI directory.
   - Install Angular dependencies:
     ```bash
       npm install
     ```
   - Start the Angular application:
     ```bash
       ng s -o
     ```
4. **Run backend by using Docker**
   - First pull image (optional):
     ```bash
       docker image pull amirelkased/product_service:v1.2
     ```
   - create a container from this image:
     ```bash
        docker container run -d --rm --name product-service -p 8080:8080 amirelkased/product_service:v1.2
     ```

**Usage**
  - Access the CRUD endpoints for managing products, categories, and brands through standard RESTful API calls.
  - The front end provides a UI for interacting with the Product API.

**Future Enhancements**
  - Improved UI/UX in Product UI
  - Additional services for extended functionalities








