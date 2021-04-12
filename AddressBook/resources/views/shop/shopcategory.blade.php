@extends('layouts.main')
@section('title')
Ravish - Shop
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
						<a href="category.html">Category</a>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->
	<div class="container">
		<div class="row">
			<div class="col-xl-3 col-lg-4 col-md-5">
				<div class="sidebar-categories">
					<div class="head">Browse Categories</div>
					<ul class="main-categories">
					@foreach ($cat as $item)
					<?php 
                                $con = mysqli_connect("localhost","root","");
                                if($con){
                                    mysqli_select_db($con,"project_db");
                                  
                                }

                                 $q ="SELECT count(*) FROM `products` WHERE Category_id = {$item->id}";
                                  $exec = mysqli_query($con,$q);
                                     $count =mysqli_fetch_array($exec);
								?>
								
						<li class="main-nav-list">
							<a href="?id=<?php echo "{$item->id}" ?>">{{$item->Category}} <span style="float:right"><?php echo "[$count[0]]" ?></span> </a>						
						</li>
						@endforeach
					</ul>
				</div>
				
			</div>
			<div class="col-xl-9 col-lg-8 col-md-7">
			@if(count($errors)>0)
			<div class="alert alert-danger">
			@foreach($errors->all() as $error)
			<h4>{{$error}}</h4>
			@endforeach
			</div>
			@endif
			
@if(\Session::has('fail'))
<div class="alert alert-danger">
{{\Session::get('fail')}}
</div>
@endif
				<!-- Start Filter Bar -->
				<div class="filter-bar d-flex flex-wrap align-items-center">
				  <!-- SEARCH FORM-->
				  <form action="{{route('product.search')}}" method="GET" enctype="multipart/form-data">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" id="query" name="query" value="{{request()->input('query')}}" type="text" placeholder="Search" aria-label="Search">
		<div class="input-group-append"> 
		<div style="background: #ddd; font-size: 15px; border: none;cursor: pointer">
		  <i class="fa fa-search btn btn-sm" aria-hidden="true" style="color:orange"></i>
		</div>
		</div>
      </div>
    </form> 
				<div class="pagination" style="margin-left:300px">
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
				<!-- Start Best Seller -->
				<section class="lattest-product-area pb-40 category-list">
					<div class="row">

					<?php if(isset($_GET['id'])){

								$id = $_GET['id'];
								$q ="SELECT * FROM `products` WHERE Category_id = $id";
								$exec = mysqli_query($con,$q);
								?>
								
								<?php
								while(  $row =mysqli_fetch_array($exec)){
								?>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="single-product">
								<img class="img-fluid" src="<?php echo $row[5]; ?>"alt="">
								<div class="product-details">
									<h6><?php echo $row[1]; ?></h6>
									<h5><?php echo $row[2]; ?> </h5>
									<div class="price">
										<h6><?php echo $row[4]; ?></h6>
									</div>
									<div class="prd-bottom">
										<a href="{{$id}}" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
							</div>
								</div>
								
							<?php          }   ?>

						<!-- single product -->
						<?php  }else{ ?>
							
						
						@foreach ($d as $item)
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
										<a href="{{ $item->id}}" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
								
							</div>
							</div>	
						@endforeach		
						<?php } ?>		
					</div>
				</section>
				<!-- End Best Seller -->
				<!-- Start Filter Bar -->
				<div class="filter-bar d-flex flex-wrap align-items-center">
					<div class="pagination" style="margin-left:530px">
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
			</div>
		</div>
	</div>
</body>
<br><br>
@endsection