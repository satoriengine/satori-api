#! /bin/bash

sudo chown -R vscode /workspaces
sudo chgrp -R vscode /workspaces

if [ ! -d ".git" ]; then
  echo "'.git' フォルダが見つかりません。git init を実行します..."
  git init
  git branch --move main
  echo "git init が完了しました。"
else
  echo "'.git' フォルダが既に存在します。git init はスキップします。"
fi

if command -v mise /dev/null 2>&1; then
  echo "miseはインストール済みです"
else
  # install mise
  echo "miseはインストールされていません"
  echo "miseをインストールします"
  sudo apt update -y && sudo apt install -y curl
  sudo install -dm 755 /etc/apt/keyrings
  curl -fSs https://mise.jdx.dev/gpg-key.pub | sudo tee /etc/apt/keyrings/mise-archive-keyring.pub 1> /dev/null
  echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.pub arch=amd64] https://mise.jdx.dev/deb stable main" | sudo tee /etc/apt/sources.list.d/mise.list
  sudo apt update
  sudo apt install -y mise
  # mise setting to bashrc
  echo '' >> ~/.bashrc
  echo '# mise setting' >> ~/.bashrc
  echo 'eval "$(mise activate bash)"' >> ~/.bashrc
  echo '' >> ~/.bashrc
  source ~/.bashrc
  echo "miseをインストールしました"
  # install mise tool, node, pnpm etc
  echo "miseのツールをインストールします"
  mise trust
  mise install
  echo "miseの設定が完了しました"
fi
