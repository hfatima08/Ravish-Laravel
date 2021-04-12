@extends('layouts.adminlayout')

@section('title')
Admin | Create User
@endsection
@section('content')

<div class="container">
@if(count($errors)>0)
<div class="alert alert-danger">
@foreach($errors->all() as $error)
<h4>{{$error}}</h4>
@endforeach
</div>
@endif
<div class="col-lg-6">
<form action="{{route('user.submit')}}" method="post">
@csrf
<div class="form-group">
<Label>Name</Label>
<input type="text" name="name" placehoder="Enter Name" class="form-control">
</div>
<div class="form-group">
<Label>Email</Label>
<input type="text" name="email" placehoder="Enter Email" class="form-control">
</div>
<div class="form-group">
<Label>Password</Label>
<input type="password" name="password" placehoder="Enter Password" class="form-control">
</div>
<div class="form-group">
<Label>Role</Label>
<select name="type" id="" class="form-control">
    <option value="">Select Type</option>
    <option value="" disabled>Admin</option>
    <option value="0" default>User</option>
</select>
</div>
<div class="form-group">
<input type="submit" value="Submit" class="btn btn-info">
</div>
</div>
</form>
</div>
@endsection