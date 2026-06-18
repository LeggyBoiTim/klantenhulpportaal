<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->validated());

        $categories = Category::all();
        return CategoryResource::collection($categories);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        $categories = Category::all();
        return CategoryResource::collection($categories);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        
        return response()->json(['message' => 'Categorie succesvol verwijderd']);
    }
}
