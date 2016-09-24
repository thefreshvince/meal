#Meal
A component file generator that creates scss, js, and markup upon command.

```
$ meal make news card

Creates:
- /path/to/your/html/components/card-news.html
- /path/to/your/scss/components/_card-news.scss
- /path/to/your/js/components/_card-news.js

And replaces all string occurences in your templates:
html -
	<div class="card-COMPONTENT"... ->
	<div class="card-news"...
scss -
	.card-COMPONTENT... ->
	.card-news...
js   - 
	getElementByClassName('card-COMPONTENT')... ->
	getElementByClassName('card-news')...

```

##Installation

first install it globally

`$ npm install meal -g`

Then call init in your project folder to generate the meal.json

`$ meal init`

##Why

__Consistent:__
By using consistent templates you can increase quality, enforce patterns and methodologies, add complexity, and maintain best practices.

__Speedy:__
Generate the boilerplate you need to get started in an instant. By keeping your files abstract and modular, you no longer have to worry about adding weight to a project by including an entire framework.

__Organized:__
Meal keeps your uncompiled files neatly named and organized within your source folder. Say hello to the simple yet effective "[component-type]-[component-name]" naming convention. Now your component directory will look something like this:

```
Before:              After:
/newsitem.html       /card-news.html
/productcard.html    /card-product.html
/blogpost.html       /card-blog.html
/newsPost.html       /article-news.html
/single-blog.html    /article-blog.html
/product.html        /article-product.html
...
``` 

##meal.json
After installation, you can specify the meal options:

```json
{
	"file_types": [
		{
			"type": "html",
			"output_type": "html",
			"components_as_dirs": true,
			"path": "/resources/markup/html/components",
			"prefix": ""
		},
		{
			"type": "scss",
			"output_type": "scss",
			"components_as_dirs": true,
			"path": "/resources/styles/scss/components",
			"import": {
				"name": "style.scss",
				"path": "/resources/scss/"
			},
			"prefix": "_"
		},
		{
			"type": "js",
			"output_type": "js",
			"components_as_dirs": true,
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
type | The type of the source file's template | ingredient.__html__
name | The name of the source file's template | __ingredient__.html
output_type | The filetype that the source will compile to | ingredient.html -> card-name.__php__
path | The path to the output folder | /public/includes
prefix | The file's prefix | **_**markup.html
components_as_dirs | whether to output into separate directories or not | false -> ../__card-__name.php
true -> ../__card__/name.php
import.name | the name of the scss importing file | style.scss
import.path | the path to the importing file | /resources/assets/scss/

###components_dir
Spcifying the components directory will tell meal where to look for the template files.

##Commands

Command | Description | Example
--- | --- | ---
init | Creates a meal.json in your current directory | meal init
list | Lists all generatable components | meal list
make __[NAME] [TYPE]__ | generates files from the __[TYPE]__ template using the __[NAME]__ | meal make news card

###Make options

Option | Description | Example
--- | --- | ---
--x__[TYPE]__ | Skips the __[TYPE]__ file generation | meal make some card --xjs --xscss (Will skip the scss and js files)

##Template Files

By default there are template files bundled with meal, however it is understandable that you may like to create your own... ingredients...

To start, go through the steps in the installation section then after running `$ meal init` edit the meal.json file's __components_dir__ property to point where ever you like in your project directory (maybe something like "resources/meal_templates").

Within the templates folder, each sub folder will represent a separate component. Within each subfolder you will need to create three separate files:
* markup.html
* styles.scss
* scripts.js

When you run the `$ meal make news card`, meal will look for the card directory in your defined templates folder. From there it will copy over the contents respectively and create new component files as per the paths in your meal.json.

Before writing the new files, meal searches and replaces any occurence of the keyword (case sensative) COMPONENT with the defined component name. For example the following will grab the contents of the files within the card directory.

```
$ meal make news card
```

Next it will replace all occurences of __COMPONENT__ with __news__

```html
<!-- Template file -->
<div class="card-COMPONENT"><div>

<!-- Generated file -->
<div class="card-news"><div>

```

###Component Naming Casing

The current casing control that meal allows when writing your template files is as follows:

String | Render | Example (using "news")
--- | --- | ---
COMPONENT   | Lowercase  | card-COMPONTENT -> card-news
!COMPONENT  | Capitalize | card-!COMPONTENT -> card-News
!COMPONENT! | Uppercase  | card-!COMPONTENT! -> card-NEWS
