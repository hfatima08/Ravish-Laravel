@extends('layouts.main')
@section('title')
Ravish - Search
@endsection

@section('content')

<body id="category">
	<!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Shop Category page</h1>
					<nav class="d-flex align-items-center">
						<a href="/">Home<span class="lnr lnr-arrow-right"></span></a>
						<a href="#">Shop<span class="lnr lnr-arrow-right"></span></a>
						<a href="category.html">Search-results</a>
					</nav>
				</div>
			</div>
		</div>
    </section>
    
    <!-- End Banner Area -->
	<div class="container">
		<div class="row">
		<div class="col-xl-1">
</div>

			<div class="col-xl-10 col-lg-12 col-md-12">
				<!-- Start Filter Bar -->
				<div class="filter-bar d-flex flex-wrap align-items-center">

				<div class="pagination" style="margin-left:600px">
						<a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
						<a href="#" class="active">1</a>
						<a href="#">2</a>
						<a href="#">3</a>
						<a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
						<a href="#">6</a>
						<a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
							</div>
				</div>
				<!-- End Filter Bar -->
				<br>
    <h6>{{$products->count()}} result(s) for "{{request()->input('query')}}"</h6>
    <section class="lattest-product-area pb-40 category-list">
				<div class="row">
                    @foreach ($products as $item)
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="single-product">
								<img class="img-fluid" src="{{$item->Image_Url}}" alt="">
								<div class="product-details">
									<h6>{{$item->Pr_Name}}</h6>
									<h5> {{$item->Discription}} </h5>
									<div class="price">
										<h6>Rs.{{$item->Price}}</h6>
									</div>
									<div class="prd-bottom">
										<a href="product/{{ $item->id}}" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
								
							</div>
							</div>
						
						@endforeach		
</div>
<div class="filter-bar d-flex flex-wrap align-items-center">

<div class="pagination" style="margin-left:600px">
		<a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
		<a href="#" class="active">1</a>
		<a href="#">2</a>
		<a href="#">3</a>
		<a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
		<a href="#">6</a>
		<a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
			</div>
</div>
<!-- End Filter Bar -->
</section>
</div>
<div class="col-xl-1">
</div>		

</div>
</div> 
<br><br>
@endsection