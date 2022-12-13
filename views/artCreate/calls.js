import { BN, Program, Provider, utils, web3 } from '@project-serum/anchor'
import {
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  getAccount,
} from '@solana/spl-token'

import { Buffer } from 'buffer'
import { Connection, PublicKey } from '@solana/web3.js'
import commitGoodIdl from '../../config/blockchain/commit_good.json'
import { toast } from 'react-toastify'

window.Buffer = window.Buffer || Buffer

const { SystemProgram } = web3

const opts = {
  preflightCommitment: 'processed',
}
export const mintNFT = async (
  connection,
  wallet,
  metadata,
  nftUri,
  progress,
) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)

  const testNftTitle = metadata.name
  const testNftSymbol =
    metadata?.attributes?.find((item) => item.trait_type === 'project_id')
      ?.value ?? '1'
  const price = metadata.price

  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  )

  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )

  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )

  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )

  const lamports = await program.provider.connection.getMinimumBalanceForRentExemption(
    MINT_SIZE,
  )

  const mintKeypair = web3.Keypair.generate()
  const tokenAddress = await utils.token.associatedAddress({
    mint: mintKeypair.publicKey,
    owner: wallet.publicKey,
  })

  const metadataAddress = (
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0]

  const masterEditionAddress = (
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
        Buffer.from('edition'),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0]

  const charityWallet = new web3.PublicKey(
    'A4zhLpaXzJFTX3kJkaoXJdCj5B2UUCdohuhEw8S8FyZi',
  )
  const charityCoordinatorWallet = new web3.PublicKey(
    'A4zhLpaXzJFTX3kJkaoXJdCj5B2UUCdohuhEw8S8FyZi',
  )

  const [
    _charityAccount,
    Charity_bump_state,
  ] = await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('state')), charityWallet.toBytes()],
    programID,
  )

  const [_nftInfo, nft_bump_state] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('state')),
      mintKeypair.publicKey.toBytes(),
    ],
    programID,
  )

  const [_tokenPda, token_bump_state] = await web3.PublicKey.findProgramAddress(
    [
      //wallet.publicKey.toBytes(),
      mintKeypair.publicKey.toBytes(),
    ],
    programID,
  )

  const ownerTokenAddress = await utils.token.associatedAddress({
    mint: mintKeypair.publicKey,
    owner: wallet.publicKey,
  })
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // const data = {
  //   jsonrpc: "2.0",
  //   id: 1,
  //   method: "qn_fetchNFTs",
  //   params: {
  //     wallet: "ESUgSSXJMZookr3UJMtdTGN9QRuTNsZK5tvhwoRnorTc",
  //     page: 1,
  //     perPage: 10,
  //   },
  // };
  // axios
  //   .post(
  //     "https://virulent-smart-sound.solana-devnet.quiknode.pro/a13a4195961bbabcee8365c2ced9d83fcdb36374/",
  //     data,
  //     config
  //   )
  //   .then(function (response) {
  //     // handle success
  //     console.log("quicknode response:", response.data);
  //   })
  //   .catch((err) => {
  //     // handle error
  //     console.log("quicknode error:", err);
  //   });

  // const [challengePubkey, challengeBump] =
  //   await web3.PublicKey.findProgramAddress(
  //     [
  //       Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE5")),
  //       wallet.publicKey.toBytes(),
  //     ],
  //     programID
  //   );
  // console.log(challengePubkey.toString());

  // const challengelevelFeeBN = new BN(levelFeeConvert);

  const mint_tx = new web3.Transaction().add(
    web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      programId: Token_Program_ID,
      lamports,
    }),
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      0,
      wallet.publicKey,
      wallet.publicKey,
    ),
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      tokenAddress,
      wallet.publicKey,
      mintKeypair.publicKey,
    ),
    program.transaction.mintNft(
      mintKeypair.publicKey,
      testNftTitle,
      testNftSymbol,
      nftUri,
      {
        accounts: {
          mintAuthority: wallet.publicKey,
          mint: mintKeypair.publicKey,
          tokenAccount: tokenAddress,
          tokenProgram: Token_Program_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          payer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          rent: Rent_PROGRAM_ID,
        },
      },
    ),
    program.transaction.newlist(Charity_bump_state, new BN(price), {
      accounts: {
        charityAccount: _charityAccount,
        nftInfo: _nftInfo,
        tokenpda: _tokenPda,
        mint: mintKeypair.publicKey,
        charityWallet: charityWallet,
        charityCoordinator: charityCoordinatorWallet,
        owner: wallet.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID, //new account added
        metadata: metadataAddress, //new account added
        depositTokenAccount: ownerTokenAddress,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    }),
  )
  let blockhashObj = await connection.getLatestBlockhash()

  mint_tx.recentBlockhash = blockhashObj.blockhash
  mint_tx.feePayer = wallet.publicKey

  const message = mint_tx.compileMessage()

  const fee = (await connection.getFeeForMessage(message, 'confirmed')).value

  try {
    const signature = await wallet.sendTransaction(mint_tx, connection, {
      signers: [mintKeypair],
    })
    await connection.confirmTransaction(signature, 'confirmed')
    progress(3)
    return {
      transactionId: signature,
      error: '',
      mintId: mintKeypair.publicKey.toString(),
    }
  } catch (error) {
    console.error('error')
    throw new Error(error.message)
  }
}

export const sellNFT = async (
  connection,
  wallet,
  mintId,
  price,
  _charityWalletString,
  _charityCoordinatorWalletString,
) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)

  const mint = new web3.PublicKey(mintId)
  const charityWallet = new web3.PublicKey(
    'A4zhLpaXzJFTX3kJkaoXJdCj5B2UUCdohuhEw8S8FyZi',
  )
  const charityCoordinatorWallet = new web3.PublicKey(
    'A4zhLpaXzJFTX3kJkaoXJdCj5B2UUCdohuhEw8S8FyZi',
  )

  const [
    _charityAccount,
    Charity_bump_state,
  ] = await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('state')), charityWallet.toBytes()],
    programID,
  )
  const [_nftInfo] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('state')),
      mint.toBytes(),
      // wallet.publicKey.toBytes(),
    ],
    programID,
  )
  const [_tokenPda] = await web3.PublicKey.findProgramAddress(
    [
      //wallet.publicKey.toBytes(),
      mint.toBytes(),
    ],
    programID,
  )
  const ownerTokenAddress = await utils.token.associatedAddress({
    mint: mint,
    owner: wallet.publicKey,
  })
  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  )
  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )
  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )
  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )
  const metadataAddress = //new lines
  (
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0] //till here
  console.log({
    accounts: {
      charityAccount: _charityAccount.toString(),
      nftInfo: _nftInfo.toString(),
      tokenpda: _tokenPda.toString(),
      mint: mint.toString(),
      charityWallet: charityWallet.toString(),
      charityCoordinator: charityCoordinatorWallet.toString(),
      owner: wallet.publicKey.toString(),
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID, //new account added
      metadata: metadataAddress, //new account added
      depositTokenAccount: ownerTokenAddress.toString(),
      systemProgram: SystemProgram.programId.toString(),
      rent: Rent_PROGRAM_ID.toString(),
      tokenProgram: Token_Program_ID.toString(),
    },
  })
  try {
    const tx = await program.rpc.newlist(Charity_bump_state, new BN(price), {
      accounts: {
        charityAccount: _charityAccount,
        nftInfo: _nftInfo,
        tokenpda: _tokenPda,
        mint: mint,
        charityWallet: charityWallet,
        charityCoordinator: charityCoordinatorWallet,
        owner: wallet.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID, //new account added
        metadata: metadataAddress, //new account added
        depositTokenAccount: ownerTokenAddress,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    })
    return {
      transactionId: tx.toString(),
      error: '',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const receiveNFT = async (connection, wallet, mintId, price = 5) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)
  const mint = new web3.PublicKey(mintId)
  const charityWallet = new web3.PublicKey(
    'A4zhLpaXzJFTX3kJkaoXJdCj5B2UUCdohuhEw8S8FyZi',
  )
  const charityCoordinatorWallet = new web3.PublicKey(
    'A4zhLpaXzJFTX3kJkaoXJdCj5B2UUCdohuhEw8S8FyZi',
  )
  const [
    _charityAccount,
    Charity_bump_state,
  ] = await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('state')), charityWallet.toBytes()],
    programID,
  )
  const [_nftInfo] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('state')),
      mint.toBytes(),
      // wallet.publicKey.toBytes(),
    ],
    programID,
  )
  const [_tokenPda] = await web3.PublicKey.findProgramAddress(
    [
      //wallet.publicKey.toBytes(),
      mint.toBytes(),
    ],
    programID,
  )
  const ownerTokenAddress = await utils.token.associatedAddress({
    mint: mint,
    owner: wallet.publicKey,
  })
  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  )

  const metadataAddress = //new line added
  (
    await web3.PublicKey.findProgramAddress(
      //
      [
        //
        Buffer.from('metadata'), //
        TOKEN_METADATA_PROGRAM_ID.toBuffer(), //
        mint.toBuffer(), //
      ], //
      TOKEN_METADATA_PROGRAM_ID, //
    )
  )[0] // //
  console.log('metadata', metadataAddress.toString())
  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )
  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )
  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )
  try {
    const tx = await program.rpc.getnft(Charity_bump_state, new BN(price), {
      accounts: {
        charityAccount: _charityAccount,
        nftInfo: _nftInfo,
        tokenpda: _tokenPda,
        mint: mint,
        charityWallet: charityWallet,
        owner: wallet.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID, // new account added
        metadata: metadataAddress, // new account added
        depositTokenAccount: ownerTokenAddress,
        associatedTokenProgram: Associated_Token_Program_ID,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    })
    toast.success('NFT has been added to your wallet', {
      toastId: 'nft',
    })
    return {
      transactionId: tx.toString(),
      error: '',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createEscrow = async (connection, wallet) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)

  const mint = new web3.PublicKey(
    'EQSJM4caRE31xUoJPiYnq6SrqxaDnJMQX36v8jDpb9UY',
  )

  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )

  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )

  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )

  const [volunteer] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('volunteer')),
      wallet.publicKey.toBytes(),
    ],
    programID,
  )

  const [volunteerEscrow] = await web3.PublicKey.findProgramAddress(
    [wallet.publicKey.toBytes()],
    programID,
  )

  try {
    const tx = await program.rpc.registerVolunteer({
      accounts: {
        mint: mint,
        volunteer: volunteer,
        volunteerEscrowToken: volunteerEscrow,
        owner: wallet.publicKey,
        associatedTokenProgram: Associated_Token_Program_ID,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    })

    return {
      transactionId: tx.toString(),
      error: '',
    }
  } catch (error) {
    throw new Error(
      `${error.message}, account might already be initialized with address: ${volunteer}`,
    )
  }
}

export const checkEscrow = async (connection, wallet) => {
  console.log('inside check')
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)

  const [volunteer] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('volunteer')),
      wallet.publicKey.toBytes(),
    ],
    programID,
  )

  const [volunteerEscrow] = await web3.PublicKey.findProgramAddress(
    [wallet.publicKey.toBytes()],
    programID,
  )

  try {
    const checkEscrowAcc = await connection.getBalance(volunteer)
    const checkEscrowToken = await connection.getBalance(volunteerEscrow)
    const EscrowTokenAccount = await getAccount(connection, volunteerEscrow)
    const EscrowTokenBalance = Number(EscrowTokenAccount.amount) * 0.000000001

    console.log(`escrow check: ${checkEscrowAcc} & ${checkEscrowToken} `)

    if (checkEscrowAcc > 0 && checkEscrowToken > 0)
      return { status: true, balance: EscrowTokenBalance }

    return { status: false, balance: EscrowTokenBalance }
  } catch (error) {
    throw new Error(
      `${error.message}, account might already be initialized with address: ${volunteer}`,
    )
  }
}

export const sendVolunteersToken = async (
  connection,
  wallet,
  volunteerAddress,
  amount,
) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)

  const mint = new web3.PublicKey(
    'EQSJM4caRE31xUoJPiYnq6SrqxaDnJMQX36v8jDpb9UY',
  )

  const volunteer = new web3.PublicKey(volunteerAddress)

  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )

  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )

  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )

  const [
    volunteerEscrow,
    volunteerBump,
  ] = await web3.PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode('volunteer')), volunteer.toBytes()],
    programID,
  )

  const [
    volunteerToken,
    volunteerEscrowBump,
  ] = await web3.PublicKey.findProgramAddress([volunteer.toBytes()], programID)

  const tokenAddress = await utils.token.associatedAddress({
    mint: mint,
    owner: wallet.publicKey,
  })

  try {
    const tx = await program.rpc.sendtokenvolunteer(
      volunteerBump,
      volunteerEscrowBump,
      new BN(amount),
      {
        accounts: {
          volunteerEscrowToken: volunteerToken,
          volunteerEscrow: volunteerEscrow,
          mint: mint,
          volunteerWallet: volunteer,
          owner: wallet.publicKey,
          depositTokenAccount: tokenAddress,
          associatedTokenProgram: Associated_Token_Program_ID,
          systemProgram: SystemProgram.programId,
          rent: Rent_PROGRAM_ID,
          tokenProgram: Token_Program_ID,
        },
      },
    )

    return {
      transactionId: tx.toString(),
      error: '',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const withdrawEscrowTokens = async (connection, wallet, amount) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)

  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)
  const mint = new web3.PublicKey(
    'EQSJM4caRE31xUoJPiYnq6SrqxaDnJMQX36v8jDpb9UY',
  )
  // const volunteer = new web3.PublicKey(volunteerAddress);
  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  )
  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )
  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )
  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )
  const [
    volunteerEscrow,
    volunteerBump,
  ] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('volunteer')),
      wallet.publicKey.toBytes(),
    ],
    programID,
  )
  const [
    volunteerToken,
    volunteerEscrowBump,
  ] = await web3.PublicKey.findProgramAddress(
    [wallet.publicKey.toBytes()],
    programID,
  )
  const tokenAddress = await utils.token.associatedAddress({
    mint: mint,
    owner: wallet.publicKey,
  })

  const EscrowTokenAccount = await getAccount(connection, volunteerToken)
  const EscrowTokenBalance = EscrowTokenAccount.amount

  try {
    const tx = await program.rpc.withdrawescrow(
      volunteerBump,
      volunteerEscrowBump,
      new BN(EscrowTokenBalance),
      //new BN(amount),
      {
        accounts: {
          escrowToken: volunteerToken,
          volunteerEscrow: volunteerEscrow,
          mint: mint,
          walletToDepositTo: tokenAddress,
          volunteerWallet: wallet.publicKey,
          reciever: wallet.publicKey,
          associatedTokenProgram: Associated_Token_Program_ID,
          systemProgram: SystemProgram.programId,
          rent: Rent_PROGRAM_ID,
          tokenProgram: Token_Program_ID,
        },
      },
    )
    return {
      transactionId: tx.toString(),
      error: '',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const balanceDivision = async (
  connection,
  wallet,
  _charityWalletString,
  _charityCoordinatorWalletString,
  creatorString,
  _nftmint,
  price,
) => {
  const provider = new Provider(connection, wallet, opts.preflightCommitment)
  const programID = new PublicKey(commitGoodIdl.metadata.address)
  const program = new Program(commitGoodIdl, programID, provider)
  const mint = new web3.PublicKey(
    'EQSJM4caRE31xUoJPiYnq6SrqxaDnJMQX36v8jDpb9UY',
  )
  const charityWallet = new web3.PublicKey(_charityWalletString)
  const charityCoordinatorWallet = new web3.PublicKey(
    _charityCoordinatorWalletString,
  )
  const nftmint = new web3.PublicKey(_nftmint)
  const [_nftInfo, nft_bump_state] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('state')),
      nftmint.toBytes(),
      // wallet.publicKey.toBytes(),
    ],
    programID,
  )
  const platformWalletString = 'B3YRdY8RYsLNHo3jmqoiy83SPrJUAKXTbwSTjks3mvNZ'
  const creatorWallet = new web3.PublicKey(creatorString)
  const platformWallet = new web3.PublicKey(platformWalletString)
  const charityTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: charityWallet,
  })
  const charityCoordinatorTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: charityCoordinatorWallet,
  })
  const creatorTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: creatorWallet,
  })
  const platformTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: platformWallet,
  })
  const ownerTokenAddress = await utils.token.associatedAddress({
    mint,
    owner: wallet.publicKey,
  })
  const Rent_PROGRAM_ID = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  )
  const Token_Program_ID = new web3.PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  )
  const Associated_Token_Program_ID = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  )
  const balanceDivision_tx = new web3.Transaction().add(
    program.transaction.divideproceeds(new BN(price), {
      accounts: {
        mint,
        charityWallet,
        charityWalletToken: charityTokenAddress,
        charityCoordinator: charityCoordinatorWallet,
        nftInfo: _nftInfo,
        charityCoordinatorToken: charityCoordinatorTokenAddress,
        owner: wallet.publicKey,
        ownerTokenAccount: ownerTokenAddress,
        associatedTokenProgram: Associated_Token_Program_ID,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    }),
    program.transaction.platformtransfer(new BN(price), {
      accounts: {
        mint,
        nftInfo: _nftInfo,
        platformWallet,
        platformWalletToken: platformTokenAddress,
        creator: creatorWallet,
        creatorTokenAccount: creatorTokenAddress,
        owner: wallet.publicKey,
        ownerTokenAccount: ownerTokenAddress,
        associatedTokenProgram: Associated_Token_Program_ID,
        systemProgram: SystemProgram.programId,
        rent: Rent_PROGRAM_ID,
        tokenProgram: Token_Program_ID,
      },
    }),
  )
  const blockhashObj = await connection.getLatestBlockhash()
  balanceDivision_tx.recentBlockhash = blockhashObj.blockhash
  balanceDivision_tx.feePayer = wallet.publicKey
  const message = balanceDivision_tx.compileMessage()
  ;(await connection.getFeeForMessage(message, 'confirmed')).value
  try {
    const signature = await wallet.sendTransaction(
      balanceDivision_tx,
      connection,
    )
    await connection.confirmTransaction(signature, 'confirmed')
    return {
      transactionId: signature,
      error: '',
    }
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
