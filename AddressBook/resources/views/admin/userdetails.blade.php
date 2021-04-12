@extends('layouts.adminlayout')

@section('title')
Admin | User Details
@endsection

@section('content')
<br>
<div class="container">

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


<a href="{{route('user.create')}}" class="btn btn-primary btn-lg" style="float:right;margin-bottom:10px;font-size:17px"><i class="fa fa-plus" aria-hidden="true"></i>
Create User</a>
<table class="table table-hover table-bordered table-striped" style="text-align:center">

<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Edit</th>
<th>Delete</th>
</tr>

@foreach($user_data as $data)
<tr>
@if($data->is_admin==0)
<td>{{$data['id']}}</td>
<td>{{$data['name']}}</td>
<td>{{$data['email']}}</td>
<td> <?php echo 'User' ?> </td>
<td><a href="/user/edit/{{ $data->id}}" class="btn btn-success">Edit</a></td>
<td><a href="/user/delete/{{ $data->id}}" class="btn btn-danger">Delete</a></td>
@endif
</tr>
@endforeach
</table>
</div>

@endsection