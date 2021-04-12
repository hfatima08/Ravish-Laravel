<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','layoutcontroller@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/contact', 'ShopController@contact')->name('contact');

// --------------------Admin Routes---------------------//

Route::get('admin/dashboard','AdminController@adminhome')->name('admin.home')->middleware('is_admin');
Route::get('user/details','AdminController@userdetails')->name('user.index')->middleware('is_admin');
Route::get('create/user','AdminController@createuser')->name('user.create')->middleware('is_admin');
Route::post('submit/user','AdminController@usersubmit')->name('user.submit')->middleware('is_admin');
Route::get('/user/delete/{id}','Admincontroller@delete')->middleware('is_admin');
Route::get('/user/edit/{id}','Admincontroller@show')->middleware('is_admin');
Route::post('/user/edit/{id}','Admincontroller@edit')->middleware('is_admin');

Route::get('admin/profile','AdminController@admindetails')->name('admin.profile')->middleware('is_admin');
Route::get('/admin/edit/{id}','Admincontroller@adshow')->middleware('is_admin');
Route::post('/admin/edit/{id}','Admincontroller@adedit')->middleware('is_admin');
Route::get('client/details','AdminController@clientsdata')->name('client.data')->middleware('is_admin');




// --------------------User Routes---------------------//

Route::get('user/dashboard','UserController@userhome')->name('user.home');
Route::get('/shopbycategory', 'ShopController@index')->name('shop.category');
Route::get('{id}','Shopcontroller@show');
Route::get('search/results','ShopController@search')->name('product.search');


// --------------------Product Routes---------------------//

Route::get('add/product','ProductController@addproduct')->name('add.product')->middleware('is_admin');
Route::post('submit/product','ProductController@saveproduct')->name('submit.product')->middleware('is_admin');
Route::get('product/details','ProductController@productdetails')->name('product.index')->middleware('is_admin');
Route::get('/product/delete/{id}','Productcontroller@delete')->middleware('is_admin');
Route::get('/product/edit/{id}','Productcontroller@show')->middleware('is_admin');
Route::post('/product/edit/{id}','Productcontroller@edit')->middleware('is_admin');

// --------------------Category Routes---------------------//

Route::get('add/category','CategoryController@addcategory')->name('add.category')->middleware('is_admin');
Route::post('submit/category','CategoryController@savecategory')->name('save.category')->middleware('is_admin');
Route::get('categories/details','CategoryController@categorydetails')->name('categories.index')->middleware('is_admin');
Route::get('/category/delete/{id}','Categorycontroller@delete')->middleware('is_admin');
Route::get('/category/edit/{id}','Categorycontroller@show')->middleware('is_admin');
Route::post('/category/edit/{id}','Categorycontroller@edit')->middleware('is_admin');


// --------------------Cart Routes---------------------//

Route::post('/product/addtocart/{id}','CartController@addcart')->name('add.cart');
Route::get('cart/details','CartController@cartdetails')->name('cart.details');
Route::get('/remove/{id}','CartController@remove');
Route::get('cart/checkout','CartController@checkout')->name('cart.checkout');
Route::get('order/confirm','CartController@confirm')->name('order.confirm');
Route::post('order/confirm','CartController@clientdetails')->name('client.details');


// --------------------PDF Routes---------------------//

Route::get('download/PDF','PDFController@downloadPDF')->name('download.pdf')->middleware('is_admin');
Route::get('/download/PDF/{id}','PDFController@downloadByID')->middleware('is_admin');
Route::get('product/PDF','PDFController@productPDF')->name('product.pdf')->middleware('is_admin');
Route::get('/product/PDF/{id}','PDFController@downloadByID')->middleware('is_admin');



