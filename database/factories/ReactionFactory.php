<?php

namespace Database\Factories;

use App\Models\Reaction;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reaction>
 */
class ReactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ticket_id' => Ticket::inRandomOrder()->first()->id,
            'user_id' => User::where('role', 'admin')->inRandomOrder()->first()->id,
            'content' => $this->faker->sentence(),
        ];
    }
}
