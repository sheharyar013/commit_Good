import { BN, Program, Provider, utils, web3 } from "@project-serum/anchor";

import { Buffer } from "buffer";
import { PublicKey } from "@solana/web3.js";
import commitGoodIdl from "../../config/blockchain/commit_good.json";

window.Buffer = window.Buffer || Buffer;

const { SystemProgram } = web3;

const opts = {
  preflightCommitment: "processed",
};

export const sendDonation = async (
  connection,
  wallet,
  charityWalletString,
  price
) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment);
  const programID = new PublicKey(commitGoodIdl.metadata.address);
  const program = new Program(commitGoodIdl, programID, provider);
  // Token Address
  const mint = new web3.PublicKey(
    "EQSJM4caRE31xUoJPiYnq6SrqxaDnJMQX36v8jDpb9UY"
  );
  const platformWallet = new web3.PublicKey(
    process.env.NEXT_PUBLIC_PLATFORM_WALLET
  );
  const platformTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: platformWallet,
  });

  const charityWallet = new web3.PublicKey(charityWalletString);
  const charityTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: charityWallet,
  });
  const ownerTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: wallet.publicKey,
  });
  const tokens = await connection.getTokenAccountBalance(ownerTokenAddress);
  if (!tokens || tokens.value.uiAmount < price) {
    throw new Error("Not enough $GOOD tokens in your wallet");
  }
  const Rent_PROGRAM_ID = new web3.PublicKey(
    "SysvarRent111111111111111111111111111111111"
  );
  const Token_Program_ID = new web3.PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  );
  const Associated_Token_Program_ID = new web3.PublicKey(
    "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  );
  try {
    const tx = await program.rpc.sendDonation(new BN(price), {
      accounts: {
        mint,
        charityWallet: platformWallet,
        charityTokenAccount: platformTokenAddress,
        owner: wallet.publicKey,
        ownerTokenAccount: ownerTokenAddress,
        associatedTokenProgram: Associated_Token_Program_ID,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    });
    return {
      transactionId: tx.toString(),
      error: "",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
