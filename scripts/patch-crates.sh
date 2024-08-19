# source this file

update_solana_dependencies() {
  declare project_root="$1"
  declare solana_ver="$2"
  declare tomls=()
  while IFS='' read -r line; do tomls+=("$line"); done < <(find "$project_root" -name Cargo.toml)

  sed -i -e "s#\(wickandbergamot-program = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-program-test = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-sdk = \"\).*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-sdk = { version = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-client = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-client = { version = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-clap-utils = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-clap-utils = { version = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-account-decoder = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-account-decoder = { version = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-faucet = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-faucet = { version = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-zk-token-sdk = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
  sed -i -e "s#\(wickandbergamot-zk-token-sdk = { version = \"\)[^\"]*\(\"\)#\1=$solana_ver\2#g" "${tomls[@]}" || return $?
}

patch_crates_io_solana() {
  declare Cargo_toml="$1"
  declare solana_dir="$2"
  cat >> "$Cargo_toml" <<EOF
[patch.crates-io]
wickandbergamot-account-decoder = { path = "$solana_dir/account-decoder" }
wickandbergamot-clap-utils = { path = "$solana_dir/clap-utils" }
wickandbergamot-client = { path = "$solana_dir/client" }
wickandbergamot-program = { path = "$solana_dir/sdk/program" }
wickandbergamot-program-test = { path = "$solana_dir/program-test" }
wickandbergamot-sdk = { path = "$solana_dir/sdk" }
wickandbergamot-faucet = { path = "$solana_dir/faucet" }
wickandbergamot-zk-token-sdk = { path = "$solana_dir/zk-token-sdk" }
EOF
}
