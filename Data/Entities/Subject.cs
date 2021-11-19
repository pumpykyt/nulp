using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace lpnu.Data.Entities
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string TeacherName { get; set; }
        public virtual ICollection<Mark> Marks { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}