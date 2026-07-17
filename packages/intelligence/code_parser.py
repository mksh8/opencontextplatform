import ast
from typing import Dict, Any, List

class PythonASTParser:
    """
    Parses Python source code and extracts Classes, Functions, and their docstrings.
    Builds a structural representation for the Knowledge Graph.
    """
    
    def parse_file(self, file_name: str, source_code: str) -> Dict[str, Any]:
        try:
            tree = ast.parse(source_code)
        except SyntaxError as e:
            return {"error": str(e), "file_name": file_name}
            
        file_node = {
            "type": "FileNode",
            "name": file_name,
            "classes": [],
            "functions": []
        }
        
        # Traverse top level
        for node in tree.body:
            if isinstance(node, ast.ClassDef):
                class_info = self._extract_class(node)
                file_node["classes"].append(class_info)
            elif isinstance(node, ast.FunctionDef) or isinstance(node, ast.AsyncFunctionDef):
                func_info = self._extract_function(node)
                file_node["functions"].append(func_info)
                
        return file_node
        
    def _extract_class(self, node: ast.ClassDef) -> Dict[str, Any]:
        class_info = {
            "type": "ClassNode",
            "name": node.name,
            "docstring": ast.get_docstring(node) or "",
            "methods": []
        }
        
        for child in node.body:
            if isinstance(child, ast.FunctionDef) or isinstance(child, ast.AsyncFunctionDef):
                method_info = self._extract_function(child)
                class_info["methods"].append(method_info)
                
        return class_info
        
    def _extract_function(self, node: ast.FunctionDef | ast.AsyncFunctionDef) -> Dict[str, Any]:
        calls = []
        for child in ast.walk(node):
            if isinstance(child, ast.Call):
                if isinstance(child.func, ast.Name):
                    calls.append(child.func.id)
                elif isinstance(child.func, ast.Attribute):
                    calls.append(child.func.attr)
                    
        func_info = {
            "type": "FunctionNode",
            "name": node.name,
            "docstring": ast.get_docstring(node) or "",
            "calls": list(set(calls))  # Unique calls
        }
        return func_info

