// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.window.onDidChangeActiveTextEditor(editor => {
		vscode.window.showInformationMessage('The active editor has changed');
		if (editor) {
		  const currentFile = editor.document.uri.fsPath;
		  const appFolder = currentFile.includes("/app/");
		  const fileName = currentFile.replace(/^.*[\\\/]/, '');
		  const routeOrLayoutOrLoadingOrPage = ["route", "layout", "loading", "page"].includes(fileName.split('.')[0]);
	
		  if (appFolder && routeOrLayoutOrLoadingOrPage) {
			const parentFolder = currentFile.split('/').slice(-2, -1).pop();
			const newFileName = `${parentFolder}/${fileName}`;
			const decorationType = vscode.window.createTextEditorDecorationType({
			  fontWeight: 'bold',
			  color: 'green'
			});
			editor.setDecorations(decorationType, [{ range: new vscode.Range(0, 0, 0, 0), hoverMessage: 'Renamed file.' }]);
			editor.edit(editBuilder => {
			  editBuilder.replace(new vscode.Range(0, 0, 0, fileName.length), newFileName);
			});
		  }
		}
	  });
	
	  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
