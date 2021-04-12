@extends('layouts.adminlayout')

@section('title')
Admin | Edit Product
@endsection
@section('content')

<div class="container col-md-12">
@if(count($errors)>0)
<div class="alert alert-danger">
@foreach($errors->all() as $error)
<h4>{{$error}}</h4>
@endforeach
</div>
@endif
<div class="col-lg-6">
<form action="/product/edit/{{$product[0]->id}}" method="post" enctype="multipart/form-data">
@csrf
<div class="form-group">
<Label>Product Name</Label>
<input type="text" name="productname" placeholder="Enter Product Name" value="{{ $product[0]->Pr_Name }}" class="form-control">
</div>
<div class="form-group">
<Label>Discription</Label>
<input type="text" name="discription" placeholder="Enter Product Discription" value="{{ $product[0]->Discription }}"class="form-control">
</div>
<div class="form-group">
<Label>Category</Label>
<select name="category" class="form-control" value="{{ $product[0]->Category_id}}">
    @foreach($categories as $value)
    <option value="{{$value['id']}}">{{$value['Category']}}</option>
    @endforeach 
</select>
</div>
<div class="form-group">
<Label>Price</Label>
<input type="text" name="price" placeholder="Enter Product Price" value="{{ $product[0]->Price }}" class="form-control">
</div>
<div class="form-group">
<Label>Upload Image</Label><br>
<input type="file" name="image" value="{{ $product[0]->Image_Url }}">
</div>
<div class="form-group">
<input type="submit" value="update" class="btn btn-info">
</div>
</form>
</div>
</div>

@endsection