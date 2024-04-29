#!/bin/bash

backend_commands=(
    "cd server && npm start"
)

frontend_commands=(
	"cd client && npm run dev"
)

# backend
for cmd in "${backend_commands[@]}"; do
    gnome-terminal -- bash -c "$cmd; exec bash"
done

# frontend
for cmd in "${frontend_commands[@]}"; do
    gnome-terminal -- bash -c "$cmd; exec bash"
done


