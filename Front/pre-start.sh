#!/bin/bash

# Obtener la dirección IP actual
ip=$(hostname -I | awk '{print $1}')

# Escribir la dirección IP en .env.local
echo "MY_IP=$ip" > .env.local

echo "Dirección IP detectada: $ip"
echo "Variable de entorno MY_IP guardada en .env.local"

