@extends('layouts.adminlayout')

@section('title')
Admin | Admin Profile
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



<table class="table table-hover table-bordered table-striped col-md-6">

@foreach($user_data as $data)
@if($data->is_admin==1)
<tr><th>ID</th>
<td>{{$data['id']}}</td>
</tr>

<tr><th>Name</th>
<td>{{$data['name']}}</td>
</tr>

<tr><th>Email</th>
<td>{{$data['email']}}</td>
</tr>

<tr><td colspan="2" style="text-align:center"> <a href="/admin/edit/{{ $data->id}}" class="btn btn-success">Edit</a></td></tr>
@endif
@endforeach
</table>
</div>

@endsection