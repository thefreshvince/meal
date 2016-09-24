/**
 *
 * 	Create File
 * 	Creates a file in a specified directory
 *  
 * 	@param {Object} type The filetype being created {type,name,path,prefix}
 * 	
 */

module.exports = function(type) {
	var options = this.args.make;
	this.fs.readFile(this.user_options.components_dir + '/' + options[1] + '/ingredient.' + type.type, 'utf8', (err,data) => {
		if (err) return console.error(err);

		var contents = '',
			filename = (!!type.prefix ? type.prefix : '') + (!!type.component_as_dir ? '' : options[1] + '-') + options[0] + '.' + (!!type.output_type ? type.output_type : type.type),
			dirs = type.path ? type.path : 'resources/' + type.type + '/components';

		if(!!type.component_as_dir) dirs += '/' + options[1] + '/';

		// UPPERCASE, Capitalize, lowercase
		contents = data.replace(/!COMPONENT!/g, options[0].toUpperCase())
		 	   		   .replace(/!COMPONENT/g, this.capitalize(options[0]))
		 	   		   .replace(/COMPONENT/g, options[0].toLowerCase());

		this.createDirs(this.paths.app_dir + dirs, (dir) => {
			var filepath = dir + '/' + filename;
			this.fs.stat(filepath, (err, stat) => {
				if(err === null) {

			    }else if(err.code == 'ENOENT') {
			        this.fs.writeFile(filepath, contents);
			    } else {
			        console.log('Some other error: ', err.code);
			    }
			});
			if(type.type == 'scss') this.importScss(type);
		});
	});
}