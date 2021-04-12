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
        <td><b>Product Name</b></td>
        <td><b>Discription</b></td>     
        <td><b>Category</b></td>     
        <td><b>Price</b></td>          
      </tr>
      </thead>
      <tbody>
      @foreach($print as $values)
      <tr>
        <td>
          {{$values->id}}
        </td>
        <td>
          {{$values->Pr_Name}}
        </td>
        <td>
          {{$values->Discription}}
        </td>
        @foreach($category_data as $item)
        @if($values->Category_id == $item->id)
        <td>
          {{$item->Category}}
        </td>
        @endif
        @endforeach
        <td>
          Rs.{{$values->Price}}
        </td>
        
      </tr>
      @endforeach
      </tbody>
    </table>
  </body>
</html>