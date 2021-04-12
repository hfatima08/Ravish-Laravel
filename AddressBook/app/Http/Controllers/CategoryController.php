<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\product;
use App\Category;
use DB;

class CategoryController extends Controller
{

    public function categorydetails()
    {
         $details = Category::all();
         return view('categories.index',compact('details'));
    }


    public function addcategory()
    {
        return view('categories.create');
    }

    public function savecategory(Request $req)
    {
        $this->validate($req,[

              'category'  => 'required'
        ]);

        $categories = new Category;
        $categories->Category = $req->get('category');
        $categories->save();

        return redirect()->route('categories.index')->with('success','Category Added');
    }

    public function show($id){
        $category = DB::select("select * from categories where id = ?",[$id]);
         return view('categories.editcategory',['category'=> $category]);
 
     }
 
     public function edit(Request $request,$id){
         $category = $request->input('category');
         $data = DB::update("update categories set Category=? where id = ?",[$category,$id]);
         if($data != null){
             return redirect()->route('categories.index')->with('success','Category updated');;
         }
         else{
            return redirect()->route('categories.index')->with('fail','Category didnot update');;
         }
     }
    
    public function delete($id){
        $data = DB::delete("delete from categories where id= ?",[$id]);
        if($data != null){
            return redirect()->route('categories.index')->with('success','Category deleted');
        }
       else{
        return redirect()->route('categories.index')->with('fail','Category not deleted');
       }
    }
}
