
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";

const { viem } = await network.create();

describe("FootballVote", function () {
  it("permite votar y registra correctamente el voto", async function () {
    const contrato = await viem.deployContract("FootballVote");

    await contrato.write.votar([1n]);

    assert.equal(await contrato.read.obtenerVotos([1n]), 1n);
  });

  it("impide votar dos veces con la misma billetera", async function () {
    const contrato = await viem.deployContract("FootballVote");

    await contrato.write.votar([1n]);

    await assert.rejects(
      contrato.write.votar([2n])
    );
  });

  it("rechaza jugadores que no existen", async function () {
    const contrato = await viem.deployContract("FootballVote");

    await assert.rejects(
      contrato.write.votar([4n])
    );
  });

  it("identifica al jugador con mas votos", async function () {
    const contrato = await viem.deployContract("FootballVote");
    const [wallet1, wallet2] = await viem.getWalletClients();

    await contrato.write.votar([2n], {
      account: wallet1.account,
    });

    await contrato.write.votar([2n], {
      account: wallet2.account,
    });

    assert.equal(await contrato.read.obtenerGanador(), 2n);
  });
});
