<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use App\Upload;

class UploadController extends Controller
{
  public function store(Request $req){
    $randName   = '_' . time() . '.' . $req->file->extension();;
    $destPath  = public_path('upload') . '/' . $randName . '.png' ;
    if ($req->hasFile('file') && $req->file('file')->isValid()) {
      $req->file('file')->storeAs('uploads', $randName);
    }

    DB::beginTransaction();
    try{
      $id = Upload::insert(array('filename'=>$randName, 'title' => 'Document'));
      DB::commit();
      return response()->json('1');
    }catch(\Exception $e){
      DB::rollback();
      return response()->json($e->getMessage());
    }
  }
}
