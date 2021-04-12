<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\product;
use App\Category;
use Cart;
use App\clientdetails;

class CartController extends Controller
{
    public function addcart(Request $req,$id)
    {
        $this->validate($req,[
                
            'qty'  => 'required'
        ]);

    
        $q = $req->get('qty');
        $data = product::find($id);
        $data2 = Category::find($id);

        Cart::add(array(
            'id' => $id, // unique row ID
            'name' => $data->Pr_Name,
            'price' => $data->Price,
            'quantity'=> $q,
            'image' =>$data->Image_Url,
            'category' => $data2->Category
        ));
        
        return redirect()->route('cart.details');
    }

    public function cartdetails()
    {
        $cartCollection = Cart::getContent();
        return view('shop.cart',compact('cartCollection'));
    }

    public function remove($id){
        Cart::remove($id);
        return redirect()->route('cart.details');
   }

   public function checkout()
    {
        $cartCollection = Cart::getContent();
        return view('shop.checkout',compact('cartCollection'));
    }

    public function confirm()
    {
        $cartCollection = Cart::getContent();
        return view('shop.confirmation',compact('cartCollection'));
        //return redirect()->route('shop.confirm',compact('cartcollection'));
    }

    public function clientdetails(Request $req)
    {
        $this->validate($req,[

               'fullname'   => 'required',
               'email'      => 'required',
               'cellno'     => 'required',
               'phoneno'    => 'required',
               'dob'        => 'required',
               'category'   => 'required',
               'city'       => 'required',
               'address'    => 'required',
            
        ]);

        $fn = $req->get('fullname');
        $e = $req->get('email');
        $c = $req->get('cellno');
        $p = $req->get('phoneno');
        $dob = $req->get('dob');
        $cat = $req->get('category');
        $city = $req->get('city');
        $add = $req->get('address');
        $r = $req->get('remarks');

        $details = new clientdetails;
        $details->fullname = $fn;
        $details->email = $e;
        $details->cellno = $c;
        $details->phoneno = $p;
        $details->dob = $dob;
        $details->category = $cat;
        $details->address = $add;
        $details->city = $city;
        $details->remarks = $r;
        $details->save();

        return redirect()->route('order.confirm');
        
    }

}
