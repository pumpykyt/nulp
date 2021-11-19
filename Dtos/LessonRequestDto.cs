using System;

namespace lpnu.Dtos
{
    public class LessonRequestDto
    {
        public string GroupName { get; set; }
        public DateTime DateTime { get; set; }
        public string Url { get; set; }
        public int SubjectId { get; set; }
    }
}