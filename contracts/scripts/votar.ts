
import { network } from "hardhat";

const { viem } = await network.connect();

const direccionContrato =
  "0x6B1B6C80aEc2335a6994d05A76820240dFd9e7f2";

const contrato = await viem.getContractAt(
  "FootballVote",
  direccionContrato
);

// Votamos por el jugador 1
const hash = await contrato.write.votar([1n]);

console.log("Voto enviado correctamente.");
console.log("Hash de la transaccion:", hash);
console.log("Ver en Snowtrace:");
console.log("https://testnet.snowtrace.io/tx/" + hash);
