using System;

namespace lpnu.Dtos
{
    public class LessonResponseDto
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string TeacherName { get; set; }
        public DateTime DateTime { get; set; }
        public string Url { get; set; }
        public string SubjectName { get; set; }
    }
}