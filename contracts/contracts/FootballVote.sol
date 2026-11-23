
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.28;

 contract FootballVote {
     uint256[3] private votos;
     mapping(address => bool) public yaVoto;

     event VotoRegistrado(address indexed votante, uint256 jugador);

     // Registrar un voto por uno de los tres jugadores
     function votar(uint256 jugador) public {
         require(jugador >= 1 && jugador <= 3, "Jugador invalido");
         require(!yaVoto[msg.sender], "Esta billetera ya voto");

         yaVoto[msg.sender] = true;
         votos[jugador - 1]++;

         emit VotoRegistrado(msg.sender, jugador);
     }

     // Comprobar si una billetera ya voto
     function haVotado(address billetera) public view returns (bool) {
         return yaVoto[billetera];
     }

     // Consultar los votos de un jugador
     function obtenerVotos(uint256 jugador) public view returns (uint256) {
         require(jugador >= 1 && jugador <= 3, "Jugador invalido");
         return votos[jugador - 1];
     }

     // Obtener el jugador con mas votos
     function obtenerGanador() public view returns (uint256) {
         uint256 ganador = 1;

         for (uint256 i = 2; i <= 3; i++) {
             if (votos[i - 1] > votos[ganador - 1]) {
                 ganador = i;
             }
         }

         return ganador;
     }
 }
