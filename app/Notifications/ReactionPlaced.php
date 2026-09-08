<?php

namespace App\Notifications;

use App\Models\Reaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReactionPlaced extends Notification
{
    use Queueable;

    protected Reaction $reaction;

    /**
     * Create a new notification instance.
     */
    public function __construct(Reaction $reaction)
    {
        $this->reaction = $reaction;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $userName = $this->reaction->ticket->user->name;
        $url = url('/tickets/' . $this->reaction->ticket_id);

        return (new MailMessage)
            ->subject('New reaction on your ticket')
            ->greeting('Dear ' . $userName . ',')
            ->line('An admin has placed a new reaction on your ticket. Use the link below to go to the ticket.')
            ->action('Go to ticket', $url)
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
