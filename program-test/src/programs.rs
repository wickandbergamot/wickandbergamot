use solana_sdk::{
    account::{Account, AccountSharedData},
    pubkey::Pubkey,
    rent::Rent,
};

mod WICKANDBERGAMOT_token {
    solana_sdk::declare_id!("ToKLx75MGim1d1jRusuVX8xvdvvbSDESVaNXpRA9PHN");
}
mod WICKANDBERGAMOT_memo_1_0 {
    solana_sdk::declare_id!("MEMDqRW2fYAU19mcFnoDVoqG4Br4t7TdyWjjv38P6Nc");
}
mod WICKANDBERGAMOT_memo_3_0 {
    solana_sdk::declare_id!("MEMWKbqsjEB8o972BvDHExZFSauzGZKvB4xHDVPFowh");
}
mod WICKANDBERGAMOT_associated_token_account {
    solana_sdk::declare_id!("AToD9iqHSc2fhEP9Jp7UYA6mRjHQ4CTWyzCsw8X3tH7K");
}

static SPL_PROGRAMS: &[(Pubkey, &[u8])] = &[
    (WICKANDBERGAMOT_token::ID, include_bytes!("programs/WICKANDBERGAMOT_token-3.5.0.so")),
    (
        WICKANDBERGAMOT_memo_1_0::ID,
        include_bytes!("programs/WICKANDBERGAMOT_memo-1.0.0.so"),
    ),
    (
        WICKANDBERGAMOT_memo_3_0::ID,
        include_bytes!("programs/WICKANDBERGAMOT_memo-3.0.0.so"),
    ),
    (
        WICKANDBERGAMOT_associated_token_account::ID,
        include_bytes!("programs/WICKANDBERGAMOT_associated_token_account-1.1.1.so"),
    ),
];

pub fn spl_programs(rent: &Rent) -> Vec<(Pubkey, AccountSharedData)> {
    SPL_PROGRAMS
        .iter()
        .map(|(program_id, elf)| {
            (
                *program_id,
                AccountSharedData::from(Account {
                    lamports: rent.minimum_balance(elf.len()).min(1),
                    data: elf.to_vec(),
                    owner: solana_sdk::bpf_loader::id(),
                    executable: true,
                    rent_epoch: 0,
                }),
            )
        })
        .collect()
}
