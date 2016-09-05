#Meal

Stop writing the same thin over and over again. Write it once, write it well.

Meal takes templated files (whether from the npm module directory or your project directory), replaces occurences of __COMPONENT__ with what you specify in your command `$ meal make cool card` (in this case __cool__), and outputs the files in your resources directory, or wherever you specify within the __meal.json__.

##Why

__Consistent__
By using consistent templates you can increase quality, enforce patterns and methodologies, add complexity, and maintain best practices.

__Speedy__
Generate the boilerplate you need to get started in an instant. By keeping your files abstract and modular, you no longer have to worry about adding weight to the project.

__Organized__
Meal keeps your uncompiled files neatly named and organized within your source folder. Say hello to the simple yet effective "[component-type]-[component-name]" naming convention. now your directory will look something like this:
```
/card-news.html
/card-product.html
/card-blog.html
/card-gallery.html
/article-news.html
/article-blog.html
/article-product.html
...
```

##Installation

first install it globally

`$ npm install meal -g`

Then call init in your project folder to generate the meal.json

`$ meal init`

##meal.json
After installation, you can specify the meal options:

```json
{
	"file_types": [
		{
			"type": "html",
			"name": "markup",
			"output_type": "html",
			"path": "/resources/markup/html/components",
			"prefix": ""
		},
		{
			"type": "scss",
			"name": "styles",
			"output_type": "scss",
			"path": "/resources/styles/scss/components",
			"prefix": "_"
		},
		{
			"type": "js",
			"name": "scripts",
			"output_type": "js",
			"path": "/resources/scripts/js/components",
			"prefix": "_"
		}
	],
	"components_dir": "/ingredients",
	"scss_file": "style.scss"
}
```

###file_types

Property | Description | Example
--- | --- | ---
type | The type of the source file's template | markup.__html__
name | The name of the source file's template | __markup__.html
output_type | The filetype that the source will compile to | markup.html -> some-component.__php__
path | The path to the output folder | /public/includes
prefix | The file's prefix | __\___markup.html

###components_dir
Spcifying the components directory will tell meal where to look for the template files.

###scss_file
Meal auto appends module inclides to your scss file. You can specify the name via this property but remember that the scss file will always be placed on directory up from your file_types "scss" path.

##Commands

Command | Description | Example
--- | --- | ---
init | Creates a meal.json in your current directory | meal init
list | Lists all generatable components | meal list
make __[NAME] [TYPE]__ | generates files from the __[TYPE]__ template using the __[NAME]__ | meal make news card

###Make options

Option | Description | Example
--- | --- | ---
--x[TYPE] | Skips the __[TYPE]__ file generation | meal make some card --xjs --xscss --xhtml

##Template Files

By default there are template files bundled with meal, however it is understandable that you would like to create your own... ingredients...

To start, go through the steps in the installation section then after running `$ meal init` edit the meal.json file's __components_dir__ property to point where ever you like in your project directory (maybe something like "resources/meal_templates").

Within the templates folder, each sub folder will represent a seperate component. Within each subfolder you will need to create three separate files:
* markup.html
* styles.scss
* scripts.js

So when you run the `$ meal make news card`, meal will look for the card directory in your defined templates folder. From there it will copy over the contents respectively and create new component files as per the paths in your meal.json.

Before writing the new files, meal searches and replaces any occurence of the keyword (case sensative) COMPONENT with the defined component name. For example the following will grab the contents of the files within the card directory.

```
$ meal make news card
```

Next it will replace all occurences of __COMPONENT__ with __news__

```html
<!-- Template file -->
<div class="card-COMPONTENT"><div>

<!-- Generated file -->
<div class="card-news"><div>

```

###Component Naming Casing

The current casing control that meal allows when writing your template files is as follows:

String | Render | Example (using "news")
--- | --- | ---
COMPONTENT   | Lowercase  | card-COMPONTENT -> card-news
!COMPONTENT  | Capitalize | card-COMPONTENT -> card-News
!COMPONTENT! | Uppercase  | card-COMPONTENT -> card-NEWS
