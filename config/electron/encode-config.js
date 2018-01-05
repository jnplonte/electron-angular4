const fs = require('fs'),
      path = require('path'),
      process = require('process');
      CryptoJS = require('crypto-js');

const configFiles = './config/site/client';
const configClient = './release-config';

fs.readdir( configFiles, function( err, files ) {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    } 
    
    files.forEach( function( file, index ) {
        var configFile = path.join( configFiles, file );
        fs.readFile(configFile, {encoding: 'utf-8'}, function(err, data) {
            if (err) {
                console.error( 'Error reading file.', err );
                process.exit(1);
            }
            var encryptedConfig = CryptoJS.AES.encrypt(data, 'otomeyt-secret-key').toString();

            if (!fs.existsSync(configClient)){ 
                fs.mkdir(configClient, () => {
                    fs.chmod(configClient, 0775);
                });  
            }
            
            fs.writeFile(path.join( configClient, file.replace(/(.*)\.(.*?)$/, '$1') + '.otmyt' ), encryptedConfig, function(err) {
                if (err) {
                    console.error( 'Error writing otmyt file.', err );
                    process.exit(1);
                }
            });
            
            // fs.writeFile(path.join( configFiles, file.replace(/(.*)\.(.*?)$/, '$1') + '.txt' ), encryptedConfig, function(err) {
            //     if (err) {
            //         console.error( 'Error writing txt file.', err );
            //         process.exit(1);
            //     }
            // }); 
        });
    });
});