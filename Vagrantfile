Vagrant.configure("2") do |config|
  config.vm.box = "promet/jessie_webny"

  project = 'webny'
  path = "/var/www/sites/#{project}.dev"

  config.vm.provider :virtualbox do |vb|
 
    host = RbConfig::CONFIG['host_os']
    if defined? host 
   # Give VM 1/4 system memory & access to half the cpu cores on the host
      if host =~ /darwin/
        cpus = `sysctl -n hw.ncpu`.to_i / 2
        # sysctl returns Bytes and we need to convert to MB
        mem = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4
      elsif host =~ /linux/
        cpus = `nproc`.to_i / 2
        # meminfo shows KB and we need to convert to MB
        mem = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4
      else # sorry Windows folks, I can't help you
        cpus = 2
        mem = 4096
      end
    else #sorry, Windows folks have to set this manually
      cpus = 2
      mem = 4096
    end

    vb.customize ["modifyvm", :id, "--memory", mem]
    vb.customize ["modifyvm", :id, "--cpus", cpus]
  end


  #comment out unless building a new vbox
  config.ssh.insert_key = false

  config.vm.synced_folder ".", "/vagrant", :disabled => true
  if host =~/darwin/
    config.vm.synced_folder ".", path, :nfs => true
  elseif host =~ /linux/
    config.vm.synced_folder ".", path, :nfs => true
  else # this is the setting for windows
    config.vm.synced_folder ".", path
  end

  config.vm.hostname = "#{project}.dev"
  config.ssh.forward_agent  = true
  config.vm.network :private_network, ip: "10.33.36.11"
  
  config.vm.provision :shell, inline: "apt-get update -y"
  config.vm.provision :shell, inline: "apt-get upgrade -y -q"
end

