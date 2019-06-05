<?php

namespace App\Http\Controllers;

use App\Document;
use App\Upload;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
      public function view($id)
      {
        $document = Upload::find($id);

        return $document->toJson();
      }

      public function index(){
        $documents = Upload::orderBy('created_at', 'desc')->get();

        return $documents->toJson();
      }
}
