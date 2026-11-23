
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("FootballVoteModule", (m) => {
  const footballVote = m.contract("FootballVote");

  return { footballVote };
});
