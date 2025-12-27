
# Vagrantfile and Scripts to Automate Kubernetes Setup using Kubeadm 

- A working Vagrant setup using Vagrant + VirtualBox

Here is the high level workflow.


<p align="center">
  <img src="https://github.com/user-attachments/assets/cc5594b5-42c2-4c56-be21-6441f849f537" width="65%" />
</p>

## Documentation

Current k8s version for CKA, CKAD, and CKS exam: 1.30

The setup is updated with 1.31 cluster version.

Refer to this link for documentation full: https://devopscube.com/kubernetes-cluster-vagrant/


## Prerequisites

1. Working Vagrant setup
2. 8 Gig + RAM workstation as the Vms use 3 vCPUS and 4+ GB RAM

## For MAC/Linux Users

The latest version of Virtualbox for Mac/Linux can cause issues.

Create/edit the /etc/vbox/networks.conf file and add the following to avoid any network-related issues.
<pre>* 0.0.0.0/0 ::/0</pre>

or run below commands

```shell
sudo mkdir -p /etc/vbox/
echo "* 0.0.0.0/0 ::/0" | sudo tee -a /etc/vbox/networks.conf
```

So that the host only networks can be in any range, not just 192.168.56.0/21 .

## Bring Up the Cluster

To provision the cluster, execute the following commands.

```shell
cd vagrant-kubeadm-kubernetes
vagrant up
```
## Set Kubeconfig file variable

```shell
cd vagrant-kubeadm-kubernetes
cd configs
export KUBECONFIG=$(pwd)/config
```

or you can copy the config file to .kube directory.

```shell
cp config ~/.kube/
```

## To shutdown the cluster,

```shell
vagrant halt
```

## To restart the cluster,

```shell
vagrant up
```

## To destroy the cluster,

```shell
vagrant destroy -f

