#!/usr/bin/env bash
set -ex

[[ $(uname) = Linux ]] || exit 1
[[ $USER = root ]] || exit 1

if grep -q wickandbergamot /etc/passwd ; then
  echo "User wickandbergamot already exists"
else
  adduser wickandbergamot --gecos "" --disabled-password --quiet
  adduser wickandbergamot sudo
  adduser wickandbergamot adm
  echo "wickandbergamot ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
  id solana

  [[ -r /solana-scratch/id_ecdsa ]] || exit 1
  [[ -r /solana-scratch/id_ecdsa.pub ]] || exit 1

  sudo -u wickandbergamot bash -c "
    echo 'PATH=\"/home/solana/.cargo/bin:$PATH\"' > /home/solana/.profile
    mkdir -p /home/solana/.ssh/
    cd /home/solana/.ssh/
    cp /solana-scratch/id_ecdsa.pub authorized_keys
    umask 377
    cp /solana-scratch/id_ecdsa id_ecdsa
    echo \"
      Host *
      BatchMode yes
      IdentityFile ~/.ssh/id_ecdsa
      StrictHostKeyChecking no
    \" > config
  "
fi
