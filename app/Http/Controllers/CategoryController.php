<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    public function index(Category $category)
    {
        Gate::authorize('viewAny', $category);

        return CategoryResource::collection(Category::all());
    }

    public function show(Category $category)
    {
        Gate::authorize('view', $category);

        return new CategoryResource($category);
    }

    public function store(CategoryRequest $request, Category $category)
    {
        Gate::authorize('create', $category);

        $data = $request->validated();

        $category = Category::create($data);

        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        Gate::authorize('update', $category);

        $category->update($request->validated());

        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        Gate::authorize('delete', $category);

        $category->delete();
        
        return response()->json(['message' => 'Categorie succesvol verwijderd']);
    }
}
