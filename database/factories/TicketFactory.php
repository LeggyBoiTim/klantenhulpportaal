<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assigned_id' => User::where('role', 'admin')->inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'user_id' => User::where('role', 'user')->inRandomOrder()->first()->id,
            'title' => fake()->text(50),
            'content' => fake()->paragraph(),
            'status' => fake()->randomElement(['open', 'in_progress', 'closed']),
        ];
    }
}
