<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Support\Facades\Gate;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = auth('sanctum')->user()->role === 'admin'
            ? Ticket::all()
            : Ticket::where('user_id', auth('sanctum')->user()->id)->get();

        return TicketResource::collection($tickets);
    }

    public function store(TicketRequest $request)
    {
        Ticket::create($request->validated());

        $tickets = auth('sanctum')->user()->role === 'admin'
            ? Ticket::all()
            : Ticket::where('user_id', auth('sanctum')->user()->id)->get();
            
        return TicketResource::collection($tickets);
    }

    public function update(TicketRequest $request, Ticket $ticket)
    {
        Gate::authorize('update', $ticket);

        $ticket->update($request->validated());

        $tickets = auth('sanctum')->user()->role === 'admin'
            ? Ticket::all()
            : Ticket::where('user_id', auth('sanctum')->user()->id)->get();
            
        return TicketResource::collection($tickets);
    }

    public function destroy(Ticket $ticket)
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();
        
        return response()->json(['message' => 'Ticket succesvol verwijderd']);
    }
}
