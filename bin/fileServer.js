
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const libFs = require("fs");
const libPath = require("path");

const isHttps = true;
const port = 8000;
(isHttps ? require("https").createServer({
	pfx: libFs.readFileSync(libPath.join(__dirname, "mysslserver.pfx")),
	passphrase: "test"
}) : require("http").createServer()).on("request", async (req, res) => {
	try {
		const isGet = (req.method === "GET");
		if(isGet) {
			// ファイルサーバ
			await fileServer(req, res);
		} else {
			// APIが存在しない
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.write("404 API Not Found\n");
			res.end();
		}
	} catch(error) {
		// エラーが発生
		res.writeHead(500, { "Content-Type": "application/json" });
		res.write(JSON.stringify({ code: 500, message: error }));
		res.end();
	}
}).listen(port, () => console.log(`Server ${ isHttps ? "https" : "http" }://localhost:${ port }`));

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// ファイルサーバ処理
const fileServer = async (req, res) => {
	let keptFileName = null;
	const keptFileList = [];
	const directories = [
		libPath.join(__dirname, "../docs", req.url),
	];

	for (let i = 0; i < directories.length; i++) {
		// 存在確認
		try { await libFs.promises.access(directories[i]) } catch(error) { if (error.code === "ENOENT") { continue; } else { throw error; } }

		const stat = await libFs.promises.stat(directories[i]);
		if (stat.isDirectory()) {
			// ディレクトリを発見
			const files = await libFs.promises.readdir(directories[i]);
			for (let j = 0; j < files.length; j++) {
				const stat = await libFs.promises.stat(libPath.join(directories[i], files[j]));
				keptFileList.push({
					file: files[j],
					isDirectory: stat.isDirectory(),
				});
			}
		} else {
			// ファイルを発見
			keptFileName = directories[i];
		}

		if (keptFileName !== null) { break; }
		if (keptFileList.length > 0) { break; }
	}

	if (keptFileName !== null) {
		// ファイルを表示
		const file = await libFs.promises.readFile(keptFileName, "binary");
		const prefix = libPath.extname(keptFileName);
		const headers = {};
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Pragma"] = "no-cache";
		headers["Cache-Control"] = "no-cache";
		headers["Content-Type"] = "text/plain";
		if (prefix === ".js") { headers["Content-Type"] = "text/javascript"; }
		if (prefix === ".css") { headers["Content-Type"] = "text/css"; }
		if (prefix === ".html") { headers["Content-Type"] = "text/html"; }
		if (prefix === ".png") { headers["Content-Type"] = "image/png"; }
		if (prefix === ".json") { headers["Content-Type"] = "application/json"; }
		res.writeHead(200, headers);
		res.write(file, "binary");
		res.end();
	} else if (keptFileList.length > 0) {
		// ディレクトリを表示
		const headers = {};
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Pragma"] = "no-cache";
		headers["Cache-Control"] = "no-cache";
		headers["Content-Type"] = "text/html";
		res.writeHead(200, headers);
		res.write("<!DOCTYPE html><html><head>");
		res.write("</head><body>");
		res.write("<hr>");
		if(req.url !== "/"){ res.write("<a href=../>...</a></br>"); }
		for(let i = 0; i < keptFileList.length; i++){
			var file = keptFileList[i].file + (keptFileList[i].isDirectory ? "/" : "");
			res.write("<a href=" + libPath.join(req.url, file) + ">" + file + "</a><br>");
		}
		res.write("<hr>");
		res.write("</body><html>");
		res.end();
	} else {
		// ファイルが存在しない
		res.writeHead(404, { "Content-Type": "application/json" });
		res.write(JSON.stringify({ code: 404, message: "404 File Not Found" }));
		res.end();
	}
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
