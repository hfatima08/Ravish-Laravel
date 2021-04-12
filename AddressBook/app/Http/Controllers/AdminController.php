<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use DB;
use PDF;
use App\clientdetails;
use Cart;
use App\product;
use App\Category;



class AdminController extends Controller
{
    public function adminhome()
    {
        return view('admin.dashboard');
    }

    // ------ USERS ------ //
    public function userdetails()
    {
        $user_data = User::all();
        return view('admin.userdetails',compact('user_data'));
    }

    public function createuser()
    {
        return view('admin.createuser');
    }

    public function usersubmit(Request $request)
    {
           $this->validate($request,[
           
                  'name'     => 'required',
                  'email'    => 'required',
                  'password' => 'required',
                  'password' => 'required',
                  'type'  => 'required'
           ]); 
 
           $data = new User;

           $data->name = $request->get('name');
           $data->email = $request->get('email');
           $data->password = Hash::make($request->get('password'));
           $data->is_admin = $request->get('type');
           $data->save();

           return redirect()->route('user.index')->with('added','User created');
          
    }

    public function show($id){
        $user = DB::select("select * from users where id = ?",[$id]);
         return view('admin.updateuser',['user'=> $user]);
 
     }
 
     public function edit(Request $request,$id){
         $name = $request->input('name');
         $email = $request->input('email');
         $password = $request->input('password');
         $role = $request->input('type');
         $data = DB::update("update users set name=?,email=?,password=?,is_admin=? where id = ?",[$name,$email,$password,$role,$id]);
         if($data != null){
             return redirect()->route('user.index')->with('success','Record updated');;
         }
         else{
            return redirect()->route('user.index')->with('fail','Record didnot update');;
         }
     }

    public function delete($id){
        $data = DB::delete("delete from users where id= ?",[$id]);
        if($data != null){
            return redirect()->route('user.index')->with('success','User deleted');
        }
       else{
        return redirect()->route('user.index')->with('fail','User not deleted');
       }
    }

// ------ ADMIN ------ //

    public function admindetails()
    {
        $user_data = User::all();
        return view('admin.adminprofile',compact('user_data'));
    }

    public function adshow($id){
        $user = DB::select("select * from users where id = ?",[$id]);
         return view('admin.updateAdmin',['user'=> $user]);
 
     }
 
     public function adedit(Request $request,$id){
         $name = $request->input('name');
         $email = $request->input('email');
         $password = $request->input('password');
         $data = DB::update("update users set name=?,email=?,password=? where id = ?",[$name,$email,$password,$id]);
         if($data != null){
             return redirect()->route('admin.profile')->with('success','Record updated');;
         }
         else{
            return redirect()->route('admin.profile')->with('fail','Record didnot update');;
         }
     }

     
     public function clientsdata()
     {
        $clients = clientdetails::all();
        return view('clients.index',compact('clients'));
     }

}
