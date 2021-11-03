using System;

namespace CourseProject.API.ViewModel
{
    public class Response
    {
        public int Code { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public Object Data { get; set; }
    }
}