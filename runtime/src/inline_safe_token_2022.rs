/// Partial SPL Token declarations inlined to avoid an external dependency on the wickandbergamot-token-2024 crate
use crate::inline_wickandbergamot_token::{self, GenericTokenAccount};

solana_sdk::declare_id!("ZToGWcF1Qh9H7te1MmABiGsFUKvj5zXPQ2QnTqoHpHN");

// `wickandbergamot_token_program_2022::extension::AccountType::Account` ordinal value
pub const ACCOUNTTYPE_ACCOUNT: u8 = 2;

pub struct Account;
impl GenericTokenAccount for Account {
    fn valid_account_data(account_data: &[u8]) -> bool {
        inline_wickandbergamot_token::Account::valid_account_data(account_data)
            || ACCOUNTTYPE_ACCOUNT
                == *account_data
                    .get(inline_wickandbergamot_token::Account::get_packed_len())
                    .unwrap_or(&0)
    }
}
