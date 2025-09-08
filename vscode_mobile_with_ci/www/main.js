// Minimal starter: initialize Monaco editor and simple file list stored in localStorage
let editor;
const defaultFiles = {
  "hello.js":"console.log('Hello from VSCode Mobile Scaffold');",
  "test.py":"print('Hello from Python')"
};
function ensureFiles(){
  if(!localStorage.getItem('files')){
    localStorage.setItem('files', JSON.stringify(defaultFiles));
  }
}
function fileMap(){ return JSON.parse(localStorage.getItem('files')||'{}'); }
function saveFileMap(m){ localStorage.setItem('files', JSON.stringify(m)); }
function refreshFileList(){
  const ul=document.getElementById('file-list');
  ul.innerHTML='';
  const fm=fileMap();
  Object.keys(fm).forEach(name=>{
    const li=document.createElement('li');
    li.textContent=name;
    li.onclick=()=>openFile(name);
    ul.appendChild(li);
  });
}
function openFile(name){
  const content=fileMap()[name];
  currentFile=name;
  editor.setValue(content);
  // set language
  const ext = name.split('.').pop();
  if(ext==='py') monaco.editor.setModelLanguage(editor.getModel(),'python');
  else if(ext==='java') monaco.editor.setModelLanguage(editor.getModel(),'java');
}
document.getElementById('new-file').onclick=()=>{
  const name=prompt('Filename (include extension, e.g., main.js)');
  if(!name) return;
  const fm=fileMap(); fm[name]='';
  saveFileMap(fm); refreshFileList(); openFile(name);
}
document.getElementById('save-btn').onclick=()=>{
  const fm=fileMap(); fm[currentFile]=editor.getValue(); saveFileMap(fm); alert('Saved.');
}
document.getElementById('run-btn').onclick=()=>{
  alert('Run requires remote/Termux integration. See README for options.');
}
let currentFile=null;
// load monaco
require.config({ paths: { 'vs': 'lib/monaco/min/vs' }});
require(['vs/editor/editor.main'], function() {
  ensureFiles();
  refreshFileList();
  currentFile=Object.keys(fileMap())[0];
  editor=monaco.editor.create(document.getElementById('editor'), {
    value: fileMap()[currentFile]||'',
    language: 'javascript',
    automaticLayout: true,
    theme: 'vs-dark'
  });
});
