#!/bin/bash
set -euxo pipefail

# 1. Update & Install Essentials
echo "[+] Installing required packages"
apt-get update -y
apt-get install -y docker.io nfs-kernel-server

# 2. Enable and Start Docker
echo "[+] Enabling and starting Docker service"
systemctl enable docker
systemctl start docker

echo "[+] Creating docker group (if it doesn't exist)"
groupadd docker || true

echo "[+] Adding vagrant user to docker group"
usermod -aG docker vagrant

echo "[+] Docker version:"
docker --version

# 3. Set up NFS server
echo "[+] Setting up NFS server and exports"
# Use a unique export path to avoid clashing with other clusters using the same IaC.
NFS_EXPORT_PATH="/srv/nfs/k8s-servicevm"
mkdir -p "$NFS_EXPORT_PATH"
chmod -R 777 "$NFS_EXPORT_PATH"
chown -R nobody:nogroup "$NFS_EXPORT_PATH"

echo "${NFS_EXPORT_PATH} *(rw,sync,no_subtree_check,no_root_squash)" >> /etc/exports
exportfs -rav
systemctl restart nfs-kernel-server

# 4. Run Nexus in Docker
echo "[+] Creating directory for Nexus data"
mkdir -p /opt/nexus-data
chown -R 200 /opt/nexus-data   # Nexus runs as UID 200

echo "[+] Running Nexus 3 container"
docker run -d --name nexus \
  -p 8081:8081 -p 5000:5000 \
  -v /opt/nexus-data:/nexus-data \
  --restart unless-stopped \
  sonatype/nexus3

echo "[+] Nexus should be accessible at: http://10.0.0.80:8081"

# 5. Final messages
echo "[+] services.sh provisioning complete"
echo "[+] Nexus UI: http://10.0.0.80:8081"
echo "[+] To use Docker without sudo, run: newgrp docker"
