// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const host = 'localhost';
const port = 8000;
  
// Creating server to accept request
http.createServer((req, res) => {
  
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
			'Access-Control-Max-Age': 2592000, // 30 days
		};
		
		// Setting default Content-Type
		var contentType = "application/json";
		
    // Parsing the URL 
    var request = url.parse(req.url, true);
		var queryData = request.query;
		//console.log(queryData);
  
    // Extracting the path of file
    var action = request.pathname;
		
    // Path Refinements
		let	filePath = path.join(__dirname, queryData.cur_dir+'/'+action).split("%20").join(" "); // home
		filePath = filePath.replace(/undefined/i, '');

		
		let folderPath = '';
		let dir = '';
		let dirPosStart = action.indexOf('/');
		let dirPosEnd = action.indexOf('/', dirPosStart+1);
		dir = action.substr(dirPosStart+1, dirPosEnd-dirPosStart-1);
		
		if(dirPosEnd > 1) {
			folderPath = './' + dir + '/';
		} else {
			folderPath = './';
		}
		
		console.log(new Date().toISOString() + ' ' + req.url);
		//console.log('filePath '+filePath);
		//console.log(folderPath);

		/*--------------- .md ---------------*/		
		if(req.url.includes('.md')) {
			// Checking if the path exists
			fs.exists(filePath, function (exists) {

				if (!exists) {
					console.log('file '+filePath+' not exist');
					res.writeHead(404, { "Content-Type": "text/plain" });
					res.end("404 Not Found");
					return;
				}

				// Extracting file extension
				var ext = path.extname(action);

				// Setting the headers
				res.writeHead(200, { "Content-Type": contentType });

				// Reading the file
				fs.readFile(filePath, 
					function (err, content) {
							let content_json = JSON.stringify({name: req.url.substr(10), content: content.toString()})
							res.writeHead(200, headers);
							res.end(content_json);
					});
			});
		}
		else
		/*--------------- .png .jpg ---------------*/
		if(req.url.includes('.png') || req.url.includes('.jpg')) {
			
			// Checking if the path exists
			fs.exists(filePath, function (exists) {

				if (!exists) {
					console.log('file not exist');
					res.writeHead(404, { "Content-Type": "text/plain" });
					res.end("404 Not Found");
					return;
				}

				// Extracting file extension
				var ext = path.extname(action);

				contentType = "image/png";

				// Setting the headers
				res.writeHead(200, { "Content-Type": contentType });

				// Reading the file
				try {
				fs.readFile(filePath, 
					function (err, content) {
							// Serving the image
							res.writeHead(200, headers);
							res.end(content);
					});
				} catch (e) {
					console.log(e);
				} 
			});
		}
		else
		/*--------------- /directory-list ---------------*/
		if(req.url.includes('/directory-list')) {
				let folderPath1 = folderPath + queryData.cur_dir;	// home
				//console.log(folderPath1);
				const getDirectories = (folderPath1) =>
						fs.readdirSync(folderPath1, { withFileTypes: true })
							.filter(dirent => dirent.isDirectory())
							.map(dirent => dirent.name) 
				
				try {
					let	data = getDirectories(folderPath1)
					//console.log(data);
					res.writeHead(200, headers);
					res.end(JSON.stringify({ data }));
				} catch (e) {
					console.log(e);
				} 
		}
		else
		/*--------------- /all-files ---------------*/
		if(req.url.includes('/all-files')) {
				let data = [];
				console.log(folderPath);
				try {
					fs.readdir(folderPath, (err, files) => {
						if (files) {
							files.forEach(file => {
								console.log('dir file' + file);
								let fileContent = fs.readFileSync(folderPath + file, 'utf8');
								//data[file] = fileContent;
								data.push({name: file, content: fileContent});
							});
							//console.log(data);
							let content_json = JSON.stringify({data})

							res.writeHead(200, headers);
							res.end(content_json);
						} else {
							console.log("file not found");
							res.writeHead(404, {"Content-Type": "text/plain"});
							res.end("404 Not Found");
						}
					});
				} catch (err) {
					console.log('error' + err);
				}
		}
		else
		/*--------------- /summary ---------------*/
		if(req.url.includes('/summary')) {
				let data = [];
				let folderPath1 = './'+ queryData.cur_dir+'/' + dir + '/'; // home
				//console.log('summary dir '+folderPath1);
				fs.readdir(folderPath1, (err, files) => {
					if(files) {
						files.forEach(file => {
							//console.log('summary file '+file);
							let fileContent = fs.readFileSync(folderPath1 + file, 'utf8');
							let brieflyPosStart = fileContent.indexOf('briefly:');
							let brieflyPosEnd = fileContent.indexOf('---', brieflyPosStart);
							let briefly = fileContent.substr(brieflyPosStart+9, brieflyPosEnd-brieflyPosStart-10);
							data.push( {name: file, content: briefly} );
						});
						//console.log(data);
						let content_json = JSON.stringify({path: dir, data })
						
						res.writeHead(200, headers);
						res.end(content_json);
					} else {
						console.log("files not found");
						res.writeHead(404, { "Content-Type": "text/plain" });
						res.end("404 Not Found");
					}
				});	
		}
		else {
				console.log("bad request");
				res.writeHead(404, { "Content-Type": "text/plain" });
				res.end("404 Not Found");
		}
})
  
// Listening to the PORT: 8000
.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});