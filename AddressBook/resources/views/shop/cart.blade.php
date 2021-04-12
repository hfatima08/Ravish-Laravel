@extends('layouts.main')
@section('title')
Ravish - Cart
@endsection

@section('content')
  <!-- Start Banner Area -->
  <section class="banner-area organic-breadcrumb">
        <div class="container">
            <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                <div class="col-first">
                    <h1>Shopping Cart</h1>
                    <nav class="d-flex align-items-center">
                        <a href="/">Home<span class="lnr lnr-arrow-right"></span></a>
                        <a href="category.html">Cart</a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- End Banner Area -->

    <!--================Cart Area =================-->
    <section class="cart_area">
        <div class="container">
            <div class="cart_inner">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            @foreach($cartCollection as $values)
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="{{$values['image']}}" alt="image not found" width="100" height="100">
                                        </div>
                                        <div class="media-body">
                                            <p>{{$values['name']}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>Rs.{{$values['price']}}</h5>
                                </td>
                                <td>
                                <h5 style="margin-left:25px">{{$values['quantity']}}</h5>
                                </td>
                                <td>
                                    <h5>Rs.{{$values['quantity']* $values['price']}}
                                </h5> </td>    
                                <td>
                                <a href="/remove/{{$values['id']}}" style="color:red;margin-right:100px">  <i class="fa fa-times" aria-hidden="true"></i></a>
                            </td>
                                </tr>
                            @endforeach
                            <tr class="bottom_button">
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
</td>
                                <td>
</td>
                                
                                <td>
                                </td>
                            </tr>
                       
                            <tr>
                                <td>

                                </td>
                                <td>
</td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                    <h5>Rs.{{Cart::getTotal()}}</h5>
                         </td>
                               
<td>
</td>
                                
                                
                            </tr>
        
                            <tr class="out_button_area">
                                
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>

</td>
                                
                                <td>
                                    <div class="checkout_btn_inner d-flex align-items-center">
                                    <a href="/shopbycategory" class="gray_btn" >Continue Shopping</a>
                                    <a href="{{route('cart.checkout')}}" class="primary-btn" >Proceed To Checkout</a>
                                    </div>
                                </td>
                                <td>
</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!--================End Cart Area =================-->
@endsection