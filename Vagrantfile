Vagrant.configure("2") do |config|
  config.vm.box = "promet/jessie_webny"
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", 3072]
  end

  project = 'webny'
  path = "/var/www/sites/#{project}.dev"

  #comment out to replace insecure keys with locally generated secure keys
  config.ssh.insert_key = false

  config.vm.synced_folder ".", "/vagrant", :disabled => true
  ## For Macs, Linux, or OS that supports NFS fileshare
  #config.vm.synced_folder ".", path, :nfs => true
  ## For OS that does not support NFS fileshare
  config.vm.synced_folder ".", path
  
  config.vm.hostname = "#{project}.dev"

  config.ssh.forward_agent  = true
  config.vm.network :private_network, ip: "10.33.36.11"
  
  config.vm.provision :shell, inline: "apt-get update -y"
  config.vm.provision :shell, inline: "apt-get upgrade -y -q"
end

