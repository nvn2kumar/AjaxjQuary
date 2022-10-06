


$(document).ready(function () {
    ShowEmployeeData();
})

/*index page list------------------------------------------------------------------------------------------------------------------------------------------------------*/
function ShowEmployeeData() {
    debugger;
    var url = $("#urlEmployeeData").val();                                     /*'/Ajax/EmployeeList';*/
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, statu, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.email + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a>||<a class="btn btn-danger" onclick="Delete(' + item.id + ')">Delete</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () { alert("Data not receieved !"); }

    });
};

/*Modal popup Add data---------------------------------------------------------------------------------------------------------------------------------------------------*/
$('#btnAddEmployee').click(function () {
    debugger;
    clearTextbox();
    $('#EmployeeMadal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Add Employee');
    

});

function AddEmployee() {
    debugger;
    var objData = {
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Ajax/AddEmployee',
        type: 'Post',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function () {
            alert('Data Saved Successfully !');
            clearTextbox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data Can't Saved !");
        }
    })
}


function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
}


/*clear Text box-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
function clearTextbox() {
    $('#Name').val(''),
    $('#Email').val(''),
    $('#Salary').val(''),
    $('#EmployeeId').val('')
}

/*delete data--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function Delete(id) {
    debugger;
    if (confirm('Are you sure you want to delete this record ?')) {

        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert('Record Deleted Successfully !');
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can't be deleted !");
            }
        })

    }
   
}
/*Edit Data & update data--------------------------------------------------------------------------------------------------------------------------------------------------*/
function Edit(id) {
    debugger;
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {

            $('#EmployeeMadal').modal('show');
            $('#empId').show();
            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);
            $('#Email').val(response.email);
            $('#Salary').val(response.salary);
            $('#AddEmployee').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#employeeHeading').text('Update Employee');

            //$('#AddEmployee').hide();
            //$('#btnUpdate').show();

        },
        error: function () { alert('Data not Found !') }

    })
}


function UpdateEmployee() {
    debugger;
    var objData = {
        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Ajax/Update',
        type: 'Post',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function () {
            alert('Data Updated Successfully !');
            clearTextbox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data Can't Saved !");
        }
    })
}

