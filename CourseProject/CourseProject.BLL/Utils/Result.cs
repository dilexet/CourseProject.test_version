using System;
using CourseProject.BLL.Enums;

namespace CourseProject.BLL.SharedModels
{
    public class Result
    {
        public StatusType Status { get; set; }
        public string Message { get; set; }
        public Object Data { get; set; }
    }
}