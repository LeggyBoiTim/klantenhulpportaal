<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;

class TicketController extends Controller
{
    public function index()
    {
        return TicketResource::collection(Ticket::all());
    }

    public function store(TicketRequest $request)
    {
        $ticket = Ticket::create($request->validated());

        $tickets = Ticket::all();
        return TicketResource::collection($tickets);
    }

    public function update(TicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        $tickets = Ticket::all();
        return TicketResource::collection($tickets);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        
        return response()->json(['message' => 'Ticket succesvol verwijderd']);
    }
}
