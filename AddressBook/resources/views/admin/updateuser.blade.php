@extends('layouts.adminlayout')

@section('title')
Admin | Edit User
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
<form action="/user/edit/{{$user[0]->id}}" method="post">
@csrf
<div class="form-group">
<Label>Name</Label>
<input type="text" name="name" placehoder="Enter Name" value="{{ $user[0]->name }}"  class="form-control">
</div>
<div class="form-group">
<Label>Email</Label>
<input type="text" name="email" placehoder="Enter Email" value="{{ $user[0]->email }}"  class="form-control">
</div>
<div class="form-group">
<Label>Password</Label>
<input type="password" name="password" placehoder="Enter Password" value="{{ $user[0]->password }}"  class="form-control">
</div>
<div class="form-group">
<Label>Role</Label>
<select name="type" id="" class="form-control" value="{{ $user[0]->is_admin }}">
    <option value="">Select Type</option>
    <option value="" disabled>Admin</option>
    <option value="0">User</option>
</select>
</div>
<div class="form-group">
<input type="submit" value="Update" class="btn btn-info">
</div>
</div>
</form>
</div>
@endsection