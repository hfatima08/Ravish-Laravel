@extends('layouts.main')
@section('title')
Ravish - Checkout
@endsection

@section('content')

  <!-- Start Banner Area -->
  <section class="banner-area organic-breadcrumb">
        <div class="container">
            <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                <div class="col-first">
                    <h1>Checkout</h1>
                    <nav class="d-flex align-items-center">
                        <a href="/">Home<span class="lnr lnr-arrow-right"></span></a>
                        <a href="single-product.html">Checkout</a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- End Banner Area -->

    <div class="billing_details container" style="margin-top:20px">
    @if(count($errors)>0)
    <div class="alert alert-danger">
    @foreach($errors->all() as $error)
    <h4>{{$error}}</h4>
    @endforeach
    </div>
    @endif
                <div class="row">
                    <div class="col-lg-8">
                        <h3>Billing Details</h3>
                        <form class="row contact_form" action="{{route('client.details')}}" method="post" novalidate="novalidate">
                        @csrf 
                            <div class="col-md-6 form-group p_star">
                               <input type="text" class="form-control" id="first" name="fullname" placeholder="Full Name">
                              
                            </div>
                            <div class="col-md-6 form-group p_star">
                               <input type="text" class="form-control" id="email" name="email" placeholder="Email Address">
                              
                            </div>
                            <div class="col-md-6 form-group p_star">
                               <input type="text" class="form-control" id="cell" name="cellno" placeholder="Mobile No#">
                              
                            </div>
                            <div class="col-md-6 form-group p_star">
                               <input type="text" class="form-control" id="number" name="phoneno" placeholder="Work Phone No#">
                              
                            </div>
                            <div class="col-md-6 form-group p_star">
                               <input type="date" class="form-control" id="dob" name="dob" placeholder="Date Of Birth">
                              
                            </div>
                            @foreach($cartCollection as $cat)
                            <div class="col-md-6 form-group p_star">
                               <input type="text" class="form-control" id="category" name="category" value="{{$cat['category']}}">
<!--                                
                               <select class="country_select" name="category">
                                    <option value="">Category</option>
                                    <option value="{{$cat['id']}}">{{$cat['category']}}</option>
                                </select> -->
                            </div>
                            @endforeach
                            <div class="col-md-12 form-group p_star">
                            
                                <select class="country_select" name="city">
                                    <option value="1">Karachi</option>
                                    <option value="2">Lahore</option>
                                    <option value="3">Islamabad</option>
                                    <option value="4">Quetta</option>
                                    <option value="5">Peshawer</option>
                                </select>
                            </div>
                            <div class="col-md-12 form-group p_star">
                                <textarea class="form-control" name="address" id="address" rows="1" placeholder="Address"></textarea>
                            </div>
                            <div class="col-md-12 form-group">
                            <textarea class="form-control" name="remarks" id="message" rows="1" placeholder="Other Remarks"></textarea>
                            </div>
                            <div class="col-md-12 form-group">
                                <div class="creat_account">
                                    <h3>Shipping Details</h3>
                                    <p> Your order will be shipped in three working days  <br>                                 
                                     You have to pay cash on delivery</p>
                                     </div>
</div>

                    </div>
                    <div class="col-lg-4">
                        <div class="order_box">
                            <h2>Your Order</h2>
                            <ul class="list">
                                <li><a href="#">Product <span>Total</span></a></li>
                                @foreach($cartCollection as $values)
                                <li><a href="#">{{$values['name']}} <span class="middle">x 0{{$values['quantity']}}</span> <span class="last">Rs.{{$values['quantity']*$values['price']}}</span></a></li>
                                @endforeach
                            </ul>
                            
                            <ul class="list list_2">
                                <li><a href="#">Subtotal <span>Rs.{{Cart::getTotal()}}</span></a></li>
                                <li><a href="#">Shipping <span>Flat rate: Rs.50.00</span></a></li>
                                <li><a href="#">Total <span>Rs.{{Cart::getTotal() + 50}}</span></a></li>
                            </ul>
                           
                            <input type="submit" value="Done" class="primary-btn btn-lg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</form>

    <!--================End Checkout Area =================-->

@endsection