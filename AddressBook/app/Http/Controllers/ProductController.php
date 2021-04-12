<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\product;
use App\Category;
use DB;
class ProductController extends Controller
{

    public function productdetails()
    {
       $products_data = product::all();
       $category_data = Category::all();

       return view('products.index',compact('products_data','category_data'));
    }


    public function addproduct()
    {
        $categories = Category::all();
        return view('products.create',compact('categories'));
    }

    public function saveproduct(Request $req)
    {
        $this->validate($req,[

              'productname'   => 'required',
              'discription'   => 'required',
              'category'      => 'required',
              'price'         => 'required',
              'image'         => 'required'
        ]);

        $n = $req->get('productname');
        $d = $req->get('discription');
        $c = $req->get('category');
        $p = $req->get('price');
        $i = $req->file('image');

        $products = new product;
        $i->move(base_path('public/product_images/'),$i->getClientOriginalName());
        $products->Pr_Name = $n;
        $products->Discription = $d;
        $products->Category_id = $c;
        $products->Price = $p;
        $products->Image_Url = '/product_images/'.$i->getClientOriginalName();
        $products->save();

        return redirect()->route('product.index')->with('success','Product Added');
    }

    public function show($id){
        $categories = Category::all();
        $product = DB::select("select * from products where id = ?",[$id]);
         return view('products.editproduct',['product'=> $product],compact('categories'));
 
     }
 
     public function edit(Request $request,$id){
         $proname = $request->input('productname');
         $discription= $request->input('discription');
         $category = $request->input('category');
         $price = $request->input('price');
         $i = $request->file('image');
         $i->move(base_path('product_images/'),$i->getClientOriginalName());
         $img = '/product_images/'.$i->getClientOriginalName();
         $data = DB::update("update products set Pr_Name=?,Discription=?,Category_id=?,Price=?,Image_Url=? where id = ?",[$proname,$discription,$category,$price,$img,$id]);
         if($data != null){
             return redirect()->route('product.index')->with('success','Product updated');;
         }
         else{
            return redirect()->route('product.index')->with('fail','Product didnot update');;
         }
     }

    public function delete($id){
        $data = DB::delete("delete from products where id= ?",[$id]);
        if($data != null){
            return redirect()->route('product.index')->with('success','Product deleted');
        }
       else{
        return redirect()->route('product.index')->with('fail','Product not deleted');
       }
    }

    
}
