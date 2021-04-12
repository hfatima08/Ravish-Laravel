<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
   
  </head>
  <body>
    <table class="table table-bordered">
    <thead>
      <tr>
        <td><b>ID</b></td>
        <td><b>Full Name</b></td>
        <td width="100%"><b>Email Address</b></td>     
        <td><b>Mobile No#</b></td>     
        <td><b>Work Phone No#</b></td>     
        <td><b>Date Of Birth</b></td>     
        <td><b>Category</b></td> 
        <td><b>Address</b></td>         
        <td><b>City</b></td>     
        <td><b>Remarks</b></td>     
      </tr>
      </thead>
      <tbody>
      @foreach($show as $values)
      <tr>
        <td>
          {{$values->id}}
        </td>
        <td>
          {{$values->fullname}}
        </td>
        <td>
          {{$values->email}}
        </td>
        <td>
          {{$values->cellno}}
        </td>
        <td>
          {{$values->phoneno}}
        </td>
        <td>
          {{$values->dob}}
        </td>
        <td>
          {{$values->category}}
        </td>
        <td>
          {{$values->address}}
        </td>
        <td>
          {{$values->city}}
        </td>
        <td>
          {{$values->remarks}}
        </td>
      </tr>
      @endforeach
      </tbody>
    </table>
  </body>
</html>