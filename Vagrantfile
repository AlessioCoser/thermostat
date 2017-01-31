# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'yaml'

settings = YAML.load_file '.env'
my_super_url = settings['server']['url']
my_super_user = settings['server']['user']

Vagrant.configure("2") do |config|
  config.vm.box = "tknerr/managed-server-dummy"
  config.vm.synced_folder ".", "/var/node/default", type: "rsync", rsync__exclude: [".git/", "node_modules/", ".vagrant", "log/", ".env"]

  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  config.vm.provider :managed do |managed, override|
    managed.server = my_super_url
    override.ssh.username = my_super_user
    override.ssh.private_key_path = "~/.ssh/id_rsa"
  end

  config.vm.provision "shell", path: "provision.sh"
end
