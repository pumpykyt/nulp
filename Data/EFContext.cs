using lpnu.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Data
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }
        
        public virtual DbSet<Mark> Marks { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Lesson> Lessons { get; set; }
    }
}