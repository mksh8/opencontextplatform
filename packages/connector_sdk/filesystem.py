import os
import uuid
import hashlib
from typing import Dict, Any, List
from pathlib import Path
from .interfaces import IConnector


class FilesystemConnector(IConnector):
    """
    A real implementation that recursively crawls a local directory
    and extracts text content from supported file types.
    """
    SUPPORTED_EXTENSIONS = {'.md', '.txt', '.py', '.ts', '.tsx', '.json', '.yaml', '.yml'}

    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        base_path_str = config.get("path", ".")
        base_path = Path(base_path_str).resolve()
        
        if not base_path.exists() or not base_path.is_dir():
            raise ValueError(f"Invalid directory path: {base_path}")

        contexts = []
        for root, dirs, files in os.walk(base_path):
            # Skip hidden directories like .git or .ai
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file_name in files:
                file_path = Path(root) / file_name
                if file_path.suffix.lower() in self.SUPPORTED_EXTENSIONS:
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # Generate a deterministic ID based on the file path
                        path_hash = hashlib.md5(str(file_path).encode()).hexdigest()
                        
                        contexts.append({
                            "id": f"fs-{path_hash}",
                            "type": "local_file",
                            "content": content,
                            "metadata": {
                                "file_name": file_name,
                                "extension": file_path.suffix.lower(),
                                "absolute_path": str(file_path),
                                "relative_path": str(file_path.relative_to(base_path)),
                                "size_bytes": file_path.stat().st_size
                            }
                        })
                    except Exception as e:
                        # Silently skip files that can't be read (e.g. permission errors)
                        pass

        return contexts

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        # Filesystem doesn't natively support webhooks without a watcher like watchdog
        return []
