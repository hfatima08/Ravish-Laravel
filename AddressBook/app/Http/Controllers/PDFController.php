<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\clientdetails;
use App\product;
use App\Category;

class PDFController extends Controller
{
    public function downloadPDF() 
    {
        $show = clientdetails::all();
        $pdf = PDF::loadView('pdffile.pdf', compact('show'));
        
        return $pdf->download('file.pdf');
    }

    public function productPDF() 
    {
        $print = product::all();
        $category_data = Category::all();
        $pdf = PDF::loadView('pdffile.productspdf', compact('print','category_data'));
        
        return $pdf->download('Pfile.pdf');
    }
}
