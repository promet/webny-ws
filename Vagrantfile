Vagrant.configure("2") do |config|
  config.vm.box = "promet/jessie_webny"
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", 3072]
  end

  project = 'webny'
  path = "/var/www/sites/#{project}.dev"

  #comment out unless building a new vbox
  config.ssh.insert_key = false

  config.vm.synced_folder ".", "/vagrant", :disabled => true
  config.vm.synced_folder ".", path, :nfs => true
  config.vm.hostname = "#{project}.dev"

  config.ssh.forward_agent  = true
  config.vm.network :private_network, ip: "10.33.36.11"
  
  config.vm.provision :shell, inline: "apt-get update -y"
  config.vm.provision :shell, inline: "apt-get upgrade -y -q"
end

