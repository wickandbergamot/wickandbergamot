use solana_bpf_rust_sysvar::process_instruction;
use safecoin_program_test::*;
use safecoin_sdk::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    signature::Signer,
    sysvar::{
        clock, epoch_schedule, fees, instructions, recent_blockhashes, rent, slot_hashes,
        slot_history, stake_history,
    },
    transaction::Transaction,
};

#[tokio::test]
async fn test_sysvars() {
    let program_id = Pubkey::new_unique();
    let program_test = ProgramTest::new(
        "solana_bpf_rust_sysvar",
        program_id,
        processor!(process_instruction),
    );
    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

    let mut transaction = Transaction::new_with_payer(
        &[Instruction::new_with_bincode(
            program_id,
            &(),
            vec![
                AccountMeta::new(payer.pubkey(), true),
                AccountMeta::new(Pubkey::new_unique(), false),
                AccountMeta::new_readonly(clock::id(), false),
                AccountMeta::new_readonly(epoch_schedule::id(), false),
                AccountMeta::new_readonly(fees::id(), false),
                AccountMeta::new_readonly(instructions::id(), false),
                AccountMeta::new_readonly(recent_blockhashes::id(), false),
                AccountMeta::new_readonly(rent::id(), false),
                AccountMeta::new_readonly(slot_hashes::id(), false),
                AccountMeta::new_readonly(slot_history::id(), false),
                AccountMeta::new_readonly(stake_history::id(), false),
            ],
        )],
        Some(&payer.pubkey()),
    );
    transaction.sign(&[&payer], recent_blockhash);
    banks_client.process_transaction(transaction).await.unwrap();
}
