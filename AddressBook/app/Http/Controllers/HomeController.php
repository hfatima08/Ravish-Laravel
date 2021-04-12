<?php

namespace App\Http\Controllers;
use App\product;
use App\Category;
use Cart;
use Illuminate\Http\Request;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $cartCollection = Cart::getContent();
        return view('home.index',compact('cartCollection'));
    }

    
}
