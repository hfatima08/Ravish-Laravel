@extends('layouts.adminlayout')

@section('title')
Admin | Product Details
@endsection

@section('content')
<br><br>

@if(\Session::has('success'))
<div class="alert alert-success">
{{\Session::get('success')}}
</div>
@endif


@if(\Session::has('fail'))
<div class="alert alert-danger">
{{\Session::get('fail')}}
</div>
@endif
<a href="{{route('product.pdf')}}" class="btn btn-primary btn-lg" style="float:left;margin-bottom:10px;font-size:17px"><i class="fa fa-download" aria-hidden="true"></i>
Download PDF</a>

<a href="{{route('add.product')}}" class="btn btn-primary btn-lg" style="float:right;margin-bottom:10px;font-size:17px"><i class="fa fa-plus" aria-hidden="true"></i>
Add Product</a>
<div class="container ">
<table class="table table-hover table-bordered table-striped" style="text-align:center">
<tr>
<th>Product ID</th>
<th>Product Name</th>
<th>Discription</th>
<th>Category</th>
<th>Price</th>
<th>Image</th>
<th>Edit</th>
<th>Delete</th>
</tr>
@foreach($products_data as $item)
<tr>
<td>{{$item['id']}}</td>
<td>{{$item['Pr_Name']}}</td>
<td>{{$item['Discription']}}</td>
@foreach($category_data as $value)
@if($item['Category_id'] == $value['id'])
<td>{{$value['Category']}}</td>
@endif
@endforeach
<td>Rs.{{$item['Price']}}</td>
<td><img src="{{$item['Image_Url']}}" alt="Image Not Found" width="150" height="150"></td>
<td><a href="/product/edit/{{ $item->id}}" class="btn btn-success">Edit</a></td>
<td><a href="/product/delete/{{ $item->id}}" class="btn btn-danger">Delete</a></td>
</tr>
@endforeach
</table>
</div>

@endsection
