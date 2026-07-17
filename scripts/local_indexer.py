#!/usr/bin/env python3
import os
import sys
import argparse
import logging
from pprint import pprint

# Adjust sys.path so we can import internal packages when running as a script
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from packages.connector_sdk.filesystem import FilesystemConnector
from packages.runtime.memory import MemoryEngine
from packages.provider_sdk.implementations import ArcadeDBProvider

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

def main():
    parser = argparse.ArgumentParser(description="OpenContextPlatform Local Filesystem Indexer")
    parser.add_argument("--path", type=str, required=True, help="Absolute or relative path to the directory to index")
    parser.add_argument("--tenant", type=str, default="local_dev", help="Tenant ID to associate with the indexed context")
    parser.add_argument("--dry-run", action="store_true", help="Print extracted contexts without writing to the database")
    
    args = parser.parse_args()
    
    logging.info(f"Initializing Filesystem Connector for path: {args.path}")
    connector = FilesystemConnector()
    
    try:
        raw_contexts = connector.sync({"path": args.path})
        logging.info(f"Successfully extracted {len(raw_contexts)} files.")
    except Exception as e:
        logging.error(f"Failed to sync directory: {e}")
        sys.exit(1)
        
    if args.dry_run:
        logging.info("DRY RUN MODE ENABLED. Outputting first 3 results:")
        for ctx in raw_contexts[:3]:
            print(f"\n--- {ctx['metadata']['relative_path']} ---")
            print(f"Content Length: {len(ctx['content'])} chars")
            print(f"Metadata: {ctx['metadata']}")
        return

    logging.info(f"Connecting to ArcadeDB Provider (Tenant: {args.tenant})...")
    db_provider = ArcadeDBProvider()
    memory_engine = MemoryEngine(db_provider)
    
    success_count = 0
    for raw_ctx in raw_contexts:
        try:
            # We don't have a live embedding provider connected here, so embedding=None
            memory_engine.add_memory(
                tenant_id=args.tenant,
                content=raw_ctx["content"],
                memory_type=raw_ctx["type"],
                metadata=raw_ctx["metadata"]
            )
            success_count += 1
        except Exception as e:
            logging.warning(f"Failed to ingest file {raw_ctx['metadata']['file_name']}: {e}")
            
    logging.info(f"Successfully ingested {success_count}/{len(raw_contexts)} files into OpenContextPlatform!")

if __name__ == "__main__":
    main()
