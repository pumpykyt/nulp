using System;
using System.ComponentModel.DataAnnotations;

namespace lpnu.Data.Entities
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }
        public string GroupName { get; set; }
        public DateTime DateTime { get; set; }
        public string Url { get; set; }
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
    }
}