using AjaxjQuary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace AjaxjQuary.Controllers
{
    public class AjaxController : Controller
    {
        private readonly EmployeeContext context;

        public AjaxController(EmployeeContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            var data = context.Employees.ToList();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            try
            {
                var emp = new Employee()
                {
                    Name = employee.Name,
                    Email = employee.Email,
                    Salary = employee.Salary
                };
                context.Employees.Add(emp);
                context.SaveChanges();
                return new JsonResult("Data is Saved");
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public JsonResult Delete(int id)
        {
            var data = context.Employees.Where(e => e.Id == id).SingleOrDefault();
            context.Employees.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data Deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = context.Employees.Where(e => e.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            try
            {
                context.Employees.Update(employee);
                context.SaveChanges();
                return new JsonResult("Record Updated");
            }
            catch (Exception e)
            {
                throw;
            }
        }

    }
}
