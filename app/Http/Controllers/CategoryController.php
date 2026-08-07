<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    public function index(Category $category)
    {
        $categories = auth('sanctum')->user()->role === 'admin'
            ? Category::all()
            : Category::select(['id', 'name'])->get();

        return CategoryResource::collection($categories);
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

        if ($category->tickets()->exists()) {
            throw new HttpResponseException(response()->json([
                'message' => 'Deze categorie kan niet worden verwijdered omdat er nog tickets aan gekoppeld zijn.'
            ], 422));
        }

        $category->delete();
        
        return response()->json(['message' => 'Categorie succesvol verwijderd']);
    }
}
