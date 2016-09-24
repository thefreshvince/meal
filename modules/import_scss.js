/**
 *
 * 	Import Scss
 * 	Appends the scss import statement to the defined main scss file
 *  
 * 	@param {Object} type The filetype being created {type,path,prefix}
 * 	
 */

module.exports = function(type) {

	if(!(!!type.import || !!type.import.name || !!type.import.path)) return;

	var options = this.args.make,

		style_path = type.import.path + '/' + type.import.name,

		style_path_array = type.import.path.split('/'),
		import_path_array = type.path.split('/'),

		inclu_path = '',
		import_string = '',
		level = 0,
		l = style_path_array[0] !== '.' || style_path_array.length > 1 ? style_path_array.length : 0 ;
	
	// Find difference in path between style file and imported component file
	if(style_path_array[0] === import_path_array[0])
		for (; level < l; level++) {
			if(style_path_array[level] !== import_path_array[level]){
				level++;
				break;
			}
		}

	// jump up directories until at a common directory
	if(level < l) {
		for (var diff = l - level; diff > 0; diff--) {
			inclu_path += '../';
		}
	}

	// now append remaining dirs to imported file
	for (i = 0, l = import_path_array.length; i < l; i++) {
		if(style_path_array[i] !== import_path_array[i]){
			inclu_path += import_path_array[i] + '/';
		}
	}

	import_string = '\n\t@import \"' + inclu_path + options[1] + (!!type.component_as_dir ? '/' : '-') + options[0] + '\";\n\n';	

	this.fs.stat(style_path, (err, stat) => {
		if(err === null) {
	    	this.fs.readFile(style_path, 'utf8', (err,data) => {
	    		this.fs.writeFile(style_path, '\n' + data.trim() + import_string);
	    	});
	    }else if(err.code == 'ENOENT') {
	    	this.fs.writeFile(style_path, '\n/*\n *\n *\tMEAL IMPORTS (LEAVE AT BOTTOM)\n *\n */\n' + import_string);
	    }
	});

}