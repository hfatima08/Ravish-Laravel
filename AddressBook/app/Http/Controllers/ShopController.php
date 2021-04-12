<?php

namespace App\Http\Controllers;
use App\product;
use App\Category;
use Illuminate\Http\Request;
use DB;
class ShopController extends Controller
{

    public function index()
    {
        $data = product::all();
        $c = category::all();
   
        return view('shop.shopcategory',['d' =>$data,'cat'=>$c]);
    }   

    public function show($id){
        
        $categories = Category::all();
        $products = DB::select("select * from products where id = ?",[$id]);
        return view('shop.productdetails',compact('products','categories'));
     }

    //  public function search($val){
    //     $data = DB::table('products')->where('Pr_Name','like','%'.$val.'%')->get();
       
    // }

    public function search(Request $request){
        $request->validate([
            'query' => 'required',
        ]);
        $query = $request->input('query');
        $products=DB::table('products')->where('Pr_Name', 'like','%'.$query.'%')->get();
        if($products->count()>0){
        return view('shop.search')->with('products',$products);}
        else{
        return redirect()->route('shop.category')->with('fail','Product Not Found');
        }
    }

    public function contact(){
        return view('home.contact');
    }
}
