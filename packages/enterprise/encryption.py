import os
import base64
from cryptography.fernet import Fernet
import logging

logger = logging.getLogger(__name__)

class KMSEngine:
    """
    Mock KMS Engine using symmetric Fernet encryption for data-at-rest.
    In a real environment, this would integrate with AWS KMS, HashiCorp Vault, etc.
    """
    def __init__(self):
        # Read from environment or generate a stable default for demo purposes
        key = os.environ.get("OCP_KMS_MASTER_KEY")
        if not key:
            # Fallback for local development
            key = base64.urlsafe_b64encode(b"ocp_super_secret_kms_key_1234567")
        self.fernet = Fernet(key)

    def encrypt(self, plain_text: str) -> str:
        if not plain_text:
            return plain_text
        try:
            return self.fernet.encrypt(plain_text.encode()).decode()
        except Exception as e:
            logger.error(f"Failed to encrypt data: {e}")
            raise

    def decrypt(self, cipher_text: str) -> str:
        if not cipher_text:
            return cipher_text
        try:
            return self.fernet.decrypt(cipher_text.encode()).decode()
        except Exception as e:
            logger.error(f"Failed to decrypt data: {e}")
            raise

kms_engine = KMSEngine()
