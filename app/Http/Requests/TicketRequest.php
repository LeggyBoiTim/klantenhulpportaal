<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;

class TicketRequest extends BaseFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1000'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'status' => ['required', 'string', Rule::in(['open', 'in_progress', 'closed'])],
            'assigned_id' => ['sometimes', 'nullable', 'integer',
                Rule::exists('users', 'id')->where(function (Builder $query) {
                    $query->where('role', 'admin');
                })
            ],
        ];
    }
}
