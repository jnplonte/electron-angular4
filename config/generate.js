#! /usr/bin/env node
var shell = require('shelljs');
var variable = process.argv.splice(2);
var ngScript = '';

if (!shell.which('ng')) {
    shell.echo('Error: this script requires angular cli');
    shell.exit(1);
}

switch (variable[0]) {
    case 'component':
        ngScript = 'ng generate component components/'+ variable[1] + ' --module=app.module';
    break;

    case 'directive':
        ngScript = 'ng generate directive directives/'+ variable[1] + ' --module=app.module';
    break;

    case 'pipe':
        ngScript = 'ng generate pipe pipes/'+ variable[1] + ' --module=app.module';
    break;

    case 'service':
        ngScript = 'ng generate service services/'+ variable[1] + ' --module=app.module';
    break;
}

if (ngScript !== '') { 
    shell.exec(ngScript, function(status, output) {
        console.log('Exit status:', status);
    });
} else {
    shell.echo('Error: invalid scripts');
    shell.exit(1);
}