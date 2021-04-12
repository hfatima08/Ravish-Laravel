@extends('layouts.adminlayout')

@section('title')
Admin | Add Category
@endsection

@section('content')
<br><br>
<div class="container">

@if(count($errors)>0)
<div class="alert alert-danger">
<ul>
@foreach($errors->all() as $error)
<li>{{$error}}</li>
@endforeach
</ul>

</div>
@endif
<div class="col-lg-6">
<form action="{{route('save.category')}}" method="post">
@csrf
<div class="form-group">
<Label>Category Name</Label>
<input type="text" name="category" placeholder="Enter Category Name" class="form-control">
</div>
<div class="form-group">
<input type="submit" value="Add" class="btn btn-info">
</div>
</form>
</div>
</div>

@endsection