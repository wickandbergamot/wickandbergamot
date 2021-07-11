use lazy_static::lazy_static;
use solana_sdk::{
    clock::Slot,
    hash::{Hash, Hasher},
    pubkey::Pubkey,
};
use std::collections::{HashMap, HashSet};

pub mod instructions_sysvar_enabled {
    solana_sdk::declare_id!("7TfFp6Tf2XqXQQfx16qvXbjekXtn68kiQj9pPfXZ5Bua");
}

pub mod secp256k1_program_enabled {
    solana_sdk::declare_id!("3tF9nXQrHzTV5jdDqzn6LVWMoJagN1zRgr4APfY6qmpi");
}

pub mod consistent_recent_blockhashes_sysvar {
    solana_sdk::declare_id!("ApdySrEmykK3PBLExdN2ehGCRPyVT6athFgu4H7H8e9J");
}

pub mod deprecate_rewards_sysvar {
    solana_sdk::declare_id!("GVriKcZATdgSzmhmu9PtimfheaKYksK5mhgoN5fbRhXg");
}

pub mod pico_inflation {
    solana_sdk::declare_id!("4RWNif6C2WCNiKVW7otP4G7dkmkHGyKQWRpuZ1pxKU5m");
}

pub mod full_inflation {
    pub mod devnet_and_testnet {
        solana_sdk::declare_id!("JC1GQujpgHz92Am65FxcxByqqDGTdYJs6jLjgebnDpJF");
    }

    pub mod mainnet {
        pub mod certusone {
            pub mod vote {
                solana_sdk::declare_id!("7Ra6gKzEBFyYJ7fdsrCuzihZcxKu7AbmDy2FBEQFzap2");
            }
            pub mod enable {
                solana_sdk::declare_id!("54ZqXvMyCKShnBrGj2ni6m4kXTjRUrkc21dFoT9npJZk");
            }
        }
    }
}

pub mod spl_token_v2_multisig_fix {
    solana_sdk::declare_id!("EwSWSBRpzYZSEqdZ215WMmnce6WiEsk57rSEB3e7ghh6");
}

pub mod no_overflow_rent_distribution {
    solana_sdk::declare_id!("9TyDRDhs933rTCWGwzSUTSx1XeJT14sc17o1cNQzUaBq");
}

pub mod ristretto_mul_syscall_enabled {
    solana_sdk::declare_id!("4mS77eMqwiUZMcV3M6xzDYprbDchxhbNHVyBateEhqST");
}

pub mod cumulative_rent_related_fixes {
    solana_sdk::declare_id!("HtaE9dEZDmqMPVysYQCiLx6i6wTeic4NVbqGRoGDkD5w");
}

pub mod pull_request_ping_pong_check {
    solana_sdk::declare_id!("A9VXyn5BYwNva8zUvfG1qWFEuPq6p6mTWwQ9s3qJFWNp");
}

pub mod stake_program_v2 {
    solana_sdk::declare_id!("BpCWufPmpbYaT1xRbdCeZKXDxQ4Wj1Z8ijaG6tWFrJg1");
}

pub mod rewrite_stake {
    solana_sdk::declare_id!("HpGqShCRhP7QwMBXTs1KbATiHWa383EUWjg3kbQjN2Kf");
}

pub mod filter_stake_delegation_accounts {
    solana_sdk::declare_id!("HpGqShCRhP7QwMBXTs1KbATiHWa383EUWjg3kbQjN2Kf");
}

pub mod simple_capitalization {
    solana_sdk::declare_id!("9r69RnnxABmpcPFfj1yhg4n9YFR2MNaLdKJCC6v3Speb");
}

pub mod bpf_loader_upgradeable_program {
    solana_sdk::declare_id!("Cv6gGxiakDF6nd9Sxx53MbC4kij69qXpap8guiC6aK9U");
}

pub mod stake_program_v3 {
    solana_sdk::declare_id!("6tYrCsaWbGqgeW9tN3NRbViw6BBLYjnNsJBqLJZZoo5B");
}

pub mod use_loaded_executables {
    solana_sdk::declare_id!("7xk3jJ6kYsCU3qbwtZ3CSppdjxkMNbwMh8NC1cVmeW9S");
}

pub mod turbine_retransmit_peers_patch {
    solana_sdk::declare_id!("BZJfMk71bwWeYHFo2G6xHrXR2KNWxrAuFLLZi5VoF1fM");
}

pub mod track_writable_deescalation {
    solana_sdk::declare_id!("4iEEhiZKhMa5KG9YAQbC9u2bLMwYxhQuNmfGEV8jQnz4");
}

pub mod require_custodian_for_locked_stake_authorize {
    solana_sdk::declare_id!("FKWSvfcXATHSBBNvr5VE6ns4tNsTG3EGzcDw2xVtowZQ");
}

pub mod spl_token_v2_self_transfer_fix {
    solana_sdk::declare_id!("2XDc17ZmSTbpqV3B5fmEGac4CKCYnbJj7vnfASvdzqyN");
}

pub mod matching_buffer_upgrade_authorities {
    solana_sdk::declare_id!("5gkzmKnnZbm7bcQm4v3d7BZjSRczE9oH8eFDdebxubXH");
}

pub mod warp_timestamp_again {
    solana_sdk::declare_id!("GvDsGDkH5gyzwpDhxNixx8vtx1kwYHH13RiNAPw27zXb");
}

pub mod per_byte_logging_cost {
    solana_sdk::declare_id!("59dM4SV6dPEKXPfkrkhFkRdn4K6xwKxdNAPMyXG7J1wT");
}

pub mod check_init_vote_data {
    solana_sdk::declare_id!("3ccR6QpxGYsAbWyfevEtBNGfWV4xBffxRj2tD6A9i39F");
}

pub mod check_program_owner {
    solana_sdk::declare_id!("5XnbR5Es9YXEARRuP6mdvoxiW3hx5atNNeBmwVd8P3QD");
}

lazy_static! {
    /// Map of feature identifiers to user-visible description
    pub static ref FEATURE_NAMES: HashMap<Pubkey, &'static str> = [
        (instructions_sysvar_enabled::id(), "instructions sysvar"),
        (secp256k1_program_enabled::id(), "secp256k1 program"),
        (consistent_recent_blockhashes_sysvar::id(), "consistent recentblockhashes sysvar"),
        (deprecate_rewards_sysvar::id(), "deprecate unused rewards sysvar"),
        (pico_inflation::id(), "pico inflation"),
        (full_inflation::devnet_and_testnet::id(), "full inflation on devnet and testnet"),
        (spl_token_v2_multisig_fix::id(), "spl-token multisig fix"),
        (no_overflow_rent_distribution::id(), "no overflow rent distribution"),
        (ristretto_mul_syscall_enabled::id(), "ristretto multiply syscall"),
        (cumulative_rent_related_fixes::id(), "rent fixes (#10206, #10468, #11342)"),
        (pull_request_ping_pong_check::id(), "ping-pong packet check #12794"),
        (stake_program_v2::id(), "solana_stake_program v2"),
        (rewrite_stake::id(), "rewrite stake"),
        (filter_stake_delegation_accounts::id(), "filter stake_delegation_accounts #14062"),
        (simple_capitalization::id(), "simple capitalization"),
        (bpf_loader_upgradeable_program::id(), "upgradeable bpf loader"),
        (stake_program_v3::id(), "solana_stake_program v3"),
        (use_loaded_executables::id(), "use loaded executable accounts"),
        (turbine_retransmit_peers_patch::id(), "turbine retransmit peers patch #14631"),
        (track_writable_deescalation::id(), "track account writable deescalation"),
        (require_custodian_for_locked_stake_authorize::id(), "require custodian to authorize withdrawer change for locked stake"),
        (spl_token_v2_self_transfer_fix::id(), "spl-token self-transfer fix"),
        (matching_buffer_upgrade_authorities::id(), "Upgradeable buffer and program authorities must match"),
        (full_inflation::mainnet::certusone::enable::id(), "Full inflation enabled by Certus One"),
        (full_inflation::mainnet::certusone::vote::id(), "Community vote allowing Certus One to enable full inflation"),
        (warp_timestamp_again::id(), "warp timestamp again, adjust bounding to 25% fast 80% slow #15204"),
        (per_byte_logging_cost::id(), "charge the compute budget per byte for logging"),
        (check_init_vote_data::id(), "check initialized Vote data"),
        (check_program_owner::id(), "limit programs to operating on accounts owned by itself")
        /*************** ADD NEW FEATURES HERE ***************/
    ]
    .iter()
    .cloned()
    .collect();

    /// Unique identifier of the current software's feature set
    pub static ref ID: Hash = {
        let mut hasher = Hasher::default();
        let mut feature_ids = FEATURE_NAMES.keys().collect::<Vec<_>>();
        feature_ids.sort();
        for feature in feature_ids {
            hasher.hash(feature.as_ref());
        }
        hasher.result()
    };
}

#[derive(Clone, PartialEq, Eq, Hash)]
pub struct FullInflationFeaturePair {
    pub vote_id: Pubkey, // Feature that grants the candidate the ability to enable full inflation
    pub enable_id: Pubkey, // Feature to enable full inflation by the candidate
}

lazy_static! {
    /// Set of feature pairs that once enabled will trigger full inflation
    pub static ref FULL_INFLATION_FEATURE_PAIRS: HashSet<FullInflationFeaturePair> = [
        FullInflationFeaturePair {
            vote_id: full_inflation::mainnet::certusone::vote::id(),
            enable_id: full_inflation::mainnet::certusone::enable::id(),
        },
    ]
    .iter()
    .cloned()
    .collect();
}

/// `FeatureSet` holds the set of currently active/inactive runtime features
#[derive(AbiExample, Debug, Clone)]
pub struct FeatureSet {
    pub active: HashMap<Pubkey, Slot>,
    pub inactive: HashSet<Pubkey>,
}
impl Default for FeatureSet {
    fn default() -> Self {
        // All features disabled
        Self {
            active: HashMap::new(),
            inactive: FEATURE_NAMES.keys().cloned().collect(),
        }
    }
}
impl FeatureSet {
    pub fn is_active(&self, feature_id: &Pubkey) -> bool {
        self.active.contains_key(feature_id)
    }

    pub fn activated_slot(&self, feature_id: &Pubkey) -> Option<Slot> {
        self.active.get(feature_id).copied()
    }

    pub fn cumulative_rent_related_fixes_enabled(&self) -> bool {
        self.is_active(&cumulative_rent_related_fixes::id())
    }

    /// List of enabled features that trigger full inflation
    pub fn full_inflation_features_enabled(&self) -> HashSet<Pubkey> {
        let mut hash_set = FULL_INFLATION_FEATURE_PAIRS
            .iter()
            .filter_map(|pair| {
                if self.is_active(&pair.vote_id) && self.is_active(&pair.enable_id) {
                    Some(pair.enable_id)
                } else {
                    None
                }
            })
            .collect::<HashSet<_>>();

        if self.is_active(&full_inflation::devnet_and_testnet::id()) {
            hash_set.insert(full_inflation::devnet_and_testnet::id());
        }
        hash_set
    }

    /// All features enabled, useful for testing
    pub fn all_enabled() -> Self {
        Self {
            active: FEATURE_NAMES.keys().cloned().map(|key| (key, 0)).collect(),
            inactive: HashSet::new(),
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_full_inflation_features_enabled_devnet_and_testnet() {
        let mut feature_set = FeatureSet::default();
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::devnet_and_testnet::id(), 42);
        assert_eq!(
            feature_set.full_inflation_features_enabled(),
            [full_inflation::devnet_and_testnet::id()]
                .iter()
                .cloned()
                .collect()
        );
    }

    #[test]
    fn test_full_inflation_features_enabled() {
        // Normal sequence: vote_id then enable_id
        let mut feature_set = FeatureSet::default();
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::vote::id(), 42);
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::enable::id(), 42);
        assert_eq!(
            feature_set.full_inflation_features_enabled(),
            [full_inflation::mainnet::certusone::enable::id()]
                .iter()
                .cloned()
                .collect()
        );

        // Backwards sequence: enable_id and then vote_id
        let mut feature_set = FeatureSet::default();
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::enable::id(), 42);
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::vote::id(), 42);
        assert_eq!(
            feature_set.full_inflation_features_enabled(),
            [full_inflation::mainnet::certusone::enable::id()]
                .iter()
                .cloned()
                .collect()
        );
    }
}
