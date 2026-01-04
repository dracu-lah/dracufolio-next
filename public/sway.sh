#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo "Starting Sway Arch Setup..."

# 1. AUR Helper (yay)
if ! command -v yay &>/dev/null; then
  echo "Installing yay..."
  sudo pacman -S --needed git base-devel
  # Clone to a temporary directory to keep the repo clean
  git clone https://aur.archlinux.org/yay.git /tmp/yay
  cd /tmp/yay
  makepkg -si
  cd -
  rm -rf /tmp/yay
else
  echo "yay is already installed."
fi

# 2. Install Sway & Essential Packages
echo "Installing Sway and essential packages..."
sudo pacman -S --needed \
  sway swaylock swaybg swayidle \
  bluez blueman dunst alacritty brightnessctl cliphist fd fzf grim \
  ly mpv nemo nemo-fileroller nwg-look pipewire pipewire-alsa \
  pipewire-audio pipewire-jack pipewire-pulse pavucontrol playerctl ripgrep slurp \
  tmux tlp ttf-font-awesome ttf-jetbrains-mono-nerd waybar \
  wf-recorder wireplumber wl-clipboard wofi \
  stow zsh foot pamixer gnome-terminal lazygit \
  xdg-desktop-portal-wlr xdg-desktop-portal imv polkit-gnome wlsunset wlr-randr \
  kdenlive fastfetch btop telegram-desktop

# 3. Install AUR Packages
echo "Installing AUR packages..."
yay -S --needed \
  waylogout-git neovim-git wifi-qr zen-browser-bin nodejs-lts-jod npm \
  wl-color-picker dragon-drop \
  nemo-preview material-black-colors-theme mint-y-icons

# 4. Apply Dotfiles
echo "Applying dotfiles..."
DOTFILES_DIR="$HOME/swaydots"
REPO_URL="https://github.com/dracu-lah/swaydots.git"

if [ ! -d "$DOTFILES_DIR" ]; then
  echo "Cloning $REPO_URL to $DOTFILES_DIR..."
  git clone "$REPO_URL" "$DOTFILES_DIR"
fi

echo "Changing directory to $DOTFILES_DIR..."
cd "$DOTFILES_DIR"

echo "Stowing dotfiles..."
stow .

# 5. Zimfw
echo "Installing Zimfw..."
if [ ! -f "${ZIM_HOME:-${HOME}/.zim}/zimfw.zsh" ]; then
  curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
else
  echo "Zimfw already installed."
fi

# 6. Neovim with LazyVim
echo "Setting up Neovim with LazyVim..."
if [ -d "$HOME/.config/nvim" ]; then
  echo "Backing up existing nvim config..."
  mv "$HOME/.config/nvim" "$HOME/.config/nvim.bak.$(date +%Y%m%d%H%M%S)"
fi
git clone https://github.com/LazyVim/starter "$HOME/.config/nvim"
rm -rf "$HOME/.config/nvim/.git"

# 7. PNPM Setup
echo "Installing PNPM..."
if ! command -v pnpm &>/dev/null; then
  curl -fsSL https://get.pnpm.io/install.sh | sh -
else
  echo "pnpm is already installed."
fi

# 8. Git Setup
echo "Configuring Git..."
# Default values from README provided as hints
read -p "Enter Git user.email [nevilnicks4321@gmail.com]: " git_email
git_email=${git_email:-nevilnicks4321@gmail.com}

read -p "Enter Git user.name [dracu-lah]: " git_name
git_name=${git_name:-dracu-lah}

git config --global user.email "$git_email"
git config --global user.name "$git_name"

if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
  read -p "Generate SSH key for $git_email? (y/N): " generate_ssh

  if [[ "$generate_ssh" =~ ^[Yy]$ ]]; then
    echo "Generating SSH key..."
    ssh-keygen -t ed25519 -C "$git_email" -f "$HOME/.ssh/id_ed25519" -N ""

    if command -v wl-copy &>/dev/null; then
      cat "$HOME/.ssh/id_ed25519.pub" | wl-copy
      echo "Public key copied to clipboard (wl-copy)."
    else
      echo "Here is your public key:"
      cat "$HOME/.ssh/id_ed25519.pub"
    fi
  fi
else
  echo "SSH key already exists."
fi

# 9. Docker Setup
echo "Setting up Docker..."
sudo pacman -S --needed docker docker-compose
sudo systemctl start docker.service
sudo systemctl enable docker.service
sudo usermod -aG docker $USER

# 10. Final System Config
echo "Enabling TLP and Display Manager..."
sudo systemctl enable --now tlp.service
sudo systemctl enable ly.service
sudo systemctl set-default graphical.target

# Change shell to ZSH
if [ "$SHELL" != "/bin/zsh" ]; then
  echo "Changing default shell to zsh..."
  chsh -s /bin/zsh
fi

echo "Setup complete! Please reboot for group permissions and shell changes to take effect."
