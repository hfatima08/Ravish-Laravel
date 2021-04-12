@extends('layouts.adminlayout')

@section('title')
Admin | Categories Details
@endsection

@section('content')
<br><br>
<div class="container">

@if(\Session::has('success'))
<div class="alert alert-success">
{{\Session::get('success')}}
</div>
@endif

<a href="{{route('add.category')}}" class="btn btn-primary btn-lg" style="float:right;margin-bottom:15px;font-size:17px"><i class="fa fa-plus" aria-hidden="true"></i>Add Category</a><br><br>
<table class="table table-bordered table-hover table-striped" style="text-align:center">
<tr>
<th>Category ID</th>
<th>Category Name</th>
<th>Edit</th>
<th>Delete</th>
</tr>

@foreach($details as $item)
<tr>
<td>{{$item['id']}}</td>
<td>{{$item['Category']}}</td>
<td><a href="/category/edit/{{ $item->id}}" class="btn btn-success">Edit</a></td>
<td><a href="/category/delete/{{ $item->id}}" class="btn btn-danger">Delete</a></td>
</tr>
@endforeach
</table>
</div>

@endsection