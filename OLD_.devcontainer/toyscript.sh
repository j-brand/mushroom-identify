#!/bin/sh
USERNAME=${1:-"automatic"}
echo "toyscript is running!"
git clone https://github.com/romkatv/powerlevel10k.git /home/$USERNAME/.oh-my-zsh/custom/themes/powerlevel10k
