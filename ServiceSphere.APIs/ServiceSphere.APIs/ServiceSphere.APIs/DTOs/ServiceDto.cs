﻿using ServiceSphere.core.Entities.Services;

namespace ServiceSphere.APIs.DTOs
{
    public class ServiceDto
    {
       // public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }

        //foreign key for freelancer
        // public string? FreelancerId { get; set; }
        // public Freelancer Freelancer { get; set; }
        public string? UserId { get; set; }
        public string? FreelancerId { get; set; }

        public int CategoryId { get; set; }

       // public string CategoryName { get; set; }
        //foreign key for Category

    }
}
