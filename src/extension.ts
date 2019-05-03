// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.open', async () => {
		const cfg = vscode.workspace.getConfiguration('home-wiki');
		let root = cfg.get<string>('root');
		if (root === undefined) {
			console.log('root is undefined');
			return;
		}
		root = root
			.replace(/^~/, `${ os.homedir()}/`)
			.replace(/[\/\\]/g, path.sep);
		const uri = vscode.Uri.file(root);
		await vscode.commands.executeCommand("vscode.openFolder", uri, true);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
