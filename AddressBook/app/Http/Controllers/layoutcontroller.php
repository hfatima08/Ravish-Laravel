<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class layoutcontroller extends Controller
{
    public function index(){
        return view('home.index');
    }
}
