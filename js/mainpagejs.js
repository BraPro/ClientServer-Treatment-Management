   
   
   var myTable; // use a global for the submit and return data rendering in the examples    
    loadTable();
    function loadTable()
    {
        $.ajax({
            url: '/work',
            method: 'get',
            dataType: 'json',
            success: function (data){
                myTable =  $('#workTable').DataTable( {
                        dom: 'Bfrtip',  
                        data: data,                         
                        columns: [
                            {data: "WorkId"},
                            {data: "WorkDesc"},
                            {data: "Date"},
                            {data: "Carnumber"},
                            {
                                data: null,
                                className: "center",
                                defaultContent: '<a href="/mainpage" class="editor_edit">Edit</a> / <a href="" class="editor_remove">Delete</a>'
                            }
                        ]
                        
                }); 
            }
        });
    }
    $(document).ready(function() {
               
        loadTable();
         // Edit record
        $('#workTable').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();
            if($(this).context.innerHTML=="Edit")
            {
                $(this).context.innerText ="Save";
                var $row = $(this).closest("tr");
                var $tdElement = $row.find("td")[1];
                var txt = $tdElement.innerHTML;
                $tdElement.innerHTML = "<input style='width:100%;background-color: rgba(255, 255, 128, .5);' type='text' value='" + txt + "'>";
            }
            else{
                $(this).context.innerText ="Edit";
                var $row = $(this).closest("tr");
                var $tdElement = $row.find("td")[1];
                var id = $row.find("td")[0].innerHTML;
                var workDesc = $row.find("td").find("input").first().val();
                var json = {
                    'WorkId': id,
                    'WorkDesc': workDesc
                }
                $.ajax({
                    url: '/work',
                    type: 'PUT',
                    data: json,
                    success: function(result) {
                        $tdElement.innerHTML = workDesc
                    }
                });
            }
       } );
 
        // Delete a record
        $('#workTable').on('click', 'a.editor_remove', function (e) {
            e.preventDefault();
            
            var answer = confirm("Do you want to delete selected item?")
            if (answer) {
                var $row = $(this).closest("tr");
                var id = $row.find("td")[0].innerHTML;
                $(this).closest('tr').remove();
				
                $.ajax({
                    url: '/work',
                    type: 'DELETE',
					data: id,
                    success: function(result) {
                        myTable.destroy();
                        loadTable();
                    }
                });
            }
        } );
        $('#AddTreatmentBtn').on('click', addWork);
    });
    //add work to DB 
    function addWork(){
        var carnumber = $('#inputOwnerCarNumber').val();
        var treatmentinfo = $('#inputTreatmentInformation').val();
        
        var json = {
          'WorkDesc': treatmentinfo,
          'Carnumber': carnumber
        }
       
            var response = $.post('/work', json);
            response.done(function(){
                myTable.destroy();
                loadTable();
            });
        }
   
