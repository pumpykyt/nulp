using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace lpnu.Data.Entities
{
    public class User : IdentityUser
    {
        public string ImagePath { get; set; }
        public string GroupName { get; set; }
        public virtual ICollection<Mark> Marks { get; set; }
    }
}