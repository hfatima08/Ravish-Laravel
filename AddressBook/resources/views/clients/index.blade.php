@extends('layouts.adminlayout')

@section('title')
Admin | Client Details
@endsection

@section('content')
<br><br>

<a href="{{route('download.pdf')}}" class="btn btn-primary btn-lg" style="float:right;margin-bottom:10px;font-size:17px"><i class="fa fa-download" aria-hidden="true"></i>
Download PDF</a>

<div class="container">
<table class="table table-hover table-bordered table-striped" style="text-align:center">

<tr>
<th>ID</th>
<th>Full Name</th>
<th>Email Address</th>
<th>Mobile No#</th>
<th>Work Phone No#</th>
<th>Date Of Birth</th>
<th>Category</th>
<th>Address</th>
<th>City</th>
<th>Remarks</th>
</tr>

@foreach($clients as $show)
<tr>
<td>{{$show['id']}}</td>
<td>{{$show['fullname']}}</td>
<td>{{$show['email']}}</td>
<td>{{$show['cellno']}}</td>
<td>{{$show['phoneno']}}</td>
<td>{{$show['dob']}}</td>
<td>{{$show['category']}}</td>
<td>{{$show['address']}}</td>
<td>{{$show['city']}}</td>
<td>{{$show['remarks']}}</td>
</tr>
@endforeach

</table>
</div>

@endsection