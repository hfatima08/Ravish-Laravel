@extends('layouts.main')
@section('title')
Ravish - Confirmation
@endsection

@section('content')
<!-- Start Banner Area -->
<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Confirmation</h1>
					<nav class="d-flex align-items-center">
						<a href="/">Home<span class="lnr lnr-arrow-right"></span></a>
						<a href="category.html">Confirmation</a>
					</nav>
				</div>
			</div>
		</div>
</section>
	<!-- End Banner Area -->

	<!--================Order Details Area =================-->
	
	<section class="order_details section_gap">
		<div class="container">
	
		<h3 class="title_confirmation">Thank you. Your order has been received.</h3>
			<div class="row order_d_inner">
            <div class="col-lg-2">
		
</div>

				<div class="col-lg-4">
					<div class="details_item">
						<h4>Order Info</h4>
						<ul class="list">
							<li><a href="#"><span>Order number</span> : <?php echo rand() ?></a></li>
							<li><a href="#"><span>Date</span> : <?php echo date("d/m/Y") ?></a></li>
							<li><a href="#"><span>Total</span> : Rs.{{Cart::getTotal() + 50}}</a></li>
							<li><a href="#"><span>Payment method</span> : On delivery</a></li>
						</ul>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="details_item">
						<h4>Billing Address</h4>
						<ul class="list">
						
							<li><a href="#"><span>Address</span>:56/B</a></li>
						
							<li><a href="#"><span>City</span> : Karachi</a></li>
							<li><a href="#"><span>Country</span> : Pakistan</a></li>
							<li><a href="#"><span>Postcode </span> : 74400</a></li>
						</ul>
                    </div>
                    <div class="col-lg-2">
</div>
				</div>
				
				</div>
			</div>
			<div class="order_details_table">
				<h2>Order Details</h2>
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Product</th>
								<th scope="col">Quantity</th>
								<th scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
                            @foreach($cartCollection as $values)
								<td>
									<p>{{$values['name']}}</p>
								</td>
								<td>
									<h5>x 0{{$values['quantity']}}</h5>
								</td>
								<td>
									<p>Rs.{{$values['quantity']*$values['price']}}</p>
								</td>
							</tr>
							@endforeach
							<tr>
								<td>
									<h4>Subtotal</h4>
								</td>
								<td>
									<h5></h5>
								</td>
								<td>
									<p>Rs.{{Cart::getTotal()}}</p>
								</td>
							</tr>
							<tr>
								<td>
									<h4>Shipping</h4>
								</td>
								<td>
									<h5></h5>
								</td>
								<td>
									<p>Flat rate: Rs.50.00</p>
								</td>
							</tr>
							<tr>
								<td>
									<h4>Total</h4>
								</td>
								<td>
									<h5></h5>
								</td>
								<td>
									<p>Rs.{{Cart::getTotal() + 50}}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
	<!--================End Order Details Area =================-->
@endsection