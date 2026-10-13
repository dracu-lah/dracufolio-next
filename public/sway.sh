#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo "Starting Sway Arch Setup..."

# 1. AUR Helper (yay)
if ! command -v yay &>/dev/null; then
  echo "Installing yay..."
  sudo pacman -S --needed --noconfirm git base-devel
  # Clone to a temporary directory to keep the repo clean
  git clone https://aur.archlinux.org/yay.git /tmp/yay
  cd /tmp/yay
  makepkg -si --noconfirm
  cd -
  rm -rf /tmp/yay
else
  echo "yay is already installed."
fi

# 2. Install Sway & Essential Packages
echo "Installing Sway and essential packages..."
sudo pacman -S --needed --noconfirm \
  sway swaylock swaybg swayidle \
  bluez blueman dunst alacritty brightnessctl cliphist fd fzf grim \
  ly mpv nemo nemo-fileroller nwg-look pipewire pipewire-alsa \
  pipewire-audio pipewire-jack pipewire-pulse playerctl ripgrep slurp \
  tmux powertop thermald ttf-font-awesome ttf-jetbrains-mono-nerd waybar \
  wf-recorder wireplumber wl-clipboard wofi \
  stow zsh foot pamixer gnome-terminal lazygit \
  xdg-desktop-portal-wlr xdg-desktop-portal imv polkit-gnome wlsunset wlr-randr

# 3. Install AUR Packages
echo "Installing AUR packages..."
yay -S --needed --noconfirm \
  waylogout-git neovim-git wifi-qr zen-browser-bin nodejs-lts-jod \
  wl-color-picker dragon-drop auto-cpufreq \
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
# Using zsh to run the install script as per README
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
# Check if pnpm is already installed to avoid unnecessary re-install
if ! command -v pnpm &>/dev/null; then
  curl -fsSL https://get.pnpm.io/install.sh | sh -
else
  echo "pnpm is already installed."
fi

# 8. Git Setup
echo "Configuring Git..."
read -p "Enter Git user.email: " git_email
read -p "Enter Git user.name: " git_name

if [ -n "$git_email" ] && [ -n "$git_name" ]; then
  git config --global user.email "$git_email"
  git config --global user.name "$git_name"
else
  echo "Git credentials skipped."
fi

if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
  if [ -n "$git_email" ]; then
    read -p "Generate SSH key for $git_email? (y/N): " generate_ssh
  else
    read -p "Generate SSH key? (y/N): " generate_ssh
  fi

  if [[ "$generate_ssh" =~ ^[Yy]$ ]]; then
    echo "Generating SSH key..."
    # Use provided email or a default/empty comment if none provided
    ssh_comment="${git_email:-generated-by-setup-script}"
    # -N "" creates a key with no passphrase
    ssh-keygen -t ed25519 -C "$ssh_comment" -f "$HOME/.ssh/id_ed25519" -N ""

    echo "Attempting to copy public key to clipboard..."
    if command -v wl-copy &>/dev/null; then
      cat "$HOME/.ssh/id_ed25519.pub" | wl-copy
      echo "Public key copied to clipboard."
    else
      echo "wl-copy not found. Here is your public key:"
      cat "$HOME/.ssh/id_ed25519.pub"
    fi
  else
    echo "SSH key generation skipped."
  fi
else
  echo "SSH key already exists."
fi

# 9. Docker Setup
echo "Setting up Docker..."
sudo pacman -S --needed --noconfirm docker docker-compose
sudo systemctl start docker.service
sudo systemctl enable docker.service
sudo usermod -aG docker $USER

# 10. Power Management
# Stack: auto-cpufreq (governor + charge thresholds) + thermald + powertop --auto-tune.
# TLP is intentionally NOT installed/enabled — it conflicts with auto-cpufreq.
echo "Configuring power management stack..."

# Defensive: if TLP was previously installed, prevent it from starting.
sudo systemctl mask tlp.service 2>/dev/null || true

# Thermald
sudo systemctl enable --now thermald.service

# Persist powertop --auto-tune across boots
sudo tee /etc/systemd/system/powertop.service >/dev/null <<'EOF'
[Unit]
Description=Powertop auto-tune
After=multi-user.target

[Service]
Type=oneshot
RemainAfterExit=true
ExecStart=/usr/bin/powertop --auto-tune

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now powertop.service

# Override auto-cpufreq default thresholds (75/80) to 50/80 for longer cycle life.
sudo sed -i 's/^start_threshold = 75/start_threshold = 50/g' /etc/auto-cpufreq.conf

# Install auto-cpufreq as a systemd daemon — this is what makes the conf take effect.
sudo auto-cpufreq --install

# NOPASSWD sudoers rule for the Super+Shift+P power-profile keybind.
sudo tee /etc/sudoers.d/auto-cpufreq-force >/dev/null <<EOF
$USER ALL=(root) NOPASSWD: /usr/local/bin/auto-cpufreq --force=performance
$USER ALL=(root) NOPASSWD: /usr/local/bin/auto-cpufreq --force=powersave
$USER ALL=(root) NOPASSWD: /usr/local/bin/auto-cpufreq --force=reset
EOF
sudo chmod 0440 /etc/sudoers.d/auto-cpufreq-force
sudo visudo -cf /etc/sudoers.d/auto-cpufreq-force

# Display manager + graphical target
sudo systemctl enable ly.service
sudo systemctl set-default graphical.target
/usr/lib/xdg-desktop-portal

echo "Setup complete! Please reboot or log out and back in for all changes (especially Docker group permissions) to take effect."
