@extends('layouts.adminlayout')

@section('title')
Admin | Add Product
@endsection
@section('content')

<div class="container col-md-12">
<div class="col-lg-6">
<form action="{{route('submit.product')}}" method="post" enctype="multipart/form-data">
@csrf
<div class="form-group">
<Label>Product Name</Label>
<input type="text" name="productname" placeholder="Enter Product Name" class="form-control">
</div>
<div class="form-group">
<Label>Discription</Label>
<input type="text" name="discription" placeholder="Enter Product Discription" class="form-control">
</div>
<div class="form-group">
<Label>Category</Label>
<select name="category" class="form-control">
    <option value="">Select Category</option>
    @foreach($categories as $value)
    <option value="{{$value['id']}}">{{$value['Category']}}</option>
    @endforeach
</select>
</div>
<div class="form-group">
<Label>Price</Label>
<input type="text" name="price" placeholder="Enter Product Price" class="form-control">
</div>
<div class="form-group">
<Label>Upload Image</Label><br>
<input type="file" name="image">
</div>
<div class="form-group">
<input type="submit" value="Add Product" class="btn btn-info">
</div>
</form>
</div>
</div>

@endsection